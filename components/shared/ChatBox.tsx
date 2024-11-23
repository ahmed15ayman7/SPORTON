"use client";

import { uploadToS3 } from "@/lib/aws";
import { createMessage } from "@/lib/actions/message.actions";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/shared/Loader";
import { UserData } from "@/lib/actions/user.actions";
import { pusherClient } from "@/lib/pusher";
import { GetChat } from "@/lib/actions/room.actions";
import { toast } from "react-toastify";

import CardToster from "../cards/CardToster";
import ReplySection from "../chatbox/ReplySection";
import MessageInput from "../chatbox/MessageInput";
import MessageItem from "../chatbox/MessageItem";
interface Message {
  _id: string;
  content?: string;
  mediaUrl?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  sender: {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    sport: string | undefined;
  };
  recipient: {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    sport: string | undefined;
  };
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
  reactions: Array<{
    emoji: string;
    userId: string;
  }>;
  replyTo?: string; //  يدعم الردود على الرسائل
}
const ChatBox: React.FC<{ Ids?: string, setRefetchData: (_: number) => void }> = ({ Ids, setRefetchData }) => {
  const [replyToMessageId, setReplyToMessageId] = useState<string | null>(null);
  const userId = Ids?.split("-")[0];
  const friendId = Ids?.split("-")[1];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserData | null | undefined>(null);
  const [chatJson, setChatJson] = useState<string>();
  const chat = chatJson && JSON.parse(chatJson);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const userInfoJson = sessionStorage.getItem("userInfo");
      const user = sessionStorage.getItem("id");
      const userInfo2 = userInfoJson ? JSON.parse(userInfoJson) : null;
      setUserInfo(userInfo2);
      if (!user) return router.replace("/sign-in");
      if (!userInfo2?.onboarding) return router.replace("/onboarding");
      if (friendId) {
        const chat = await GetChat({
          friendId,
          userId: userInfo2?._id,
          path,
        });
        chat && setChatJson(JSON.stringify(chat));
        if (chat && chat.chat && chat.chat.messages) {
          const messages = chat?.chat?.messages;
          setMessages((prevMessages) => {
            let FullMessages = prevMessages.length !== 0 &&
              (friendId === prevMessages[0].sender._id || friendId === prevMessages[0].recipient._id)
              ? [...prevMessages, ...messages]
              : [...messages];
            FullMessages.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return FullMessages;
          });
        }
      }
    };

    fetchData();
  }, [userId, friendId]);

  useEffect(() => {
    const subscribedChannel = pusherClient.subscribe("chat");
    if (chat?.chat?.name) {
      subscribedChannel.bind(chat.chat.name, (msg: Message) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        showNotification(msg);
      });
    }
    return () => {
      pusherClient.unsubscribe("chat");
    };
  }, [chat]);
  const handleReplyClick = (message: Message) => {
    setReplyToMessageId(message._id);
    setInputValue(`@${message.sender.name}: `);
  };
  const showNotification = (msg: Message) => {
    toast.info(<CardToster content={msg.content || ''} image={msg.sender.image!} name={msg.sender.name!} link={`https://sporton.website/messaging?ids=${userId + "-" + friendId}`} />);

    const notification = new Notification(`New message from ${msg.sender.name}`, {
      body: msg.content,
      icon: msg.sender.image,
    });
    notification.onclick = () => {
      window.location.href = `https://sporton.website/messaging?ids=${userId + "-" + friendId}`;
      window.focus();
    };
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const handleMessageSend = async () => {
    if (inputValue.trim() === "") return;
    if (!userInfo) return;

    try {
      if (friendId && userInfo && chat) {
        const messageType = replyToMessageId ? "text" : "text";
        const mediaUrl = null;

        await createMessage(
          userInfo._id,
          friendId,
          inputValue,
          mediaUrl,
          messageType,
          chat?.chat?.name,
          replyToMessageId!
        );

        setReplyToMessageId(null);
        setRefetchData(Math.random())
      }
    } catch (error) {
      console.error("Error sending message:", error);
      return;
    }

    setInputValue("");
    inputRef.current?.focus();
  };

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const audioChunks: BlobPart[] = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks);
      const audioFileName = `audio_${Date.now()}.wav`;

      try {
        await uploadToS3(audioBlob, audioFileName, `audio-${Ids}`);
        const audioUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/audio-${Ids}/${audioFileName}`; // رابط الملف المرفوع

        await createMessage(
          userInfo?._id!,
          friendId!,
          null,
          audioUrl,
          "audio",
          chat?.chat?.name,
          undefined
        );
        setRefetchData(Math.random())
      } catch (error) {
        console.error("Error uploading audio to S3:", error);
      }
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    console.log("Stopping recording...");
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  if (userInfo && chat) {
    const result = chat.chat.users.filter((user: { _id: string }) => user._id !== userId)[0];
    return (
      <div className="bottom-0 p-4 pb-10 relative rounded-lg w-full h-full flex flex-col">
        <div className="bg-dark-1 flex z-50 absolute top-0 left-0 right-0">
          <Link
            href={"/messenger"}
            className="flex items-center gap-2 hover:bg-dark-2 transition-colors rounded-md p-2">
            <Image
              src={result?.image!}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
              width={50}
              height={50}
            />
            <span className="font-semibold">{result?.name}</span>
          </Link>
        </div>
        <div className="overflow-y-auto h-full pb-20 mt-12 z-10">
          {messages.length > 0 ? (
            messages.map((message, index) => (message.content || message.mediaUrl) && <MessageItem totalMessages={messages.length} index={index} key={message._id} message={message} userId={userId!} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />)
          ) : (
            <></>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ReplySection replyToMessageId={replyToMessageId} messages={messages} setReplyToMessageId={setReplyToMessageId} />
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleMessageSend={handleMessageSend}
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>
    );
  }
  return <Loader is />;
}


export default ChatBox;


// "use client";
// import { createMessage } from "@/lib/actions/message.actions";
// import { PostData } from "@/lib/actions/post.actions";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Loader from "@/components/shared/Loader";
// import { UserData } from "@/lib/actions/user.actions";
// import { formatDistanceToNow, format } from "date-fns";
// import { pusherClient } from "@/lib/pusher";
// import { GetChat } from "@/lib/actions/room.actions";
// import { toast } from "react-toastify";
// import { FaEnvelope } from 'react-icons/fa';
// import CardToster from "../cards/CardToster";
// interface User {
//   _id: string;
//   id: string;
//   username: string;
//   name: string;
//   bio: string;
//   image: string;
//   sport: string;
//   phone: string;
//   posts: PostData[];
//   communities: string[];
//   onboarding: boolean;
//   type: string;
//   friends: Friend[];
// }

// interface Friend {
//   _id: string;
//   id: string;
//   name: string;
//   username: string;
//   image: string;
// }

// interface Message {
//   content: string;
//   sender: {
//     _id: string | undefined;
//     id: string | undefined;
//     name: string | undefined;
//     image: string | undefined;
//     sport: string | undefined;
//   };
//   timestamp: Date;
//   recipient: {
//     _id: string | undefined;
//     id: string | undefined;
//     name: string | undefined;
//     image: string | undefined;
//     sport: string | undefined;
//   };
// }

// const ChatBox: React.FC<{ Ids?: string }> = ({ Ids }) => {
//   let userId = Ids?.split("-")[0];
//   let frindId = Ids?.split("-")[1];
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   let path = usePathname();
//   const router = useRouter();
//   const [userInfo, setUserInfo] = useState<UserData | null | undefined>(null);
//   const [chatJSon, setChat] = useState<string>();
//   let chat = chatJSon && JSON.parse(chatJSon);
//   useEffect(() => {
//     const fetchData = async () => {
//       const userInfoJson = sessionStorage.getItem("userInfo");
//       const user = sessionStorage.getItem("id");
//       const userInfo2 = userInfoJson ? JSON.parse(userInfoJson) : null;
//       setUserInfo(userInfo2);
//       if (!user) return router.replace("/sign-in");
//       if (!userInfo2?.onboarding) router.replace("/onboarding");
//       if (frindId) {
//         const chat = await GetChat({
//           friendId: frindId,
//           userId: userInfo2?._id,
//           path: path,
//         });
//         chat && setChat(JSON.stringify(chat));
//         if (chat && chat.chat && chat.chat.messages) {
//           let messages = chat?.chat?.messages;
//           setMessages((prevMessages) => {
//             if (
//               prevMessages.length !== 0 &&
//               (frindId === prevMessages[0].sender._id ||
//                 frindId === prevMessages[0].recipient._id)
//             ) {
//               let FullMessages = [...prevMessages, ...messages];
//               FullMessages.sort((a: any, b: any) => {
//                 return (
//                   new Date(b.createdAt).getTime() -
//                   new Date(a.createdAt).getTime()
//                 );
//               });
//               return FullMessages;
//             } else {
//               let FullMessages = [...messages];
//               FullMessages.sort((a: any, b: any) => {
//                 return (
//                   new Date(b.createdAt).getTime() -
//                   new Date(a.createdAt).getTime()
//                 );
//               });
//               return FullMessages;
//             }
//           });
//         }
//       }
//     };

//     fetchData();
//   }, [userId, frindId]);

//   useEffect(() => {
//     const subscribedChannel = pusherClient.subscribe("chat");
//     chat &&
//       chat?.chat &&
//       chat?.chat?.name &&
//       subscribedChannel.bind(chat.chat.name, (msg: Message) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//         showNotification(msg);
//       });
//     return () => {
//       pusherClient.unsubscribe("chat");
//     };
//   }, [chat]);
//   const showNotification = (msg: Message) => {
//     toast.info(<CardToster content={msg.content} image={msg.sender.image!} name={msg.sender.name!} link={`https://sporton.website/messaging?ids=${userId+"-"+frindId}`} />)
//     // if (Notification.permission === "granted") {
//       const notification = new Notification(
//         `New message from ${msg.sender.name}`,
//         {
//           body: msg.content,
//           icon: msg.sender.image,
//         }
//       );
//       notification.onclick = () => {
//         window.location.href = `https://sporton.website/messaging?ids=${userId+"-"+frindId}`
//         window.focus();
//       };
//     // }
//   };
//   // useEffect(() => {
//   //   if (
//   //     Notification.permission !== "granted" &&
//   //     Notification.permission !== "denied"
//   //   ) {
//   //     Notification.requestPermission().then((permission) => {
//   //       if (permission === "granted") {
//   //         console.log("Notification permission granted.");
//   //       } else {
//   //         console.log("Notification permission denied.");
//   //       }
//   //     });
//   //   }
//   // }, []);
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleMessageSend = async () => {
//     console.log(inputValue, chat?.chat?.name);
//     if (inputValue.trim() === "") return;
//     if (!userInfo) return;
//     try {
//       if (frindId && userInfo && chat) {
//         await createMessage(
//           JSON.stringify(userInfo),
//           frindId,
//           inputValue,
//           chat?.chat?.name
//         );
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       return;
//     }
//     setInputValue("");
//     inputRef.current?.focus();
//   };
//   if (userInfo && chat) {
//     let result = chat.chat.users.filter(
//       (user: { _id: string }) => user._id !== userId
//     )[0];
//     return (
//       <div className=" bottom-0 p-4 pb-10 relative rounded-lg w-full h-full flex flex-col">
//         <div className=" bg-dark-1 flex z-50 absolute top-0 left-0 right-0">
//           <Link
//             href={"/messaging"}
//             className="px-2 py-2 bg-blue-500 text-white rounded-lg max-xl:block hidden">
//             <Image
//               src="/assets/Goback.svg"
//               alt="Goback"
//               height={20}
//               width={20}
//             />
//           </Link>
//           <div className="user-card_avatar max-xl:p-0 p-1">
//             <div className="relative   aspect-square h-[48px] w-[48px]  ">
//               <img
//                 src={result?.image}
//                 alt="post image"
//                 className="absolute inset-0 w-full h-full rounded-full object-cover"
//               />
//             </div>
//             {/* <Image src={result?.image} alt={result?.name} height={48} width={48} className=' cursor-pointer rounded-full object-contain'/> */}
//             <div className=" flex-1 text-ellipsis">
//               <h3 className=" text-base-semibold text-light-1">
//                 {result?.name}
//               </h3>
//               {/* <p className=" text-small-semibold text-gray-1">@{result?.username}</p> */}
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 pt-16 overflow-y-auto">
//           {messages.slice((messages.length/2)).map((message, index) => {
//             const timestamp = format(message.timestamp, "HH:mm");
//             const timestamp2 = formatDistanceToNow(message.timestamp);
//             return (
//               <div
//                 key={index}
//                 className={`mb-2 flex ${
//                   message.sender._id === userId ? "" : "flex-row-reverse"
//                 }`}>
//                 <div
//                   className={`flex relative w-fit min-w-[15rem] pb-3 pe-3 rounded-lg ${
//                     message.sender._id === userId
//                       ? "bg-[#FF971D] "
//                       : " bg-primary-500 text-[#ffffff] "
//                   }`}>
//                   <div className="">
//                     <div className="relative   aspect-square h-[40px] w-[40px]  mr-2 ">
//                       <img
//                         src={message.sender.image!}
//                         alt={message.sender.name!}
//                         className="absolute inset-0 w-full h-full rounded-full object-cover"
//                       />
//                     </div>
//                     {/* <Image
//                 src={message.sender.image!}
//                 alt={message.sender.name!}
//                 height={40}
//                 width={40}
//                 className="rounded-full mr-2"
//                 /> */}
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="font-semibold">{message.sender.name}</span>
//                     <p className="text-sm py-3">{message.content}</p>
//                     <span
//                       className={`text-xs absolute bottom-0 right-1  ${
//                         message.sender._id === userId
//                           ? "text-gray-500"
//                           : " text-gray-300"
//                       }`}>
//                       {timestamp}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} className="mb-16" />
//         </div>
//         <div className=" flex fixed bottom-2 lg:left-80 left-2 right-0">
//           <input
//             ref={inputRef}
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type your message..."
//             className="w-full px-2 border border-gray-300 rounded-lg mr-2"
//           />
//           <button
//             onClick={handleMessageSend}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//             <Image src="/assets/send.svg" alt="send" height={40} width={40} />
//           </button>
//         </div>
//       </div>
//     );
//   } else {
//     return <Loader is />;
//   }
// };

// export default ChatBox;




















//       <div className="bottom-0 p-4 pb-10 relative rounded-lg w-full h-full flex flex-col">
//         <div className="bg-dark-1 flex z-50 absolute top-0 left-0 right-0">
//           <Link
//             href={"/messaging"}
//             className="px-2 py-2 bg-blue-500 text-white rounded-lg max-xl:block hidden">
//             <Image
//               src="/assets/Goback.svg"
//               alt="Goback"
//               height={20}
//               width={20}
//             />
//           </Link>
//           <div className="user-card_avatar max-xl:p-0 p-1">
//             <div className="relative aspect-square h-[48px] w-[48px]">
//               <img
//                 src={result?.image}
//                 alt="User Image"
//                 className="absolute inset-0 w-full h-full rounded-full object-cover"
//               />
//             </div>
//             <div className="flex-1 text-ellipsis">
//               <h3 className="text-base-semibold text-light-1">
//                 {result?.name}
//               </h3>
//             </div>
//           </div>
//         </div>
//         {replyToMessageId && (
//         <div className="bg-gray-200 p-2 rounded mb-2">
//           <span>Replying to:</span>
//           <p>{messages.find(msg => msg._id === replyToMessageId)?.content}</p>
//           <button onClick={() => setReplyToMessageId(null)}>Cancel Reply</button>
//         </div>
//       )}
//         <div className="flex-1 pt-16 overflow-y-auto">
//         {messages.slice((messages.length / 2)).map((message, index) => {
//     const timestamp = format(message.timestamp, "HH:mm");
//     const timestamp2 = formatDistanceToNow(message.timestamp);
//     return (
//       <div
//         key={index}
//         className={`mb-2 flex ${
//           message.sender._id === userId ? "" : "flex-row-reverse"
//         }`}>
//         <div
//           className={`flex relative w-fit min-w-[15rem] pb-3 pe-3 rounded-lg ${
//             message.sender._id === userId
//               ? "bg-[#FF971D] "
//               : " bg-primary-500 text-[#ffffff] "
//           }`}>
//           <div className="">
//             <div className="relative aspect-square h-[40px] w-[40px]  mr-2 ">
//               <img
//                 src={message.sender.image!}
//                 alt={message.sender.name!}
//                 className="absolute inset-0 w-full h-full rounded-full object-cover"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <span className="font-semibold">{message.sender.name}</span>
//             {message.type === 'text' ? (
//               <p className="text-sm py-3">{message.content}</p>
//             ) : message.type === 'audio' ? (
//               <audio controls>
//                 <source src={message.mediaUrl} type="audio/wav" />
//                 Your browser does not support the audio tag.
//               </audio>
//             ) : message.type === 'image' ? (
//               <img src={message.mediaUrl} alt="message image" />
//             ) : message.type === 'video' ? (
//               <video controls>
//                 <source src={message.mediaUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             ) : null}
//             <span className={`text-xs absolute bottom-0 right-1 ${message.sender._id === userId ? "text-gray-500" : " text-gray-300"}`}>
//               {timestamp}
//             </span>
//           </div>
//         </div>
//       </div>
//     );
// })}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="flex items-center">
//           <input
//             ref={inputRef}
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message"
//             className="border border-gray-300 rounded-lg p-2 flex-grow mr-2"
//           />
//           <button
//             onClick={handleMessageSend}
//             className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center ml-2">
//             <FaPaperPlane />
//           </button>
//           <button
//             onClick={recording ? stopRecording : startRecording}
//             className={`bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center ml-2 ${recording ? "bg-red-500" : ""}`}>
//             <FaMicrophone />
//           </button>
//         </div>
//       </div>