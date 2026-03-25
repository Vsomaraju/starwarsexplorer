import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CharacterList from "../screens/CharacterList";
import CharacterDetail from "../screens/CharacterDetail";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Characters" component={CharacterList} />
      <Stack.Screen name="Detail" component={CharacterDetail} />
    </Stack.Navigator>
  );
}
