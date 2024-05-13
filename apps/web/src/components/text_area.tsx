import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

const TextArea: React.FC = () => {
  return (
    <section className="flex border-t">
      <div className="flex m-6 rounded-lg border-2 border-slate-400 overflow-hidden w-full">
        <input
          type="text"
          className="w-full px-4 outline-none"
          placeholder="Talk to your document..."
        />
        <button className="text-slate-400 p-3  border-l-2 border-slate-400">
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default TextArea;
