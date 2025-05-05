import { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="w-full lg:w-1/4 bg-gray-100 p-4 h-full flex flex-col">
      <h2 className="font-bold mb-2">Chat</h2>
      <div className="flex-1 overflow-y-auto mb-2 border p-2">
        {messages.map((msg, idx) => (
          <p key={idx} className="text-sm mb-1">
            {msg}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message"
        />
        <button
          className="bg-blue-600 text-white px-3 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
