import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";

import Divider from "./divider";
import { useAppData } from "../hooks/appData";
import UploadFiles from "./uploadFiles";

const Files: React.FC = () => {
  const { files } = useAppData();

  return (
    <div className="">
      <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
        <div className="flex-auto pl-6 pt-6">
          <span className="mt-1 text-base font-semibold leading-6 text-gray-900">
            Files
          </span>
        </div>
        <Divider classNames="pt-6" />
        <ul role="list" className="divide-y divide-gray-100">
          {files.map((file: string) => (
            <li
              key={file}
              className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
            >
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">{file}</span>
                  <span className="flex-shrink-0 text-gray-400 hidden">
                    2.4mb
                  </span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  disabled
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Preview
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Divider classNames={Boolean(!!files.length) ? "" : "hidden"} />
        <div className="px-6 py-6">
          <UploadFiles isNewUpload={Boolean(!files.length)} />
        </div>
      </div>
    </div>
  );
};

export default Files;
