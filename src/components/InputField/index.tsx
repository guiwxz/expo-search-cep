import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardTypeOptions,
} from 'react-native';

import { Controller, UseControllerProps } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolateColor,
} from 'react-native-reanimated';

interface InputFieldProps extends UseControllerProps {
  handleChange?: (text: string) => void;
  control: any;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  type?: KeyboardTypeOptions;
  startIcon?: JSX.Element;
  mask?: string;
  getValues?: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  handleChange,
  rules,
  disabled,
  placeholder,
  loading,
  type,
  startIcon,
  mask,
  getValues,
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ['#fff', '#d6f8e3', '#fff']
      ),
    };
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, isTouched },
      }) => {
        if (isTouched) {
          progress.value = withTiming(1 - progress.value, {
            duration: 1000,
          });
        }
        return (
          <>
            <Animated.View
              style={[
                animatedStyle,
                styles.field,
                {
                  borderColor: error ? 'red' : '#e8e8e8',
                  opacity: disabled ? 0.7 : 1,
                },
              ]}
            >
              {startIcon && (
                <View
                  style={{
                    position: 'absolute',
                    left: 10,
                    alignSelf: 'center',
                  }}
                >
                  {startIcon}
                </View>
              )}
              {mask ? (
                <MaskedTextInput
                  mask="99999-999"
                  value={value}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  keyboardType={type}
                  editable={!disabled}
                  ref={ref}
                  style={[
                    styles.textField,
                    {
                      paddingLeft: startIcon ? 30 : 0,
                      paddingRight: loading ? 30 : 0,
                    },
                  ]}
                  onChangeText={(_text, rawText) => {
                    onChange(rawText);
                    handleChange && handleChange(rawText);
                  }}
                />
              ) : (
                <TextInput
                  value={value}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  keyboardType={type}
                  editable={!disabled}
                  ref={ref}
                  style={[
                    styles.textField,
                    {
                      paddingLeft: startIcon ? 30 : 0,
                      paddingRight: loading ? 30 : 0,
                      color: disabled ? '#707070' : '',
                    },
                  ]}
                  onChangeText={(text) => {
                    onChange(text);
                    handleChange && handleChange(text);
                  }}
                />
              )}
              <View
                style={{ position: 'absolute', right: 15, alignSelf: 'center' }}
              >
                {loading && <ActivityIndicator size={24} color={'#5636D3'} />}
              </View>
            </Animated.View>
            {error && (
              <Text
                style={{ color: 'red', alignSelf: 'stretch', marginTop: -8 }}
              >
                {error.message || 'Campo inválido'}
              </Text>
            )}
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#fff',
    width: '100%',

    borderColor: '#c0c0c0',
    borderWidth: 1,
    borderRadius: 6,

    paddingHorizontal: 12,
    paddingVertical: 8,

    flexDirection: 'row',
  },
  textField: {
    height: 30,
    fontSize: 16,
    paddingHorizontal: 30,
    width: '100%',
  },
});
