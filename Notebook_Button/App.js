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

  function buttonHandler() {
    //alert("you typed: " + text);
    setNotes([...notes, { key: notes.length, name: text }]);
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
