import axios from "axios";

/**
 * 
 * @param {String} nickname 
 */

export async function getUserProfile(nickname) {
  const formdata = {
    nickName: nickname
  }; 
  
  const result = await axios({
    method: "POST",
    url: `http://3.35.240.252:8080/users/found`,
    headers: {'Authorization':'Bearer ' + localStorage.getItem('token')},
    data: formdata
  }).catch(error => console.log(error));
  
  if(localStorage.getItem('userId') === null){
    localStorage.setItem('userId', result.data.id);
  }

  return result.data;
}
