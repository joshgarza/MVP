import React from "react";
import {
  AiOutlineFileGif,
  AiOutlineCamera,
  AiOutlineSend,
} from "react-icons/ai";
import { BsMic } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";

const ClientChat = () => {
  const messageIconStyle = "text-2xl text-blue-400";

  return (
    <div className="block h-[88%]">
      <div className="flex items-center justify-center font-medium bg-gray-200/80 p-2">
        Coach Josh Garza
      </div>
      <div className="flex flex-col items-center justify-center h-[84%]">
        <div className="text-6xl text-white bg-gray-400/40 rounded-full p-5">
          <TiMessages />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-lg">Hey Josh</span>
          <p className="font-light text-gray-500">Welcome to Coaching App.</p>
          <p className="font-light text-gray-500">
            Let's say hi to your coach!
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-end w-[90%] border rounded-full p-2 m-2">
          <input placeholder="Message..." className="w-[90%]"></input>
          <div>
            <AiOutlineFileGif className={messageIconStyle} />
          </div>
          <div>
            <BsMic className={messageIconStyle} />
          </div>
          <div>
            <AiOutlineCamera className={messageIconStyle} />
          </div>
        </div>
        <div className="text-2xl bg-blue-400 text-white rounded-full p-2 m-2">
          <AiOutlineSend />
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
