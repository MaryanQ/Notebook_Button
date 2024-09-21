import { app, database } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  Button,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  // const notes = [
  // { key: 1, name: "Anna" },
  //{ key: 2, name: "Bob" },
  // ];

  async function buttonHandler() {
    try {
      await addDoc(collection(database, "notes"), { text: text });
    } catch (err) {
      console.log("fejl i db", err);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(txt) => setText(txt)}
      />
      <Button
        style={styles.Button}
        title="Press me"
        onPress={buttonHandler}
      ></Button>
      <FlatList
        data={notes}
        renderItem={(note) => <Text>{note.item.name}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  textInput: {
    backgroundColor: "lightgray",
    minWidth: 200,
  },
});
