
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Rejilla from "./components/botones/rejilla";

export default function Index() {
  return (
    <View style={styles.fondo}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecera}>
          <Text style={styles.titulo}>Calculadora</Text>
          <Text style={styles.subtitulo}>
            Calculadora básica
          </Text>
        </View>

        <Rejilla />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: "#DDF0FF",
  },

  contenido: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  cabecera: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    marginBottom: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#235D8A",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 14,
    color: "#6F9BBD",
  },
});
