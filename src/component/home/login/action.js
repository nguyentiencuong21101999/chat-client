import axios from "axios";
import { config } from "../../../config";

export const signIn = async (payload) => {
  return await axios({
    url: `${config.baseUrl}/users/sign-in`,
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
