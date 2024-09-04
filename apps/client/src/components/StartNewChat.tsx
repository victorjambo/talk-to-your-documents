import { useMutation } from "@tanstack/react-query";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createChat } from "../queries";
import { useAppData } from "../hooks/appData";

interface IProps {
  openNewChat: boolean;
  setOpenNewChat: Dispatch<SetStateAction<boolean>>;
}

const StartNewChat: FC<IProps> = ({ openNewChat, setOpenNewChat }) => {
  const { setChatId, refetchChats, setChatName } = useAppData();

  const [newChatName, setNewChatName] = useState<string>("");

  const chatRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick, false);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick, false);
  }, []);

  const handleOutsideClick = (e: Event) => {
    if (
      chatRef.current &&
      e.target &&
      !chatRef.current?.contains(e.target as Node)
    ) {
      setOpenNewChat(false);
      createNewChat();
    }
  };

  const { mutate: createNewChat } = useMutation({
    mutationKey: ["createChat"],
    mutationFn: () => {
      console.log("newChatName")
      return createChat({
        chatName: newChatName || "Untitled",
      });
    },
    onError: (error, variables, context) => {
      console.log("🚀 ~ Error while creating chat:", {
        error,
        variables,
        context,
      });
    },
    onSuccess: (res) => {
      setChatId(res.chat.id);
      refetchChats();
      setChatName(res.chat.title);
    },
  });

  const handleInputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpenNewChat(false);
    }
  };

  if (!openNewChat) return null;

  return (
    <li ref={chatRef}>
      <form action={() => createNewChat()}>
        <input
          type="text"
          className="border border-indigo-300 rounded-md w-full px-2 py-1"
          autoFocus
          value={newChatName}
          onChange={(e) => {
            setNewChatName(e.target.value);
          }}
          onKeyDown={handleInputOnKeyDown}
          placeholder="Untitled"
        />
      </form>
    </li>
  );
};

export default StartNewChat;
