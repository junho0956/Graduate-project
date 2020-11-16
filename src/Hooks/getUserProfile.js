import axios from "axios";

export async function getUserProfile(nickname) {
  const formdata = {
    nickName: nickname
  };

  const token = localStorage.getItem('token');
  
  const res = await axios({
    method: "POST",
    url: `http://3.35.240.252:8080/users/found`,
    headers: {'Authorization':'Bearer ' + token},
    data: formdata
  });

  localStorage.setItem('userId', res.data.id);

  return {
    organization: res.data.user_organization,
    userPhoto: res.data.profilePhoto,
    followCircle: res.data.followCircle,
    joinCircle: res.data.myCircle,
  };
}
