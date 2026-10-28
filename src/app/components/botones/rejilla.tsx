
import { StyleSheet, View } from "react-native";
import Boton from "./boton";
import Display from "./display";

const teclas = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

export default function Rejilla() {
  return (
    <View style={styles.calculadora}>
      <Display operacion="0+0" resultado="0" />

      <View style={styles.teclado}>
        {teclas.map((fila, i) =>
          fila.map((tecla, j) => {
            const especial = ["AC", "+/-", "%", "⌫"].includes(tecla);
            const operador = ["÷", "×", "−", "+", "="].includes(tecla);

            return (
              <Boton
                key={`${i}-${j}`}
                texto={tecla}
                tipo={especial ? "especial" : operador ? "operador" : "normal"}
                ancho={tecla === "0"}
              />
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calculadora: {
    width: "100%",
    maxWidth: 380,
    padding: 14,
    borderRadius: 28,
    backgroundColor: "#E8F5FF",
    borderWidth: 1,
    borderColor: "#D1EAFF",
    shadowColor: "#78B9EF",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  teclado: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 9,
    marginTop: 12,
  },
});
