import { useCallback, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { ContactsContext } from "../../context/selectedContacts";
import { useCurrentUser } from "../authentication/useCurrentUser";
import Loader from "../../ui/loader";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [pendingInvitation, setPendingInvitation] = useState([]);
  // const [friends, setFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [contacts,setContacts] = useState([])
  const { allMessages,setAllMessages,currentUser } = useContext(ContactsContext);  //friends, setFriends  contacts,setContacts,

  useEffect(() => {
    console.log("🔄 Starting Socket.IO connection attempt");

    const newSocket = io("http://localhost:8000", {  ///socket.io
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
      extraHeaders: {
        'Access-Control-Allow-Credentials': 'true'
      }
    });

    console.log("⏳ Socket instance created, waiting for connection...");

    newSocket.on("connect", () => {
      console.log("Successfully connected to socket.io server:", newSocket.id);
    });

    newSocket.on("friends-invitations", (data) => {
      setPendingInvitation(data.pendingInvitation);
    });

    // newSocket.on("friends-list", (data) => {
    //   setFriends(data.friends);
    //   // setFriends((prevFriends) => [...data.friends]);
    //   // if (Array.isArray(data.friends) && data.friends.length > 0) {
    //   //   setFriends(data.friends);
    //   // }
    //   console.log('friends list', data.friends);
    //   console.log('friends state',friends)
    // });

    // newSocket.on("friends-list", (data) => {
    //   console.log('data in the friends list:',data)
    //   setFriends((prevFriends) => {
    //     console.log("Previous Friends:", prevFriends);
    //     console.log("New Friends from Socket:", data.friends);
    //     return data.friends;
    //   });
    // });

    newSocket.on("friends-list", (data) => {
      // if (Array.isArray(data.Contacts)) {
      //   setContacts(data.Contacts);
      //   console.log('the friends list event triggered')
      //   console.log('Updated friends list:', data.Contacts);
      // }
      setContacts(data.Contacts)
      console.log('Updated friends list:', data.Contacts);
      console.log('My contacts :', contacts )
    });


    newSocket.on("online-users", (data) => {
      setOnlineUsers(data.onlineUsers);
    });


    // newSocket.on("direct-chat-history", (data) => {
    //   if (!data) {
    //     console.error("Received invalid data for direct chat history:", data);
    //     return;
    //   }

    //   const { participants, messages } = data;
    //   const receiverId = selectedFriend?.id;
    //   const userId = currentUser?._id;
    //   // console.log("data in direct chat history: ",data)

    //   if (receiverId && userId) {
    //     const usersInConversation = [receiverId, userId];

    //     const isSameConversation = participants.every((participantId) =>
    //       usersInConversation.includes(participantId)
    //     );

    //     if (isSameConversation) {
    //       // setAllMessages((prevMessages) => [...prevMessages, ...messages]);
    //       // setAllMessages(messages)
    //       setAllMessages(messages); // Replace instead of appending
    //       console.log("Data inside direct chat history: ", allMessages)
    //     }
    //   }
    // });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [currentUser,setContacts]);

  // console.log('friends list in useSocket:',friends)
  // console.log('allgroup in the useSocket:', allGroups)


  const sendDirectMessage = useCallback((data) => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }
    console.log('direct message: ', data)
    socket.emit("direct-message", data);
  }, [socket]);


  const sendDirectChatHistory = useCallback((data) => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }
    console.log('sending direct chat history data: ', data)
    socket.emit("direct-chat-history", data);
  }, [socket]);



  return {
    socket,
    pendingInvitation,
    onlineUsers,
    contacts,
    sendDirectMessage,
    sendDirectChatHistory,
  };
};
