import React from "react";

function OnlineCard() {
  return (
    <div className="flex flex-row justify-start items-center p-1 text-white mt-1 border-gray-500">
      <div class="avatar online mx-4">
        <div class="w-10 h-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=28212" />
        </div>
      </div>
      <div>
        Sanskar Jain
      </div>
    </div>
  );
}

export default OnlineCard;
