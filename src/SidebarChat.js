import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter a chatroom name");

    if (roomName) {
      // do database stuff
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div class="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div class="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
