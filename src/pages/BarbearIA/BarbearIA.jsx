import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Send, Bot, User } from "lucide-react";
import styles from "./BarbearIA.module.css";
import { useTheme } from "../../ThemeContext";

export function BarbearIA() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    { type: "bot", content: "Olá! Como posso ajudar você hoje?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages([...messages, { type: "user", content: inputMessage }]);
    setInputMessage("");
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.lateralBarra}>
        <div className={styles.buttonNovaConversa}>
          <Button variant="secondary">Nova conversa</Button>
        </div>
      </div>
      <div className={styles.containerPrincipal}>
        <div className={styles.messagesContainer}>
          <Container>
            {messages.map((message, index) => (
              <Row
                key={index}
                className={`${styles.messageRow} ${
                  message.type === "bot"
                    ? styles.botMessage
                    : styles.userMessage
                }`}
              >
                <Col className="d-flex gap-3">
                  <div className={styles.iconContainer}>
                    {message.type === "bot" ? (
                      <Bot size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div className={styles.messageText}>{message.content}</div>
                </Col>
              </Row>
            ))}
          </Container>
        </div>
        <div className={styles.inputContainer}>
          <Container>
            <Form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <Form.Control
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className={styles.inputField}
                />
                <Button
                  type="submit"
                  variant="link"
                  className={styles.sendButton}
                >
                  <Send size={20} />
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}
