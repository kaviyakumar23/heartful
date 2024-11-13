"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { type: "user", content: input }]);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          user_id: user.user_id,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: data.response,
          resources: data.resources,
          actionItems: data.action_items,
        },
      ]);

      if (data.crisis_detected) {
        setMessages((prev) => [
          ...prev,
          {
            type: "alert",
            content: "Crisis Resources Available",
            crisis: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "Sorry, there was an error sending your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.type === "user"
                  ? "bg-red-500 text-white"
                  : message.type === "alert"
                  ? "bg-red-50 border-red-200 border"
                  : message.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-50"
              }`}
            >
              <p>{message.content}</p>
              {message.resources && (
                <div className="mt-3 space-y-2">
                  <p className="font-medium text-sm">Recommended Resources:</p>
                  {message.resources.map((resource, idx) => (
                    <div key={idx} className="text-sm bg-white p-2 rounded">
                      <p className="font-medium">{resource.title}</p>
                      <p className="text-gray-600 text-xs">{resource.source}</p>
                    </div>
                  ))}
                </div>
              )}
              {message.actionItems && (
                <div className="mt-3 space-y-2">
                  <p className="font-medium text-sm">Suggested Actions:</p>
                  <ul className="list-disc list-inside text-sm">
                    {message.actionItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 transition-colors"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">Press Enter to send your message</p>
      </div>
    </div>
  );
}
