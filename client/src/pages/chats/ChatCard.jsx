import React from "react";

function ChatCard({ userData, handleAccessChat }) {
  const data = (userInfo) => {
    let TYPED_ARRAY = new Uint8Array(userInfo.picture.data.data);
    const blob = new Blob([TYPED_ARRAY], { type: "image/jpeg" });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
  };

  return (
    <div
      className="flex flex-row justify-start items-center bg-slate-400 rounded-md p-1 text-white mt-1 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        handleAccessChat(userData._id);
      }}
    >
      <div class="avatar">
        <div class="w-10 h-10 rounded-full mx-4">
          <img src={data(userData.info)} />
        </div>
      </div>
      <div>
        {`${userData.firstName}`.slice(0, 1).toUpperCase() +
          `${userData.firstName}`.slice(1)}
        {/* <p className="text-xs text-gray-600"> latest message</p> */}
      </div>
    </div>
  );
}

export default ChatCard;
