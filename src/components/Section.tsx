import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingTop: 18,
    marginTop: 18,
  },
  title: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  body: { gap: 10 },
});