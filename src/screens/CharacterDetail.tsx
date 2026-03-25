import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { fetchHomeworld } from "../services/swapi";

export default function CharacterDetail({ route }: any) {
  const { character } = route.params;
  const [homeworld, setHomeworld] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeworld = async () => {
      try {
        const data = await fetchHomeworld(character.homeworld);
        setHomeworld(data.name);
      } catch (e) {
        setHomeworld("Unknown");
      } finally {
        setLoading(false);
      }
    };

    loadHomeworld();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ alignItems: "center", padding: 16 }}>
      <Image
        source={{ uri: character.imageUrl }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 12,
          marginBottom: 16,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{character.name}</Text>
      <Text>Height: {character.height}</Text>
      <Text>Mass: {character.mass}</Text>
      <Text>Films: {character.films.length}</Text>
    </View>
  );
}
