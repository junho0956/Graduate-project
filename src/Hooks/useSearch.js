import axios from "axios";

export default async function useSearch({}) {
  return [
    await axios({
      method: "GET",
      url: "http://3.35.240.252:8080/circles",
    })
      .then((res) => {
        res.data.map((res) => {
          return {
            name: res.name,
            information: {
              school: res.organization,
              location: "Busan",
              what: res.category,
            },
          };
        });
      })
      .catch((error) => console.log(error)),
    () => {},
  ];
}
