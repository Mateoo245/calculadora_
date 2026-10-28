
import { StyleSheet, Text, View } from "react-native";

interface DisplayProps {
  operacion: string;
  resultado: string;
}

export default function Display({
  operacion,
  resultado,
}: DisplayProps) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.operacion} numberOfLines={1}>
        {operacion}
      </Text>

      <Text
        style={styles.resultado}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {resultado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    minHeight: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#E8F5FF",
    borderRadius: 20,
  },

  operacion: {
    color: "#6F9BBD",
    fontSize: 24,
    marginBottom: 8,
  },

  resultado: {
    color: "#235D8A",
    fontSize: 38,
    fontWeight: "600",
  },
});
