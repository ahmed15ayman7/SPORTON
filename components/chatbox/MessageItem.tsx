import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CardMedia, Box } from '@mui/material';
import { IconShare, IconCopy, IconMessageCircle, IconMoodHappy } from '@tabler/icons-react';
import useLongPress from '@/hooks/useLongPress'; // import the custom hook
import Image from 'next/image';

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
  replyTo?: string;
}

const MessageItem: React.FC<{
  message: Message;
  totalMessages: number;
  userId: string;
  openMenuId: string | null;
  index: number;
  setOpenMenuId: (id: string | null) => void;
}> = ({ message, totalMessages, index, userId, openMenuId, setOpenMenuId }) => {

  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const timestamp = format(message.timestamp, 'HH:mm');
  const handleContextMenu = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const { innerWidth } = window;
    const menuWidth = 150;


    const left = message.sender._id !== userId ? 140 : -40;

    const adjustedLeft = left + menuWidth > innerWidth ? innerWidth - menuWidth - 20 : left;

    setMenuPosition({ top: 0, left: adjustedLeft });

    if (openMenuId === message._id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(message._id);
    }
  };
  // Long press hook
  const handleLongPress = () => {
    handleContextMenu()
  };

  const onClick = () => {
    console.log('click is triggered')
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(handleLongPress, onClick, defaultOptions);



  const handleMenuOptionClick = (option: string) => {
    console.log(`${option} clicked`);
    setOpenMenuId(null);
  };

  return (
    <div
      className={`mb-2 flex relative ${message.sender._id !== userId ? '' : 'flex-row-reverse'}`}
      onContextMenu={handleContextMenu}
      {...longPressEvent}
    >
      <div className={`relative aspect-square max-sm:h-[20px] max-sm:w-[20px] h-[30px] w-[30px]  ${message.sender._id !== userId ? "mr-2" : "ml-2"}`}>
        <img
          src={message.sender.image!}
          alt={message.sender.name!}
          className="absolute inset-0 w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="">
        <div className={`flex relative  w-fit  ${message.mediaUrl ? "min-w-[20rem] max-sm:min-w-[13rem]" : "min-w-[15rem] max-sm:min-w-[10rem] "} p-3 pt-0 rounded-lg  ${message.sender._id !== userId ? 'bg-[#FF971D] shape rounded-tl-none' : 'bg-primary-500 shape-2 text-[#ffffff] rounded-tr-none'}`}>
          <div className="flex flex-col relative w-full">
            <div className="flex w-full justify-between">
              <span className="font-semibold max-sm:text-[14px]">{message.sender.name}</span>
              <div className=" cursor-pointer "
                onClick={handleContextMenu}>
                <Image
                  src={`/assets/points-virtical-white.svg`}
                  alt={"points"}
                  height={4}
                  width={4}
                />
              </div>
            </div>
            <div className={`flex flex-col relative w-full ${message.mediaUrl ? " p-5 pt-0" : " p-3 pt-0"}`}>
              {message.replyTo && (
                <div className="text-xs text-gray-300 mb-1">
                  Replying to: {message.replyTo}
                </div>
              )}
              {(message.type === 'text' || message.content) && (
                <p className="text-sm py-3">{message.content}</p>
              )}
              {message.type === 'audio' ? (
                <Box className="flex items-center w-full bg-transparent pb-6">
                  <CardMedia
                    component="audio"
                    controls
                    src={message.mediaUrl}
                    className="w-full bg-transparent border-0"
                  />
                </Box>
              ) : message.type === 'image' ? (
                <CardMedia
                  component="img"
                  image={message.mediaUrl}
                  alt="message image"
                  className="rounded-lg"
                />
              ) : message.type === 'video' ? (
                <CardMedia
                  component="video"
                  controls
                  src={message.mediaUrl}
                  className="rounded-lg"
                />
              ) : null}
              {message.reactions?.length > 0 && (
                <div className="flex mt-1">
                  {message.reactions.map((reaction, index) => (
                    <span key={index} className="text-sm mr-1">
                      {reaction.emoji}
                    </span>
                  ))}
                </div>
              )}

              <div className={`text-xs absolute bottom-0 right-1 flex items-center space-x-1 ${message.sender._id !== userId ? 'text-gray-500' : 'text-gray-300'}`}>
                <span className={`text-xs ${message.isDelivered ? 'text-gray-300' : 'hidden'}`}>✓</span>
                <span className={`text-xs ${message.isRead ? 'text-gray-300' : 'hidden'}`}>✓✓</span>
                <span className={"max-sm:text-[14px]"}>{timestamp}</span>
              </div>
            </div>
          </div>

          {openMenuId === message._id && menuPosition && (
            <div
              className="absolute bg-[#ffffff] text-gray-900 shadow-lg rounded-lg p-2 flex flex-col z-[10000]"
              style={{ top: index === totalMessages - 1 && totalMessages > 5 ? "50%" : `230%`, left: `${menuPosition.left}%`, transform: 'translate(-50%, -100%)' }}
            >
              <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('Reply')}>
                <IconMessageCircle size={16} className="mr-2" />
                Reply
              </button>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('React')}>
                <IconMoodHappy size={16} className="mr-2" />
                React
              </button>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('Copy')}>
                <IconCopy size={16} className="mr-2" />
                Copy
              </button>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded" onClick={() => handleMenuOptionClick('Share')}>
                <IconShare size={16} className="mr-2" />
                Share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
