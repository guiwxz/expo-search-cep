import axios from "axios";
import { Address } from "../shared/interfaces/Address.types";

const cepApi = axios.create({
  baseURL: 'https://viacep.com.br'
})

export const searchCep = async (
  text: string,
  reset: () => void,
  setLoading: (payload: boolean) => void
): Promise<{ error: boolean, data: Address, notFound?: boolean }> => {

  if (text.length != 8) {
    reset()
    return { error: true, data: {} as Address };
  }

  setLoading(true);

  await sleep(3000)

  const res = await cepApi.get(`/ws/${text}/json/`);
  if (res && res.data) {
    if (res.data.erro) {
      return { error: true, data: res.data, notFound: true }
    }
    return { error: false, data: res.data };
  }

  throw res;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}