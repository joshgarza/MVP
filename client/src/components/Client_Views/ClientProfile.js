import React from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";

const ClientProfile = () => {
  const photoStyle = "border";

  return (
    <div className="flex flex-col items-center justify-start h-[92%] mt-4 mx-2">
      <div className="absolute top-0 right-0 m-2 p-2 text-3xl">
        <FiSettings />
      </div>
      <div className="flex flex-col items-center justify-center border-b-2 rounded-2xl p-4 m-2 w-full">
        <div className="flex items-center justify-center">
          <div className="text-6xl rounded-full bg-slate-400 p-5">
            <AiOutlineCamera />
          </div>
        </div>
        <div className="font-semibold mt-2">Josh Garza</div>
      </div>
      <div className="flex flex-col items-center justify-center border-b-2 rounded-2xl p-4 m-2 w-full">
        <div className="font-semibold">Coach Josh Garza</div>
        <div className="font-light">josh@sf-iron.com</div>
      </div>
      <div className="w-full flex flex-col items-center justify-center h-[55%]">
        <div className="m-2">Progress Photos</div>
        <div className="w-full grid grid-cols-2 content-stretch gap-2 h-96 overflow-auto m-2">
          <div className={photoStyle}>Photo 1</div>
          <div className={photoStyle}>Photo 2</div>
          <div className={photoStyle}>Photo 3</div>
          <div className={photoStyle}>Photo 4</div>
          <div className={photoStyle}>Photo 5</div>
          <div className={photoStyle}>Photo 6</div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
