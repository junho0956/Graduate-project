import axios from "axios";

export async function getUserProfile(nickname) {
  const res = await axios({
    method: "GET",
    url: `http://3.35.240.252:8080/users/${nickname}`,
  });
  return {
    organization: res.data.user_organization,
    userPhoto: res.data.profilePhoto,
    followCircle: res.data.followCircle,
    joinCircle: res.data.myCircle,
  };
}
