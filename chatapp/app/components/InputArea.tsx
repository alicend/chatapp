"use client";

import React, { useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import OpenAI from "openai";

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputArea: React.FC<Props> = ({ setIsLoading }) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const { selectedRoom } = useAppContext();
  const [inputMessage, setInputMessage] = useState<string>("");

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      text: inputMessage,
      sender: "user",
      createdAt: serverTimestamp(),
    };

    //メッセージをFirestoreに保存
    const roomDocRef = doc(db, "rooms", selectedRoom!);
    const messageCollectionRef = collection(roomDocRef, "messages");
    await addDoc(messageCollectionRef, messageData);

    setInputMessage("");
    setIsLoading(true);

    //OpenAIからの返信
    const gpt3Response = await openai.chat.completions.create({
      messages: [{ role: "user", content: inputMessage }],
      model: "gpt-3.5-turbo",
    });

    setIsLoading(false);

    const botResponse = gpt3Response.choices[0].message.content;
    await addDoc(messageCollectionRef, {
      text: botResponse,
      sender: "bot",
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="flex-shrink-0 relative">
      <input
        type="text"
        placeholder="Send a Message"
        className="border-2 rounded w-full pr-10 focus:outline-none p-2"
        onChange={(e) => setInputMessage(e.target.value)}
        value={inputMessage}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button
        className="absolute inset-y-0 right-4 flex items-center"
        onClick={() => sendMessage()}
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default InputArea;
