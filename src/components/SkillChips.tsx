import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export function SkillChips({ items }: { items: string[] }) {
  return (
    <View style={styles.row}>
      {items.map((s) => (
        <View key={s} style={styles.chip}>
          <Text style={styles.txt}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  txt: { color: theme.text, fontSize: 12, fontWeight: "600" },
});