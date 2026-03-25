import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useDebounce } from "../utils/useDebounce";

export default function CharacterList({ navigation }: any) {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<any>();
  const { characters, loading, refreshing, page, hasMore } = useSelector(
    (state: RootState) => state.characters,
  );
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(getCharacters(1));
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getCharacters(1));
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(getCharacters(page));
    }
  }, [loading, hasMore, page, dispatch]);

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const goToDetails = (character: Person) =>
    navigation.navigate("Detail", { character });

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search Character ..."
        value={search}
        onChangeText={setSearch}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {loading && characters.length === 0 && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}

      {!loading && filteredCharacters.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No characters found 🚀
        </Text>
      )}

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.name}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={
          loading ? <ActivityIndicator style={{ margin: 10 }} /> : null
        }
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
