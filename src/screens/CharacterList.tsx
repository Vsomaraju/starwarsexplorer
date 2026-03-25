import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../store/characterSlices";
import { RootState } from "../store/store";
import { Person } from "../types";

export default function CharacterList({ navigation }: any) {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<any>();
  const { characters, loading } = useSelector(
    (state: RootState) => state.characters,
  );

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  // TODO: make the function debounced
  const debouncedSearch = useCallback(
    (value: string) => setSearch(value),
    [search],
  );

  const goToDetails = (character: Person) =>
    navigation.navigate("Detail", { character });

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search Character ..."
        value={search}
        onChangeText={debouncedSearch}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToDetails(item)}>
            <View
              style={{
                flexDirection: "row",
                padding: 12,
                marginBottom: 10,
                backgroundColor: "#fff",
                borderRadius: 12,
                elevation: 3,
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 10,
                  marginRight: 12,
                }}
              />

              <View style={{ justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.name}
                </Text>
                <Text>{item.gender}</Text>
                <Text>{item.birth_year}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
