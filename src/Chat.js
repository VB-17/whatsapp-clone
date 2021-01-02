import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import "./Chat.css";
import firebase from "firebase";
import { useStateValue } from "./Stateprovider";

import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@material-ui/icons";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("Rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("Rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName, //name from google auth
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //sets the server time
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div class="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div class="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
          </p>
        </div>

        <div class="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div class="chat__body">
        {messages.map((message) => (
          <p
            class={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span class="chat__name">{message.name}</span>
            {message.message}
            <span class="chat__timeStamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div class="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a Message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
