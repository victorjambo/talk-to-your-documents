import { conversations } from ".prisma";
import { JsonObject } from "@prisma/client/runtime/library";

export const extendConversations = {
  result: {
    conversations: {
      sender: {
        needs: { message: true },
        compute(conversations: conversations) {
          return (conversations.message as JsonObject).type as string;
        },
      },
      message: {
        needs: { message: true },
        compute(conversations: conversations) {
          return (conversations.message as JsonObject).content as string;
        },
      },
    },
  },
};
