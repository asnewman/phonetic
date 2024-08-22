import { sentencesAtom } from "@/store";
import { Link } from "expo-router";
import { useAtom } from "jotai";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const [sentences] = useAtom(sentencesAtom);

  return (
    <View>
      <Link
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
          textAlign: "center",
        }}
        href="/create"
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          +
        </Text>
      </Link>
      <FlatList
        data={sentences}
        renderItem={({ item }) => (
          <Link
            style={{
              width: "100%",
              borderBottomColor: "#D3D3D3",
              borderBottomWidth: 1,
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
            href={{
              pathname: "/sentence",
              params: {
                english: item.english,
                hebrew: item.hebrew,
                phonetic: item.phonetic,
              },
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {item.english}
            </Text>
          </Link>
        )}
      />
    
    </View>
  );
}
