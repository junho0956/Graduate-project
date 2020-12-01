import axios from "axios";
import {User} from '../../model';

/**
 * 
 * @param {User} userInfo 
 */

export async function getUserCircle(userInfo) {
  
  /**
   * await는 Promise 객체는 pending 자체를 기다린 후에 반환하지만,
   * Promise 배열은 pending 을 기다리지 않고 반환하게 된다.
   * 즉 async/await만 사용해서 Promise 배열을 다룰수 없다.
   * Promise.all 은 Promise배열의 모든 값들의 promise를 기다린 후에 반환한다.
   * 중도에 거부하는 promise 객체가 있더라도 전체값을 반환한다.
   * 중도에 거부하는 promise가 발생시 즉시 중단하려면 Promise.reduce를 사용한다.
   */

  // 위에서 받은 동아리 정보를 기준으로 join,follow 를 구분하여 axios
  const myCircleResult = await Promise.all(
    userInfo.myCircle.map(async (res) => {
      return await axios({
        method: "POST",
        url: `http://3.35.240.252:8080/circles/found2`,
        headers: {'Authorization':'Bearer ' + localStorage.getItem('token')},
        data: {circleName : res.name}
      });
    })
  );
  const followcircleResult = await Promise.all(
    userInfo.followCircle.map(async (res) => {
      return await axios({
        method: "POST",
        url: `http://3.35.240.252:8080/circles/found2`,
        headers: {'Authorization':'Bearer ' + localStorage.getItem('token')},
        data: {circleName : res.name}
      });
    })
  );

  const getjoinInfo = myCircleResult.map(res => res.data);
  const getfollowInfo = followcircleResult.map(res => res.data);

  return {
    myCircle: getjoinInfo,
    followCircle: getfollowInfo,
  };
}
