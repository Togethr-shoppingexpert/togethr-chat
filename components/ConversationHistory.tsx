import React, { useEffect,useState } from "react";
import { FaTrash } from "react-icons/fa";
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
    // Filter out conversations where `firstMessage` is null
    const filteredConversations = data.filter(conversation => conversation.firstMessage !== null);

    setConversations(filteredConversations);
      console.log("history button history", filteredConversations)
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConversationClick = (conversation: Conversation) => {
    const userId = localStorage.getItem("UserID"); // Retrieve the UserId from localStorage
    const conversationId = conversation.conversation.ConversationId;
    const firstMessage = conversation.firstMessage.MessageBody.replace(/\s+/g, "%20"); // Encode spaces as %20 for the URL

    // Construct the URL
    const url = `http://${API_ENDPOINT}/search/${userId}/${firstMessage}?convid=${conversationId}`;

    // Navigate to the URL
    window.location.href = url;
  }

  return (
    <div
      className={`fixed lg:bottom-0 bottom-[65px] left-0 h-[87%] w-[100%] lg:w-64 bg-[#202222]  transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <div className="p-4 overflow-y-auto  text-white border-white border bg-[#2e2f2f] ">
        {loading ? (
          <p>Loading conversations...</p>
        ) : conversations.length > 0 ? (
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.conversation.ConversationId}
                onClick={() => handleConversationClick(conversation)}
                className="mb-4 border-b pb-2 cursor-pointer"
              >
                <p className="font-semibold">{conversation.firstMessage?.MessageBody}</p>
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
