import { Person } from "../types";
import { getImageFromUrl } from "./akabab";

export const fetchCharactersWithImageUrls = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch characters");

  const data = await res.json();
  const characters = data.results;

  // call the API for getting Images
  const charactersWImageUrls = await Promise.all(
    characters.map(async (user: Person) => {
      return {
        ...user,
        imageUrl: await getImageFromUrl(user.url),
      };
    }),
  );
  return charactersWImageUrls;
};

export const fetchHomeworld = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch homeworld!");
  return res.json();
};
