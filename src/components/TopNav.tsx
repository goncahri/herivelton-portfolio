import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../theme";

export function TopNav({
  items,
  onGo,
}: {
  items: { key: string; label: string }[];
  onGo: (key: string) => void;
}) {
  return (
    <View style={styles.nav}>
      {items.map((it) => (
        <Pressable key={it.key} onPress={() => onGo(it.key)} style={styles.item}>
          <Text style={styles.itemText}>{it.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "sticky" as any, // web
    top: 0,
    zIndex: 50,
    backgroundColor: theme.bg,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    paddingVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
  },
  itemText: { color: theme.text, fontWeight: "700", fontSize: 12 },
});