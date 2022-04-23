import axios from "axios";

export const signUp = async (payload) => {
  return await axios({
    url: "http://localhost:4000/users/sign-up",
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
