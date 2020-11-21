import axios from "axios";

export async function getAllCircle() {
  
    const res = await axios({
        method: 'POST',
        headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
        url: "http://3.35.240.252:8080/circles/all", 
      }).
      then((res) => {
        const newCircleList = res.data.map((res) => {
          return {
            id: res.id,
            name: res.name,
            picture: res.circleProfilePhoto,
            school: res.organization,
            location: res.place,
            what: res.category,
          };
        });
        return newCircleList;
      })
      .catch((error) => console.log(error));

    return res;
}
