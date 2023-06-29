import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Address } from '../../shared/interfaces/Address.types';
import { cepSchema, handleFormValues, postSuccess } from './helper';
import { InputField } from '../../components/InputField';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/Button';
import { MapPin } from 'phosphor-react-native';
import { searchCep } from '../../services/cepApi';
import { toast } from '../../utils/toast';
import { postAddress } from '../../services/api';

export const Home: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [loadingRequest, setLoadingRequest] = React.useState(false);
  const [invalidCep, setInvalidCep] = React.useState(false);

  const { handleSubmit, control, setValue, reset, getValues, setError } =
    useForm<Address>({
      resolver: yupResolver(cepSchema),
    });

  const resetForm = React.useMemo(
    () => () =>
      reset(
        {
          bairro: '',
          complemento: '',
          localidade: '',
          logradouro: '',
          uf: '',
          cep: getValues('cep'),
        },
        {
          keepTouched: false,
        }
      ),
    [reset]
  );

  const handleChange = async (text: string) => {
    try {
      const { error, data, notFound } = await searchCep(
        text,
        () => resetForm(),
        setLoading
      );

      if (error) {
        if (notFound) {
          setError('cep', {
            message: 'Cep não localizado',
            type: 'validate',
          });
          setInvalidCep(true);
          return;
        }

        return;
      }
      setInvalidCep(false);

      handleFormValues(data, setValue);
    } catch (err: any) {
      toast({ title: 'Não foi possível buscar o cep', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = React.useCallback(
    async (data: Address) => {
      try {
        if (invalidCep) {
          return;
        }
        setLoadingRequest(true);

        await postAddress(data);

        postSuccess(reset);
      } catch (err: any) {
        toast({ title: 'Algum erro ocorreu', variant: 'error' });
      } finally {
        setLoadingRequest(false);
      }
    },
    [invalidCep]
  );

  return (
    <>
      <AppHeader title={'Busque seu CEP'} />
      <View style={styles.container}>
        <View style={{ gap: 8, flex: 1 }}>
          <InputField
            mask="99999-999"
            name="cep"
            control={control}
            placeholder="Digite o cep"
            type="numeric"
            rules={{
              required: 'Preencha o cep',
            }}
            handleChange={handleChange}
            loading={loading}
            startIcon={<MapPin color="#a0a0a0" />}
          />
          <InputField
            disabled
            name="logradouro"
            placeholder="Logradouro"
            control={control}
          />
          <InputField
            disabled
            placeholder="Bairro"
            name="bairro"
            control={control}
          />
          <InputField
            disabled
            placeholder="Complemento"
            name="complemento"
            control={control}
          />
          <InputField
            disabled
            placeholder="Localidade"
            name="localidade"
            control={control}
            getValues={getValues}
          />
          <InputField
            disabled
            placeholder="Estado"
            name="uf"
            control={control}
          />
        </View>
        <View>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={loading || loadingRequest}
            loading={loadingRequest}
          >
            Confirmar
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', padding: 20 },
});
