export default function getUserToken(token) {
  let usertoken = {
    token: localStorage.getItem(token),
    email: localStorage.getItem("email"),
    nickname: localStorage.getItem("nickname"),
  };

  const setToken = (getdata) => {
    localStorage.setItem("token", getdata.token);
    localStorage.setItem("email", getdata.email);
    localStorage.setItem("nickname", getdata.nickname);
    usertoken = {
      token: getdata.token,
      email: getdata.email,
      nickname: getdata.nickname,
    };
  };

  return [usertoken, setToken];
}
