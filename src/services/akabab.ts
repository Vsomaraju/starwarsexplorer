import { getIdFromUrl } from "../utils/helper";

export const getImageFromUrl = async (url: string) => {
  const id = getIdFromUrl(url);
  const idJson = await fetch(
    `https://akabab.github.io/starwars-api/api/id/${id}.json`,
  );
  const { image } = await idJson.json();

  return image;
};
