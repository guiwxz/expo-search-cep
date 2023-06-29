import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export const Button: React.FC<
  React.PropsWithChildren<
    TouchableOpacityProps & { outlined?: boolean; loading: boolean }
  >
> = ({ children, outlined = false, disabled, loading, ...rest }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined && { backgroundColor: 'transparent' },
        disabled && { opacity: 0.7 },
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text style={{ color: outlined ? '#000' : '#fff', alignSelf: 'center' }}>
        {!loading ? children : <ActivityIndicator size={20} color={'#fff'} />}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 16,
    backgroundColor: '#5636D3',
    borderWidth: 1,
    borderColor: '#5636D3',
  },
  buttonOulined: {
    backgroundColor: '#fff',
  },
});
