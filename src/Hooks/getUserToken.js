// getUserToken Hook
// 자동로그인을 위한 상태값을 반환
// 로그인 시도시 localStorage에 user의 token, email, nickname을 setting함

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
