
import { Pressable, StyleSheet, Text } from "react-native";

interface BotonProps {
  texto: string;
  onPress?: () => void;
  tipo?: "normal" | "especial" | "operador";
  ancho?: boolean;
}

export default function Boton({
  texto,
  onPress,
  tipo = "normal",
  ancho = false,
}: BotonProps) {
  const esOperador = ["÷", "×", "−", "+", "="].includes(texto);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.boton,
        tipo === "especial" && styles.especial,
        tipo === "operador" && styles.operador,
        texto === "=" && styles.igual,
        ancho && styles.ancho,
        pressed && styles.presionado,
      ]}
    >
      <Text
        style={[
          styles.texto,
          tipo === "especial" && styles.textoEspecial,
          (tipo === "operador" || esOperador) && styles.textoOperador,
          texto === "=" && styles.textoIgual,
        ]}
      >
        {texto}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: "23%",
    height: 52,
    borderRadius: 15,
    backgroundColor: "#C5E5FB",
    borderWidth: 1,
    borderColor: "#B5DCF7",
    justifyContent: "center",
    alignItems: "center",
  },
  especial: {
    backgroundColor: "#A8D8F8",
  },
  operador: {
    backgroundColor: "#91CFF5",
  },
  igual: {
    backgroundColor: "#2699E8",
    borderColor: "#2699E8",
  },
  ancho: {
    width: "48.5%",
  },
  texto: {
    color: "#215D8B",
    fontSize: 20,
    fontWeight: "500",
  },
  textoEspecial: {
    color: "#347FB2",
    fontSize: 16,
  },
  textoOperador: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  textoIgual: {
    color: "#FFFFFF",
    fontSize: 25,
  },
  presionado: {
    opacity: 0.65,
  },
});
