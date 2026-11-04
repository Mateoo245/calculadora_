import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { evaluate } from "mathjs";

const buttons = [
  ["AC", "DEL", "(", ")", "÷"],
  ["sin", "cos", "tan", "√", "x²"],
  ["7", "8", "9", "×", "xʸ"],
  ["4", "5", "6", "−", "π"],
  ["1", "2", "3", "+", "%"],
  ["0", ".", "=",],
];

export default function Index() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [degrees, setDegrees] = useState(true);

  const { width } = useWindowDimensions();

  const handlePress = (value: string) => {
    if (value === "AC") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "DEL") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "DEG") {
      setDegrees((prev) => !prev);
      return;
    }

    if (value === "=") {
      try {
        if (!expression) return;

        const scope = {
          sin: (x: number) =>
            Math.sin(degrees ? (x * Math.PI) / 180 : x),
          cos: (x: number) =>
            Math.cos(degrees ? (x * Math.PI) / 180 : x),
          tan: (x: number) =>
            Math.tan(degrees ? (x * Math.PI) / 180 : x),
          sqrt: Math.sqrt,
          pi: Math.PI,
        };

        const answer = evaluate(expression, scope);

        if (
          typeof answer !== "number" ||
          !Number.isFinite(answer)
        ) {
          setResult("Error");
          return;
        }

        const formatted = Number(answer.toPrecision(10)).toString();
        setResult(formatted);
      } catch {
        setResult("Error");
      }

      return;
    }

    const values: Record<string, string> = {
      "÷": "/",
      "×": "*",
      "−": "-",
      "sin": "sin(",
      "cos": "cos(",
      "tan": "tan(",
      "√": "sqrt(",
      "x²": "^2",
      "xʸ": "^",
      "π": "pi",
      "%": "/100",
    };

    setExpression((prev) => prev + (values[value] ?? value));
  };

  const isOperator = (value: string) =>
    ["÷", "×", "−", "+", "xʸ", "x²"].includes(value);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#171717"
      />

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Calculadora</Text>
        <Text style={styles.subtitle}>Calculadora científica</Text>
      </View>

      {/* Pantalla */}
      <View style={styles.display}>
        <View style={styles.modeContainer}>
          <Pressable
            onPress={() => setDegrees((prev) => !prev)}
            style={styles.modeButton}
          >
            <Text style={styles.modeText}>
              {degrees ? "DEG" : "RAD"}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <Text style={styles.expression}>
            {expression || "0"}
          </Text>
        </ScrollView>

        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
          {result}
        </Text>
      </View>

      {/* Teclado científico */}
      <View style={styles.keyboard}>
        {buttons.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((button) => {
              const special = isOperator(button);
              const functionButton = [
                "sin", "cos", "tan", "√", "π", "(", ")", "%", "DEG",
              ].includes(button);
              const clear = button === "AC" || button === "DEL";
              const equals = button === "=";
              const zero = button === "0";

              return (
                <Pressable
                  key={button}
                  onPress={() => handlePress(button)}
                  style={({ pressed }) => [
                    styles.button,
                    zero && styles.zeroButton,
                    special && styles.operatorButton,
                    functionButton && styles.functionButton,
                    clear && styles.clearButton,
                    equals && styles.equalsButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      special && styles.operatorText,
                      functionButton && styles.functionText,
                      clear && styles.clearText,
                      equals && styles.equalsText,
                    ]}
                  >
                    {button}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingHorizontal: 10,
  },

  header: {
    paddingTop: 12,
    paddingLeft: 8,
  },

  title: {
    color: "#E8EAED",
    fontSize: 23,
    fontWeight: "600",
  },

  subtitle: {
    color: "#9AA0A6",
    fontSize: 13,
    marginTop: 4,
  },

  display: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  modeContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },

  modeButton: {
    backgroundColor: "#303134",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  modeText: {
    color: "#8AB4F8",
    fontSize: 13,
    fontWeight: "600",
  },

  expression: {
    color: "#AAB4C0",
    fontSize: 27,
    textAlign: "right",
  },

  result: {
    color: "#E8EAED",
    fontSize: 48,
    fontWeight: "300",
    textAlign: "right",
    marginTop: 15,
  },

  keyboard: {
    paddingBottom: 12,
    gap: 9,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 7,
  },

  button: {
    flex: 1,
    height: 61,
    borderRadius: 35,
    backgroundColor: "#303134",
    justifyContent: "center",
    alignItems: "center",
  },

  zeroButton: {
    flex: 2,
  },

  operatorButton: {
    backgroundColor: "#3C4043",
  },

  functionButton: {
    backgroundColor: "#303A4A",
  },

  clearButton: {
    backgroundColor: "#3C4043",
  },

  equalsButton: {
    backgroundColor: "#8AB4F8",
  },

  buttonText: {
    color: "#E8EAED",
    fontSize: 23,
    fontWeight: "400",
  },

  operatorText: {
    color: "#8AB4F8",
  },

  functionText: {
    color: "#AECBFA",
    fontSize: 17,
    fontWeight: "500",
  },

  clearText: {
    color: "#F28B82",
    fontSize: 17,
  },

  equalsText: {
    color: "#202124",
    fontSize: 26,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.55,
  },
});
