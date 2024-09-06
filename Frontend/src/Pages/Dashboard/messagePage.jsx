import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    (async () => {
      const messagesResponse = await axios.get(
        "http://localhost:3000/api/contacts/get"
      );
      setMessages(
        messagesResponse.data.map(message => ({
          id: message._id,
          from: message.email,
          subject: message.subject,
          content: message.message,
          timestamp: message.createdAt,
        }))
      );
    })();
  }, []);

  const handleReply = () => {
    setIsReplyOpen(true);
  };

  const handleCloseReply = () => {
    setIsReplyOpen(false);
    setReplyContent("");
  };

  const handleSendReply = async () => {
    if (!replyContent.trim()) return;

    try {
      // Implement your API call to send the reply here
      console.log(`Reply sent to message ${selectedMessage.id}`);
      handleCloseReply();
      await axios.post("http://localhost:3000/api/users/send-message", {
        email: selectedMessage.from,
        message: replyContent,
      });

      // Update the UI or perform any necessary actions after sending
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleDelete = id => {
    setMessages(messages.filter(message => message.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const formatDate = dateString => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <div className="flex space-x-4">
        <div className="w-1/3 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-100 border-b">
            <h2 className="font-semibold">Inbox</h2>
          </div>
          <ul>
            {messages.map(message => (
              <li
                key={message.id}
                className={`border-b last:border-b-0 cursor-pointer ${
                  selectedMessage && selectedMessage.id === message.id
                    ? "bg-blue-100"
                    : ""
                } ${!message.read ? "font-semibold" : ""}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="p-3 hover:bg-gray-100">
                  <p className="text-sm font-medium">{message.from}</p>
                  <p className="text-sm truncate">{message.subject}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 bg-white rounded-lg shadow">
          {selectedMessage ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedMessage.subject}
                </h2>
                <div className="space-x-2">
                  <Button
                    onClick={() => handleDelete(selectedMessage.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                From: {selectedMessage.from}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Received: {formatDate(selectedMessage.timestamp)}
              </p>
              <div className="border-t pt-4">
                <p className="mb-4">{selectedMessage.content}</p>
                <Button onClick={handleReply}>Reply</Button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Select a message to view its contents
            </div>
          )}
        </div>
      </div>

      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Compose your reply to {selectedMessage?.from}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            placeholder="Type your reply here..."
            rows={5}
          />
          <DialogFooter>
            <Button onClick={handleCloseReply} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSendReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesPage;
