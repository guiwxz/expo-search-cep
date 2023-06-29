import axios from "axios";
import { Address } from "../shared/interfaces/Address.types";

const api = axios.create({
  baseURL: 'https://webhook.site/92e2bdf7-c670-48b3-a9eb-4fcfddc2846f'
})

export const postAddress = async (values: Address) => {
  const res = await api.post(
    'https://webhook.site/92e2bdf7-c670-48b3-a9eb-4fcfddc2846f',
    values
  );

  return res;
}