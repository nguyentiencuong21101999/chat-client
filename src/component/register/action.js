import axios from "axios";
import { config } from "../../config";

export const signUp = async (payload) => {
  return await axios({
    url: `${config.baseUrl}/users/sign-up`,
    method: "post",
    data: payload,
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};
