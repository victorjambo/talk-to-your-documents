import React from "react";
import { PaperClipIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

import Divider from "./divider";

const Files: React.FC = () => {
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
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <PaperClipIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">
                  resume_back_end_developer.pdf
                </span>
                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Preview
              </a>
            </div>
          </li>
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <PaperClipIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">
                  cover_letter_back_end_developer.pdf
                </span>
                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Preview
              </a>
            </div>
          </li>
        </ul>

        <Divider />
        <div className="px-6 py-6">
          <button className="flex items-center space-x-2 text-sm font-semibold leading-6 text-gray-900">
            <span>Upload more files</span>
            <ArrowUpTrayIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Files;
