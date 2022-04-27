import axios from "axios";

import BaseAction from "../../base/action";
import { config } from "../../config";

export const SignOut = async (payload) => {
  return await axios({
    url: `${config.baseUrl}/users/sign-out`,
    method: "post",
    headers: {
      Authorization: `BaseAction ${BaseAction.getToken()}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};
