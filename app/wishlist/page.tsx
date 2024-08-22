"use client"
import React, { useEffect, useState } from 'react';
import WishlistUI from "@/components/WishlistUI";
import { config } from "@/constants";
const API_ENDPOINT = config.url;

interface WishlistProduct {
  product_name: string;
  product_id: string;
  recommendation_reason: string;
}

export default function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Fetch conversationId from sessionStorage with retry mechanism
  const fetchConversationId = async () => {
    let id = sessionStorage.getItem("conversationId");

    if (!id) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      id = sessionStorage.getItem("conversationId");

      if (!id) {
        console.error("Conversation ID not found in local storage after timeout.");
        return null;
      }
    }

    return conversationId;
  };

  // Fetch wishlist products from the API
  const fetchWishlistProducts = async (id: string) => {
    try {
      const response = await fetch(`https://${API_ENDPOINT}/api/wishlist/${id}`);
      const data = await response.json();
      setWishlistProducts(data.products); // Assuming the response contains a "products" field
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const id = await fetchConversationId();
      if (id) {
        setConversationId(id);
        await fetchWishlistProducts(id);
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
        body: JSON.stringify({ product_id: productId }),
      });
      // Refresh wishlist after adding
      fetchWishlistProducts(conversationId);
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
        body: JSON.stringify({ product_id: productId }),
      });
      // Refresh wishlist after deletion
      fetchWishlistProducts(conversationId);
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
    }
  };

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  return (
    <WishlistUI
      wishlistProducts={wishlistProducts}
      onDelete={handleDeleteFromWishlist}
      onAdd={handleAddToWishlist}
    />
  );
}
