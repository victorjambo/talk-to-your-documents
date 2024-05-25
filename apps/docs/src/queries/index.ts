import axios from "axios";
import { IChats, IConversation, INavbarChats } from "../types";

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