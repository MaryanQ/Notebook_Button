import { app, database } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
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
  const [editObj, setEditObj] = useState(null);
  const [values, loading, error] = useCollection(collection(database, "notes"));
  const data = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  console.log(data);

  // Function to add a new note
  async function buttonHandler() {
    try {
      await addDoc(collection(database, "notes"), { text: text });
      setText(""); // Reset the input field after adding a note
    } catch (err) {
      console.log("Error in db", err);
    }
  }

  // Function to delete a note
  async function deleteDocument(id) {
    try {
      await deleteDoc(doc(database, "notes", id));
      console.log(`Document with ID ${id} deleted`);
    } catch (err) {
      console.log("Error deleting document", err);
    }
  }

  // Opens the update dialog
  function viewUpdateDialog(item) {
    setEditObj(item);
    setText(item.text); // Set the text input with the current note's text
  }

  // Save updated note
  async function saveUpdate() {
    try {
      await updateDoc(doc(database, "notes", editObj.id), { text: text });
      setText(""); // Reset input
      setEditObj(null); // Clear the edit object
    } catch (err) {
      console.log("Error updating document", err);
    }
  }

  return (
    <View style={styles.container}>
      {editObj && (
        <View>
          <TextInput
            value={text} // Controlled input for editing
            onChangeText={(txt) => setText(txt)}
          />
          <Text onPress={saveUpdate} style={styles.updateButton}>
            Save
          </Text>
        </View>
      )}
      <TextInput
        style={styles.textInput}
        value={text} // Controlled input
        placeholder="Enter a new note"
        onChangeText={(txt) => setText(txt)}
      />
      <Button title="Add Note" onPress={buttonHandler} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Text
              onPress={() => deleteDocument(item.id)}
              style={styles.deleteButton}
            >
              Delete
            </Text>
            <Text
              onPress={() => viewUpdateDialog(item)}
              style={styles.updateButton}
            >
              Update
            </Text>
          </View>
        )}
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
    marginTop: 50,
  },
  textInput: {
    backgroundColor: "lightgray",
    minWidth: 200,
    marginBottom: 10,
    padding: 10,
  },
  deleteButton: {
    color: "red",
    marginTop: 5,
  },
  updateButton: {
    color: "blue",
    marginTop: 5,
  },
});
