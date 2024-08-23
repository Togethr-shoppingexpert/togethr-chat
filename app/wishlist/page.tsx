"use client";
import React, { useEffect, useState } from "react";
import WishlistUI from "@/components/WishlistUI";
import { config } from "@/constants";
const API_ENDPOINT = config.url;

interface ProductReview {
  productId: string;
  review: string;
}

export default function Wishlist() {
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const [productId, setProductId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Fetch conversationId from sessionStorage with retry mechanism
  const fetchConversationId = async (): Promise<string | null> => {
    let id = sessionStorage.getItem("conversationId");

    if (!id) {
      console.log("Conversation ID not found initially, retrying...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      id = sessionStorage.getItem("conversationId");

      if (!id) {
        console.error("Conversation ID not found in sessionStorage after timeout.");
        return null;
      }
    }

    console.log("Retrieved Conversation ID:", id);
    return id;
  };

  // Fetch product reviews from the API
  const fetchProductReviews = async (id: string) => {
    console.log("Fetching product reviews with Conversation ID:", id);

    try {
      const response = await fetch(`https://${API_ENDPOINT}/api/wishlist/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching product reviews: ${response.status}`);
      }
      const data = await response.json();
      console.log("Product reviews fetched successfully:", data);
      setProductReviews(data.productReviews); // Assuming the response contains a "productReviews" field
      setLoading(false);
      setProductId(data.productIds);
      console.log('fetched product ids', data.productIds);
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      setLoading(false);
    }
  };

  // Initialize conversation ID and fetch product reviews
  useEffect(() => {
    const initialize = async () => {
      const id = await fetchConversationId();
      if (id) {
        setConversationId(id);
        await fetchProductReviews(id);
      } else {
        setLoading(false); // Stop loading if no conversation ID is found
      }
    };

    initialize();
  }, []);

  // Handle adding a product to the wishlist
  const handleAddToWishlist = async (productId: string) => {
    if (!conversationId) return;

    try {
      await fetch(`https://${API_ENDPOINT}/api/wishlist/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      // Refresh wishlist after adding
      fetchProductReviews(conversationId);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  // Handle deleting a product from the wishlist
  const handleDeleteFromWishlist = async (productId: string) => {
    if (!conversationId) return;

    try {
      await fetch(`https://${API_ENDPOINT}/api/wishlist/${conversationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      // Refresh wishlist after deletion
      fetchProductReviews(conversationId);
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
    }
  };

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  return (
   
    <WishlistUI
      productReviews={productReviews}
      productIds={productId}
      onDelete={handleDeleteFromWishlist}
     // onAdd={handleAddToWishlist}
    />
  );
}
