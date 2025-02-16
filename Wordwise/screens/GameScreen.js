import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getWordByLevel } from "../utils/words";

export default function GameScreen({ navigation }) {
  const playerLevel = 55; // Example: Player at level 55 (Hard)
  const [word, setWord] = useState(getWordByLevel(playerLevel));
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    if (input.toLowerCase() === word.toLowerCase()) {
      const newScore = score + 1;
      setScore(newScore);
      Alert.alert("✅ Correct!", `Well done! Your score: ${newScore}`);
      setWord(getWordByLevel(playerLevel)); // Fetch new word
      setInput(""); // Clear input
    } else {
      Alert.alert("❌ Oops!", "Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spell the Word:</Text>
      <Text style={styles.word}>{word[0]} _ _ _</Text>
      <TextInput 
        style={styles.input} 
        value={input} 
        onChangeText={setInput} 
        autoCapitalize="none"
      />
      <Button title="Check" onPress={checkAnswer} />
      <Button title="End Game" onPress={() => navigation.navigate("Results", { score })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  word: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "blue" },
  input: { borderWidth: 1, padding: 10, margin: 10, width: "80%", borderRadius: 5 },
});
