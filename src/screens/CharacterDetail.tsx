import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { fetchHomeworld } from "../services/swapi";

export default function CharacterDetail({ route }: any) {
  const { character } = route.params;
  const [homeworld, setHomeworld] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeworld(character.homeworld);
        setHomeworld(data.name);
        await loadFilms();
      } catch (e) {
        setHomeworld("Unknown");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const loadFilms = async () => {
    try {
      const filmPromises = character.films.map((url: string) =>
        fetch(url).then((res) => res.json()),
      );

      const filmData = await Promise.all(filmPromises);
      setFilms(filmData.map((f) => f.title));
    } catch (e) {
      setFilms([]);
    }
  };

  if (loading)
    return (
      <View style={{ marginVertical: "auto" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={{ uri: character.imageUrl }}
        style={{
          width: 160,
          height: 160,
          borderRadius: 16,
          alignSelf: "center",
          marginBottom: 16,
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {character.name}
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          elevation: 3,
        }}
      >
        <Text>Gender: {character.gender}</Text>
        <Text>Birth Year: {character.birth_year}</Text>
        <Text>Height: {character.height}</Text>
        <Text>Mass: {character.mass}</Text>
        <Text>Homeworld: {homeworld}</Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          elevation: 3,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Films</Text>

        {films.length === 0 ? (
          <Text>No films available</Text>
        ) : (
          films.map((film, index) => <Text key={index}>• {film}</Text>)
        )}
      </View>
    </View>
  );
}
