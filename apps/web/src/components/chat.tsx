import React from "react";
import moment from "moment";

import Jazzicon from "./avatar";

interface Props {
  chat: {
    id: string;
    message: string;
    username: string;
    createdAt: string;
  };
}

const Chat: React.FC<Props> = ({ chat }) => {
  return (
    <div className="flex items-center p-4 hover:bg-slate-100">
      <div className="mr-3">
        <Jazzicon size={35} username={chat.username} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold text-md mr-2 font-sans">
            @{chat.username}
          </span>
          <span className="text-slate-400 text-sm font-light">
            {moment(Number(chat.createdAt)).fromNow()}
          </span>
        </div>
        <p className="font-light text-md text-grey-darkest pt-1">
          <span
            dangerouslySetInnerHTML={{
              __html: chat.message.replace(
                /@(\w+)/,
                '<span style="color: #4f87f6">@$1</span>'
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default Chat;
