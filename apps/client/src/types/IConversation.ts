export interface IConversation {
  id: number;
  message: string;
  session_id: string;
  createdAt: Date;
  sender: string;
}
