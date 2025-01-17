"use client";
import React,{useEffect,useState} from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
interface Comment {
    id: number;
    name: string;
    comment: string;
  }

  interface PageClientProps {
    
      title: string;
      content: any;
    
  }
  
  function useLocalStorage<T>(key: string) {
    const [storedValue, setStoredValue] = useState<T | null>(null);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        try {
          const item = window.localStorage.getItem(key);
          if (item) {
            setStoredValue(JSON.parse(item));
          }
        } catch (error) {
          console.error("Error reading from localStorage", error);
        }
      }
    }, [key]);
  
    const setValue = (value: T | ((val: T | null) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
  
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    };
  
    return [storedValue, setValue] as const;
  }

export default function PageClient({ post }:{post:PageClientProps}) {
    const [commentsData, setCommentsData] = useLocalStorage<Record<string, Comment[]>>("comments");
     const [comments, setComments] = useState<Comment[]>([]);
     const [newComment, setNewComment] = useState<{ name: string; comment: string }>({
       name: "",
       comment: "",
     });
     const [editingID, setEditingID] = useState<number | null>(null);
     const blogSlug = post.title

 // Load comments for the specific blog
 useEffect(() => {
    if (commentsData && commentsData[blogSlug]) {
      setComments(commentsData[blogSlug]);
    }
  }, [commentsData, blogSlug]);

  const saveCommentsToLocalStorage = (updatedComments: Comment[]) => {
    setComments(updatedComments);
    setCommentsData((prevData) => ({
      ...prevData,
      [blogSlug]: updatedComments,
    }));
  };

  const handleAddComment = () => {
    const newCommentWithId = { id: comments.length + 1, ...newComment };
    const updatedComments = [...comments, newCommentWithId];
    saveCommentsToLocalStorage(updatedComments);
    setNewComment({ name: "", comment: "" });
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment({ name: commentToEdit.name, comment: commentToEdit.comment });
      setEditingID(id);
    }
  };

  const handleUpdateComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editingID
        ? { ...comment, name: newComment.name, comment: newComment.comment }
        : comment
    );
    saveCommentsToLocalStorage(updatedComments);
    setEditingID(null);
    setNewComment({ name: "", comment: "" });
  };

  const handleDeleteComment = (id: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    saveCommentsToLocalStorage(updatedComments);
    setNewComment({ name: "", comment: "" });
  };



  return (
    <>
      
      <div className="w-[80%] mx-auto flex flex-col items-center mt-16 gap-8">
        <h1 className="text-3xl font-bold text-center">{post.title}</h1>
        <section className="text-lg 
          prose-li:list-disc  prose-2xl 
        ">
            
          <PortableText value={post.content}/>
        </section>

        <div className="flex p-3 flex-col items-center gap-4 w-[70%] mx-auto">
          <h1 className="text-2xl font-bold">Add Your Comments</h1>
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
              <li
                key={comment.id}
                className="w-full p-2 bg-gray-100 border rounded-lg mb-4"
              >
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
  )
}
