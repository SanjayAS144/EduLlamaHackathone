import React, { useState, useRef, useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SendIcon from "@mui/icons-material/Send";
import messageService from "services/messageService";

function ChatComponent() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: inputValue },
      { role: "assistant", content: "This is a simulated response." }
    ];
    setMessages(newMessages);
    setInputValue("");
  };

  useEffect(() => {
    messageService.
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SoftBox>
      <SoftBox mb={2} height="60vh" overflow="auto">
        {messages.map((message, index) => (
          <SoftBox
            key={index}
            mb={2}
            display="flex"
            justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
          >
            <SoftBox
              backgroundColor={message.role === "assistant" ? "light" : "info"}
              borderRadius="lg"
              p={2}
              maxWidth="80%"
            >
              <SoftTypography variant="button" color={message.role === "assistant" ? "text" : "white"}>
                {message.content}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        ))}
        <div ref={messagesEndRef} />
      </SoftBox>
      <form onSubmit={handleSendMessage}>
        <SoftBox display="flex" gap={2}>
          <SoftInput
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
          <SoftButton type="submit" variant="contained" color="info" startIcon={<SendIcon />}>
            Send
          </SoftButton>
        </SoftBox>
      </form>
    </SoftBox>
  );
}

export default ChatComponent;
