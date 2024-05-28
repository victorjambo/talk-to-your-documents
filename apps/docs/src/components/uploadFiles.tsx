"use client";
import React, { useRef, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useAppData } from "../hooks/appData";
import { uploadDocuments, uploadUpdateDocuments } from "../queries";

const UploadFiles: React.FC<{ isNewUpload: boolean }> = ({ isNewUpload }) => {
  const { chatId, setFiles, files, chatName } = useAppData();

  const formRef = useRef<any>();
  const [rawFiles, setRawFiles] = useState<FileList | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => {
      if (isNewUpload) {
        return uploadDocuments(data);
      }
      return uploadUpdateDocuments(data, chatId);
    },
    onError: (error, variables, context) => {
      console.log("🚀 ~ Error while querying:", { error, variables, context });
    },
    onSuccess: () => {
      const fileNames =
        rawFiles !== null
          ? ([...Array(rawFiles.length).keys()].map(
              (idx) => rawFiles.item(idx)?.name
            ) as string[])
          : [];
      // setFiles([...files, ...fileNames]);
      // TODO
    },
    onSettled: () => {
      formRef.current?.reset();
      setRawFiles(null);
    },
  });

  const handleSubmit = (data: FormData) => {
    if (isNewUpload) {
      data.append("chatName", chatName);
      data.append("chatId", chatId);
    }
    mutate(data);
  };

  return (
    <form action={handleSubmit} ref={formRef}>
      <label className="border rounded-lg border-dashed border-gray-300 hover:border-gray-400 p-4 cursor-pointer flex flex-col items-center space-x-2 justify-center">
        <ArrowUpTrayIcon className="w-6 h-6" />
        {isNewUpload ? (
          <span>Upload files</span>
        ) : (
          <span>Upload more files</span>
        )}
        <input
          type="file"
          id="documents"
          name="documents"
          accept="application/pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          className="hidden"
          onChange={(e) => setRawFiles(e.target.files)}
        />
      </label>

      {rawFiles !== null && (
        <>
          <div className="text-xs font-mono text-gray-400 mt-4">Files</div>
          <ul className="list-disc mt-2">
            {[...Array(rawFiles.length).keys()].map((idx) => (
              <li
                key={idx}
                className="text-ellipsis overflow-hidden flex flex-row space-x-1"
              >
                <span>•</span>
                <span>{rawFiles.item(idx)?.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {rawFiles !== null && (
        <button
          type="submit"
          className="w-full text-center mt-4 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Upload
        </button>
      )}
    </form>
  );
};

export default UploadFiles;
