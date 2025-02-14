import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import { DEEPSEEK_API_KEY } from "@env"; // Import API Key

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions', // Correct endpoint
        {
          model: "deepseek-chat", // Add the required model field
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.choices[0].message.content, // Adjust based on API response
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === "user" ? styles.userMessage : styles.aiMessage]}>
            <Image
              source={item.sender === "user" ? require("../assests/icons/user.png") : require("../assests/icons/applogo.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={isLoading}>
          <Text style={styles.sendText}>{isLoading ? "Sending..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 10 },
  messageContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10, padding: 10, borderRadius: 10 },
  userMessage: { alignSelf: "flex-start", backgroundColor: "#d1e7ff" },
  aiMessage: { alignSelf: "flex-start", backgroundColor: "#f1f1f1" },
  avatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10, borderTopWidth: 1 },
  input: { flex: 1, borderWidth: 1, borderRadius: 10, padding: 10 },
  sendButton: { marginLeft: 10, padding: 10, backgroundColor: "#007bff", borderRadius: 10 },
  sendText: { color: "white" },
});