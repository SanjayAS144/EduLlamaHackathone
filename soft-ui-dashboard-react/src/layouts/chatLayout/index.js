import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import SoftTypography from "components/SoftTypography";
import CircularProgress from "@mui/material/CircularProgress";
import messageService from "services/messageService";
import ReactMarkdown from 'react-markdown';

function ChatLayout() {
  const location = useLocation();
  const { day, activities, courseName } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage1 = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    const newMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    try {
      const subtopic = activities.join(' ');
      const response = await messageService.chat(courseName, subtopic, day, newMessages);
      setMessages([...newMessages, response]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add an error message to the chat
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    const newMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    try {
      const subtopic = activities.join(' ');
      const response = await messageService.chat2(courseName, subtopic, day, inputValue);
      setMessages([...newMessages, response]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add an error message to the chat
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const fetchInitialMessage = async () => {
      setIsLoading(true);
      try {
        const history = await messageService.getALLMessages(day,courseName);
        console.log(history)
        if(messages != undefined && history.length!=0){
          console.log(history.length)
          setIsLoading(false);
          return;
        }
        console.log("I am Sanjay And API is not working")
        const initialQuestion = "start the tutorial with " + activities[0];
        console.log(initialQuestion)
        const messages = [{ role: "user", content: initialQuestion }];
        console.log(messages);
        setMessages(messages);4
        console.log(messages)
        const subtopic = activities.join(' ');
        const response = await messageService.chat2(courseName, subtopic, day, initialQuestion);
        console.log(response)
        // setMessages([...messages, response]);
      } catch (error) {
        console.error("Error fetching initial message:", error);
        // Optionally add an error message to the chat
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMessage();
  }, [day, activities, courseName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox 
        display="flex" 
        flexDirection="column" 
        height="calc(100vh - 90px)"
      >
        <SoftBox 
          flexGrow={1} 
          overflow="auto" 
          p={3}
          sx={{
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              outline: '1px solid slategrey'
            }
          }}
        >
          <Grid container spacing={3} sx={{ flexGrow: 1, mb: 2 }}>
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SoftBox 
                  p={3} 
                  flexGrow={1} 
                  overflow="auto" 
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,.1)',
                      outline: '1px solid slategrey'
                    }
                  }}
                >
                  {isLoading ? (
                    <SoftBox display="flex" justifyContent="center" alignItems="center" height="100%">
                      <CircularProgress />
                    </SoftBox>
                  ) : (
                    <>
                      {messages.map((message, index) => (
                        <SoftBox
                          key={index}
                          mb={2}
                          display="flex"
                          justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
                        >
                          <Card
                            sx={{
                              maxWidth: "80%",
                              backgroundColor: message.role === "assistant" ? "grey.100" : "info.main",
                              color: message.role === "assistant" ? "text.primary" : "common.white",
                            }}
                          >
                            <SoftBox p={2}>
                              {message.role === "assistant" ? (
                                <ReactMarkdown
                                  components={{
                                    p: ({ node, ...props }) => <SoftTypography variant="body2" {...props} />,
                                    h1: ({ node, ...props }) => <SoftTypography variant="h4" {...props} />,
                                    h2: ({ node, ...props }) => <SoftTypography variant="h5" {...props} />,
                                    h3: ({ node, ...props }) => <SoftTypography variant="h6" {...props} />,
                                    ul: ({ node, ...props }) => <SoftTypography component="ul" sx={{ pl: 2 }} {...props} />,
                                    ol: ({ node, ...props }) => <SoftTypography component="ol" sx={{ pl: 2 }} {...props} />,
                                    li: ({ node, ...props }) => <SoftTypography component="li" variant="body2" {...props} />,
                                    code: ({ node, inline, ...props }) => (
                                      inline ? 
                                        <SoftTypography component="code" sx={{ backgroundColor: 'grey.200', p: 0.5, borderRadius: 1 }} {...props} /> :
                                        <SoftBox component="pre" sx={{ backgroundColor: 'grey.200', p: 1, borderRadius: 1, overflowX: 'auto' }}>
                                          <SoftTypography component="code" {...props} />
                                        </SoftBox>
                                    ),
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              ) : (
                                <SoftTypography variant="body2">
                                  {message.content}
                                </SoftTypography>
                              )}
                            </SoftBox>
                          </Card>
                        </SoftBox>
                      ))}
                      {isSending && (
                        <SoftBox display="flex" justifyContent="center" mt={2}>
                          <CircularProgress size={24} />
                        </SoftBox>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </SoftBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <SoftBox p={3}>
                  <SoftTypography variant="h6" gutterBottom>
                    Additional Information
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    This card can be used for displaying extra content, settings, or any other relevant information for your chat application.
                  </SoftTypography>
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox p={3} mt="auto">
          <form onSubmit={handleSendMessage}>
            <SoftBox display="flex" gap={2}>
              <SoftInput
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{
                  '& .MuiInputBase-root': {
                    height: 'calc(3rem + 1rem)',
                    alignItems: 'flex-start',
                    '& textarea': {
                      height: '100% !important',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                    },
                  },
                }}
              />
              <SoftButton 
                type="submit" 
                variant="contained" 
                color="info" 
                startIcon={isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{ height: 'calc(3rem + 1rem)' }}
                disabled={isSending}
              >
                Send
              </SoftButton>
            </SoftBox>
          </form>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default ChatLayout;
