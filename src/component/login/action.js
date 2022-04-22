import axios from "axios";

export const signIn = async (payload) => {
  const res = await axios({
    url: "http://localhost:4000/users/sign-in",
    method: "post",
    data: payload,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log("er", e);
    });
  //   console.log(res);
  //   return res.data;
};
