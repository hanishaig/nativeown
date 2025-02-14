import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import axios from "axios";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post("https://api.deepseek.com/v1/chat", {
        message: input,
      });

      const aiMessage = { id: Date.now() + 1, text: response.data.reply, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            {item.sender === "user" ? (
              <Image source={require("../assests/icons/user.png")} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
            ) : (
              <Image source={require("../assets/icons/applogo.jpg")} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
            )}
            <Text style={{ fontSize: 16, backgroundColor: "#f1f1f1", padding: 10, borderRadius: 10 }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopWidth: 1 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadius: 10, padding: 10 }}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10, padding: 10, backgroundColor: "#007bff", borderRadius: 10 }}>
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
