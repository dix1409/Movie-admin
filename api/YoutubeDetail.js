export const getVideoDetailFromApi = async (url) => {
  return fetch(`https://www.youtube.com/oembed?url=${url}&format=json`)
    .then((response) => response.json())
    .then((json) => {
      //   console.log(json);
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};
