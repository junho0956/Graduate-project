export default function getUserToken(token) {
  let usertoken = {
    token: localStorage.getItem(token),
    email: localStorage.getItem("email"),
  };

  const setToken = (getdata) => {
    console.log(getdata);
    localStorage.setItem("token", getdata.token);
    localStorage.setItem("email", getdata.email);
    usertoken = {
      token: getdata.token,
      email: getdata.email,
    };
  };

  return [usertoken, setToken];
}
