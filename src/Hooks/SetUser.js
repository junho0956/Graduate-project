export default function SetUser(token) {
  let user = {
    token: localStorage.getItem(token),
    email: localStorage.getItem("email"),
    nickname: localStorage.getItem("nickname"),
  };

  const setUser = res => {
    localStorage.setItem("token", res.token);
    localStorage.setItem("email", res.email);
    localStorage.setItem("nickname", res.nickname);
    user = {
      token: getdata.token,
      email: getdata.email,
      nickname: getdata.nickname,
    };
  };

  return [user, setUser];
}
