import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import { theme } from "../theme";

export function ProjectCard({ p }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{p.name}</Text>
      <Text style={styles.desc}>{p.desc}</Text>

      <View style={styles.tags}>
        {p.tags.map((t: string) => (
          <Text key={t} style={styles.tag}>#{t}</Text>
        ))}
      </View>

      {p.links?.repo && (
        <Pressable onPress={() => Linking.openURL(p.links.repo)} style={styles.btn}>
          <Text style={styles.btnText}>GitHub</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  name: { color: theme.text, fontSize: 16, fontWeight: "800" },
  desc: { color: theme.muted },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { color: theme.muted, fontSize: 12 },
  btn: {
    marginTop: 8,
    backgroundColor: theme.accent,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: theme.text, fontWeight: "800" },
});