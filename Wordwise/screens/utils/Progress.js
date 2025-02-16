import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveScore = async (score) => {
  try {
    await AsyncStorage.setItem("highScore", JSON.stringify(score));
  } catch (error) {
    console.error("Error saving score", error);
  }
};

export const getScore = async () => {
  try {
    const score = await AsyncStorage.getItem("highScore");
    return score ? JSON.parse(score) : 0;
  } catch (error) {
    console.error("Error retrieving score", error);
  }
};
