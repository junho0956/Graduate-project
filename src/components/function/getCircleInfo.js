import axios from 'axios';
export async function getCircleInfo(circleName){
    
    const getcircleInfo = await axios({
        method:'POST',
        url:`http://3.35.240.252:8080/circles/found2`,
        headers: {'Authorization':'Bearer '+localStorage.getItem('token')},
        data:{circleName:circleName}
      });
      const userEmail = localStorage.getItem('email');

      let checkUserJoinCircle = getcircleInfo.data.circleMember.filter(res => res.email === userEmail);
      let checkUserFollowCircle = getcircleInfo.data.circleFollower.filter(res => res.email === userEmail);
      checkUserJoinCircle = checkUserJoinCircle.length > 0 ? true : false;
      checkUserFollowCircle = checkUserFollowCircle.length > 0 ? true : false;
      
      let newCircle = getcircleInfo.data;
      newCircle.circleUserCheck = {
          join : checkUserJoinCircle, 
          follow : checkUserFollowCircle
      }
      const makeDataForPost = newCircle.circlePosts.map(res => {
        res.circleProfilePhoto = newCircle.circleProfilePhoto;
        res.circleName = newCircle.name;
        return res;
      });

      return {
          circle: newCircle,
          dataForPost: makeDataForPost
      }
}