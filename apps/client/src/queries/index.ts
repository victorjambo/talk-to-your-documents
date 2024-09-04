import axios from "axios";
import { IChats, IConversation, IFilesMeta, INavbarChats } from "../types";

// TODO env variable
const BASE_URL = "http://localhost:4000/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const fetchConversations = async (
  chatId: string
): Promise<{ conversations: IConversation[] }> => {
  const response = await instance.get(`/conversations/${chatId}`);
  return response.data;
};

export const fetchChats = async (): Promise<INavbarChats[]> => {
  const response = await instance.get("/chats");
  if (response.data.chats) {
    return response.data.chats.map((chat: IChats) => ({
      ...chat,
      href: `/conversations/${chat.id}`,
      initial: chat.title.slice(0, 1).toUpperCase(),
      current: false,
    }));
  }
  return response.data;
};

export const fetchChat = async (chatId: string): Promise<{ chat: IChats }> => {
  const response = await instance.get(`/chats/${chatId}`);
  return response.data;
};

export const createChat = async (chat: {
  chatName: string;
}): Promise<{ chat: IChats }> => {
  console.log(chat);

  const response = await instance.post("/chats", chat);
  return response.data;
};

export const createConversations = async (conversations: {
  query: string;
  chatId: string;
}): Promise<{
  message: string;
}> => {
  const response = await instance.post("/conversations", conversations);
  return response.data;
};

export const uploadUpdateDocuments = async (
  data: FormData,
  chatId: string
): Promise<{
  chatId: string;
}> => {
  const response = await instance.put(`/documents/${chatId}`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadDocuments = async (
  data: FormData
): Promise<{
  chatId: string;
}> => {
  const response = await instance.post("/documents", data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateChat = async (
  chatId: string,
  chat: { chatName?: string; filesMeta?: IFilesMeta[] }
): Promise<IChats | null> => {
  if (!chatId) return null;

  const response = await instance.put(`/chats/${chatId}`, chat);
  return response.data;
};

export const deleteChat = async (chatId: string): Promise<IChats> => {
  const response = await instance.delete(`/chats/${chatId}`);
  return response.data;
};

export const deleteFileFromChat = async (
  chatId: string,
  hash: string
): Promise<{ chat: IChats; count: number }> => {
  const response = await instance.delete(`/chats/${chatId}/files/${hash.toString()}`);
  return response.data;
};
