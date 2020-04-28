import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `Novo project ${Date.now()}`,
      owner: "Nury",
    });
    setProjects([...projects, response.data]);
  }
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7159c1",
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  project: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
