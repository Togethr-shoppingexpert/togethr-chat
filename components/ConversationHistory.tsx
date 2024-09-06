import React, { useEffect,useState } from "react";
import { FaTimes } from "react-icons/fa";
import { config } from "../constants";
const API_ENDPOINT = config.url;
console.log("API_ENDPOINT: ", API_ENDPOINT);

interface Conversation {
  conversation: {
    ConversationId: string;
    platform: string;
    createdAt: string;
    updatedAt: string;
    UserId: string;
  };
  firstMessage: {
    MessageId: string;
    ConversationId: string;
    MessageBody: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    tokenUsage: number;
    containsProduct: boolean;
  };
}

interface SidePanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, setIsOpen }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const jwtToken = localStorage.getItem("token"); // Retrieve the JWT token from localStorage

  useEffect(() => {
    if (isOpen) {
      fetchConversations();
    }
  }, [isOpen]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://${API_ENDPOINT}/api/WebChatbot/conversation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      const data: Conversation[] = await response.json();
      setConversations(data);
      console.log("history button history", data)
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-40`}
    >
      <div className="flex justify-between p-4 bg-gray-800 text-white">
        <h2 className="text-lg font-bold">Conversations</h2>
        <button onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {loading ? (
          <p>Loading conversations...</p>
        ) : conversations.length > 0 ? (
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.conversation.ConversationId}
                className="mb-4 border-b pb-2"
              >
                <p className="font-semibold">Message: {conversation.firstMessage?.MessageBody}</p>
                <p>Platform: {conversation.conversation.platform}</p>
                <p>Created at: {new Date(conversation.conversation.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No conversations available.</p>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
