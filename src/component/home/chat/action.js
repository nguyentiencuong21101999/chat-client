import axios from "axios";
import { config } from "../../../config";
import BaseAction from "../../../base/action";

export const pushNotification = async (payload) => {
  return await axios({
    url: `${config.baseUrl}/users/notification`,
    method: "post",
    data: payload,
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
