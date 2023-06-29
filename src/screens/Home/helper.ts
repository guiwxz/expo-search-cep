import * as yup from 'yup';
import { Address } from '../../shared/interfaces/Address.types';

import { UseFormReset, UseFormSetValue } from 'react-hook-form';
import { toast } from '../../utils/toast';

export const cepSchema = yup
  .object()
  .shape({
    cep: yup
      .string()
      .required('O cep deve ser preenchido')
      .max(8, 'O cep deve possuir 8 caracteres')
      .min(8, 'O cep deve possuir 8 caracteres'),
    logradouro: yup.string(),
    bairro: yup.string(),
    localidade: yup.string(),
    uf: yup.string(),
    complemento: yup.string()
  })
  .required();


export const handleFormValues = (data: Address, setValue: UseFormSetValue<Address>) => {
  if (data.localidade) {
    setValue('localidade', data.localidade, {
      shouldTouch: true,
    })
  }
  if (data.uf) {
    setValue('uf', data.uf, {
      shouldTouch: true,
    })
  }
  if (data.complemento) {
    setValue('complemento', data.complemento, {
      shouldTouch: true,
    })
  }
  if (data.logradouro) {
    setValue('logradouro', data.logradouro, {
      shouldTouch: true,
    })
  }
  if (data.bairro) {
    setValue('bairro', data.bairro, {
      shouldTouch: true,
    })
  }
}


export const postSuccess = (reset: UseFormReset<Address>) => {
  toast({ title: 'Endereço incluído com sucesso', variant: 'success' });
  reset(
    {
      cep: '',
    },
    {
      keepErrors: false,
      keepTouched: false,
    }
  );
}