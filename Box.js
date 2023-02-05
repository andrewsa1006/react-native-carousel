import { Text, View, Dimensions } from "react-native";

const Box = ({ box }) => {
  const { color, text } = box;
  return (
    <View style={{ height: Dimensions.get("screen").height / 2, width: Dimensions.get("screen").width, backgroundColor: color }}>
      <Text style={{ height: "100%", color: "white", fontSize: 25, textAlign: "center", textAlignVertical: "center" }}>{text}</Text>
    </View>
  );
};

export default Box;
