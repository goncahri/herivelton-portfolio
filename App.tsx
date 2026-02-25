import React, { useMemo, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";

import { profile } from "./src/data/profile";
import { theme } from "./src/theme";
import { TopNav } from "./src/components/TopNav";
import { Section } from "./src/components/Section";
import { ProjectCard } from "./src/components/ProjectCard";
import { SkillChips } from "./src/components/SkillChips";

type SectionKey = "sobre" | "experiencia" | "projetos" | "skills" | "contato";

export default function App() {
  const scrollRef = useRef<ScrollView>(null);

  // guarda o Y de cada seção
  const y = useRef<Record<SectionKey, number>>({
    sobre: 0,
    experiencia: 0,
    projetos: 0,
    skills: 0,
    contato: 0,
  });

  const navItems = useMemo(
    () => [
      { key: "sobre", label: "Sobre" },
      { key: "experiencia", label: "Experiência" },
      { key: "projetos", label: "Projetos" },
      { key: "skills", label: "Habilidades" },
      { key: "contato", label: "Contato" },
    ],
    []
  );

  function goTo(key: SectionKey) {
    scrollRef.current?.scrollTo({ y: y.current[key] ?? 0, animated: true });
  }

  const isWide = Dimensions.get("window").width >= 900;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {/* NAV FUNCIONANDO */}
      <TopNav items={navItems} onGo={(k) => goTo(k as SectionKey)} />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.container, isWide && styles.containerWide]}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <Image source={require("./assets/perfil.jpg")} style={styles.avatar} />

          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>

          <Text style={styles.summary}>{profile.summary}</Text>

          {/* BOTÕES COM TODOS OS LINKS */}
          <View style={styles.actions}>
            <Pressable onPress={() => Linking.openURL(profile.links.github)} style={styles.btnPrimary}>
              <Text style={styles.btnText}>GitHub</Text>
            </Pressable>

            {profile.links.linkedin.includes("http") && (
              <Pressable onPress={() => Linking.openURL(profile.links.linkedin)} style={styles.btnSecondary}>
                <Text style={styles.btnText}>LinkedIn</Text>
              </Pressable>
            )}

            <Pressable onPress={() => Linking.openURL(profile.links.email)} style={styles.btnSecondary}>
              <Text style={styles.btnText}>E-mail</Text>
            </Pressable>

            {profile.links.whatsapp.includes("http") && (
              <Pressable onPress={() => Linking.openURL(profile.links.whatsapp)} style={styles.btnSecondary}>
                <Text style={styles.btnText}>WhatsApp</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* SOBRE */}
        <View onLayout={(e) => (y.current.sobre = e.nativeEvent.layout.y)}>
          <Section title="Sobre">
            <Text style={styles.p}>{profile.summary}</Text>
            <Text style={styles.p}>
              Busco minha primeira oportunidade/estágio em TI, onde eu possa aplicar meus conhecimentos,
              colaborar com times e evoluir com boas práticas. Gosto de entender o problema antes de propor a solução.
            </Text>
          </Section>
        </View>

        {/* EXPERIÊNCIA */}
        <View onLayout={(e) => (y.current.experiencia = e.nativeEvent.layout.y)}>
          <Section title="Experiência & Formação">
            {profile.experiencia.map((xp) => (
              <View key={xp.title} style={styles.card}>
                <Text style={styles.cardTitle}>{xp.title}</Text>
                <Text style={styles.cardMeta}>{xp.period}</Text>
                {xp.bullets.map((b) => (
                  <Text key={b} style={styles.p}>• {b}</Text>
                ))}
              </View>
            ))}
          </Section>
        </View>

        {/* PROJETOS */}
        <View onLayout={(e) => (y.current.projetos = e.nativeEvent.layout.y)}>
          <Section title="Projetos">
            {profile.projetos.map((p) => (
              <ProjectCard key={p.name} p={p as any} />
            ))}
          </Section>
        </View>

        {/* HABILIDADES */}
        <View onLayout={(e) => (y.current.skills = e.nativeEvent.layout.y)}>
          <Section title="Habilidades">
            <Text style={styles.sub}>Principais</Text>
            <SkillChips items={profile.skills.principais} />

            <Text style={[styles.sub, { marginTop: 12 }]}>Extras</Text>
            <SkillChips items={profile.skills.extras} />
          </Section>
        </View>

        {/* CONTATO */}
        <View onLayout={(e) => (y.current.contato = e.nativeEvent.layout.y)}>
          <Section title="Contato">
            <Text style={styles.p}>
              Quer falar comigo? Me chama por e-mail, WhatsApp ou LinkedIn.
            </Text>

            <View style={styles.actions}>
              <Pressable onPress={() => Linking.openURL(profile.links.email)} style={styles.btnPrimary}>
                <Text style={styles.btnText}>Enviar e-mail</Text>
              </Pressable>

              {profile.links.whatsapp.includes("http") && (
                <Pressable onPress={() => Linking.openURL(profile.links.whatsapp)} style={styles.btnSecondary}>
                  <Text style={styles.btnText}>WhatsApp</Text>
                </Pressable>
              )}

              {profile.links.linkedin.includes("http") && (
                <Pressable onPress={() => Linking.openURL(profile.links.linkedin)} style={styles.btnSecondary}>
                  <Text style={styles.btnText}>LinkedIn</Text>
                </Pressable>
              )}
            </View>

            <Text style={styles.footer}>
              © {new Date().getFullYear()} {profile.name} • Feito com Expo (React Native) e exportado para web.
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.bg },
  container: { padding: 18, gap: 12 },
  containerWide: { maxWidth: 980, width: "100%", alignSelf: "center" },

  hero: { alignItems: "center", paddingTop: 10, gap: 10, marginBottom: 6 },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: theme.border,
  },
  name: { color: theme.text, fontSize: 30, fontWeight: "900", marginTop: 6 },
  title: { color: theme.muted, fontSize: 14, fontWeight: "700", textAlign: "center" },
  summary: { color: theme.text, lineHeight: 22, textAlign: "center", maxWidth: 720, marginTop: 6 },

  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 10 },

  btnPrimary: { backgroundColor: theme.accent, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  btnSecondary: { borderWidth: 1, borderColor: theme.border, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, backgroundColor: theme.card },
  btnText: { color: theme.text, fontWeight: "800" },

  p: { color: theme.muted, lineHeight: 20 },
  sub: { color: theme.text, fontWeight: "900" },

  card: { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, padding: 14, borderRadius: 14, gap: 6 },
  cardTitle: { color: theme.text, fontSize: 15, fontWeight: "800" },
  cardMeta: { color: theme.muted, fontSize: 12 },

  footer: { marginTop: 14, color: theme.muted, fontSize: 12, textAlign: "center" },
});