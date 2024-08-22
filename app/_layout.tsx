import { Stack } from "expo-router";
import { Provider } from "jotai";

export default function RootLayout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            // Hide the header for this route
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sentence"
          options={{
            title: "Edit Sentence"
          }}
        />
      </Stack>
    </Provider>
  );
}
