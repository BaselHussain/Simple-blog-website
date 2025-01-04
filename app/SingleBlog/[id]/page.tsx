"use client";
import React, { useState, useEffect } from "react";
import { posts } from "@/lib/blogs";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface Comment {
  id: number;
  name: string;
  comment: string;
}

// Custom hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading from localStorage", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  return [storedValue, setValue] as const;
}

export default function Page({ params }: { params: { id: string } }) {
  const [comments, setComments] = useLocalStorage<Comment[]>("comments", []);
  const [newComment, setNewComment] = useState<{ name: string; comment: string }>({
    name: "",
    comment: "",
  });
  const [editingID, setEditingID] = useState<number | null>(null);

  // To ensure client-side hydration
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // Indicates the component is hydrated on the client
  }, []);

  const handleAddComment = () => {
    const newCommentWithId = { id: comments.length + 1, ...newComment };
    setComments((prevComments) => [...prevComments, newCommentWithId]);
    setNewComment({ name: "", comment: "" });
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment({ name: commentToEdit.name, comment: commentToEdit.comment });
    }
    setEditingID(id);
  };

  const handleUpdateComment = () => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editingID
          ? { id: comment.id, name: newComment.name, comment: newComment.comment }
          : comment
      )
    );
    setEditingID(null);
    setNewComment({ name: "", comment: "" });
  };

  const handleDeleteComment = (id: number) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    setNewComment({ name: "", comment: "" });
  };

  const blog = posts.find((post) => post.id === Number(params.id));

  if (!hydrated) return null; // Prevent rendering until hydration

  return (
    <>
      
      <div className="w-[80%] mx-auto flex flex-col items-center mt-16 gap-8">
        <h1 className="text-3xl font-bold text-center">{blog?.title}</h1>
        <p className="leading-loose font-semibold">{blog?.content}</p>

        <div className="flex p-3 flex-col items-center gap-4 w-[90%] md:w-[70%] mx-auto">
          <h1 className="text-2xl font-bold">Add Your Comment</h1>
          <Input
            className="w-full"
            value={newComment.name}
            placeholder="Enter Your Name"
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          />
          <Textarea
            value={newComment.comment}
            placeholder="Your Comment..."
            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
            rows={8}
            className="resize-none w-full"
          />
          {editingID === null ? (
            <Button onClick={handleAddComment}>Add Comment</Button>
          ) : (
            <Button onClick={handleUpdateComment}>Update Comment</Button>
          )}
          <ul className="w-full">
            {comments.map((comment) => (
              <li key={comment.id} className="w-full p-2 bg-gray-100 border rounded-lg mb-4">
                <h3 className="font-bold underline">{comment.name}</h3>
                <div className="flex justify-between items-center">
                  <p>{comment.comment}</p>
                  <div className="flex items-center justify-center gap-3">
                    <FaEdit
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleEditComment(comment.id)}
                    />
                    <FaTrash
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
