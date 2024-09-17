import React, { useState } from "react";
import Rating from "./shared/FeedbackRating";

interface FeedbackPopupProps {
  setShowFeedbackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ setShowFeedbackPopup }) => {
  const [rating, setRating] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [optionalConversationId, setOptionalConversationId] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // Optional email field
  const [mobileNumber, setMobileNumber] = useState<string>(""); // Optional phone number field
  const jwtToken = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      alert("Rating is required");
      return;
    }

    try {
      const response = await fetch("https://qa.govoyr.com/api/report/feedback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedbackMessage: feedbackMessage || "", // Ensure it's a string
          rating: rating.toString(), // Ensure rating is sent as a string
          conversationId: optionalConversationId ? optionalConversationId.toString() : "", // Optional field
          email: email.toString() || "", // Optional field
          mobileNumber: mobileNumber.toString || "", // Optional field
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message.join(", ") || "Failed to submit feedback");
      }

      alert("Feedback submitted successfully");
      setShowFeedbackPopup(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Error submitting feedback:", errorMessage);
      alert(`Failed to submit feedback: ${errorMessage}`);
    }
  };

  const handleRatingChange = (newRating: string) => {
    setRating(newRating);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#202222] text-white p-6 rounded-lg border-[5px] border-[#2e2f2f] shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 border-b border-[#2e2f2f] pb-2">Submit Feedback</h2>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#2e2f2f] bg-[#2e2e2e] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border border-[#2e2f2f] bg-[#2e2e2e] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Rating Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Rating (Required)</label>
          <Rating productRating={parseFloat(rating)} onRatingChange={handleRatingChange} />
        </div>

        {/* Feedback Message Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Feedback Message</label>
          <textarea
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
            className="border border-[#2e2f2f] bg-[#2e2e2e] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Write your feedback here..."
          />
        </div>

        {/* Optional Conversation ID Field 
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Conversation ID (Optional)</label>
          <input
            type="text"
            value={optionalConversationId}
            onChange={(e) => setOptionalConversationId(e.target.value)}
            className="border border-[#2e2f2f] bg-[#2e2e2e] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter Conversation ID"
          />
        </div> */}



        <div className="flex justify-between items-center mt-6">
        <button
            type="button"
            onClick={() => setShowFeedbackPopup(false)}
            className="bg-gray-600 text-white py-2 px-4 rounded border border-gray-700 hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded border border-blue-700 hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
