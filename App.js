import { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, Pressable, Dimensions } from "react-native";

// Box component
const Box = ({ box }) => {
  const { color } = box;
  return (
    <View
      style={{
        height: Dimensions.get("screen").height / 2,
        width: Dimensions.get("screen").width,
        backgroundColor: color,
      }}
    >
      <Text style={{ height: "100%", color: "white", fontSize: 25, textAlign: "center", textAlignVertical: "center" }}>{color}</Text>
    </View>
  );
};

// Main Component
const App = () => {
  let scrollRef = useRef();
  let indexRef = useRef(0);
  let [indicator, setIndicator] = useState(0);

  let boxes = [
    {
      key: 1,
      color: "blue",
    },
    {
      key: 2,
      color: "red",
    },
    {
      key: 3,
      color: "green",
    },
  ];

  const changeSlide = (num) => {
    indexRef.current += num;
    if (indexRef.current > boxes.length - 1) indexRef.current = 0;
    if (indexRef.current < 0) indexRef.current = 0;

    setIndicator(indexRef.current);

    scrollRef.current?.scrollTo({
      x: Dimensions.get("screen").width * indexRef.current,
      animated: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ marginTop: "40%" }}>
      <ScrollView ref={scrollRef} snapToAlignment="end" snapToInterval={Dimensions.get("screen").width} scrollEnabled={false} horizontal>
        {boxes.map((box) => (
          <Box key={box.key} box={box} />
        ))}
      </ScrollView>

      {/* Scroll Position Indicators */}
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        {boxes.map((box, index) => (
          <View
            style={{
              height: 20,
              width: 100,
              marginHorizontal: 20,
              backgroundColor: index === indicator ? "grey" : "lightgrey",
              borderRadius: 15,
            }}
            key={box.key}
          >
            <Text></Text>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
        <Pressable onPress={changeSlide.bind(this, -1)} style={{ backgroundColor: "black", marginTop: 5, width: 150, height: 60, borderRadius: 10 }}>
          <Text style={{ color: "white", textAlign: "center", textAlignVertical: "center", height: "100%", fontSize: 20 }}>Back</Text>
        </Pressable>

        <Pressable onPress={changeSlide.bind(this, 1)} style={{ backgroundColor: "black", marginTop: 5, width: 150, height: 60, borderRadius: 10 }}>
          <Text style={{ color: "white", textAlign: "center", textAlignVertical: "center", height: "100%", fontSize: 20 }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default App;
