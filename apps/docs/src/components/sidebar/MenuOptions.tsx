import React, { Dispatch, SetStateAction } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { deleteChat } from "../../queries";
import { INavbarChats } from "../../types";
import { useAppData } from "../../hooks/appData";

interface Props {
  chat: INavbarChats;
  setSelectedChat: Dispatch<SetStateAction<INavbarChats | null>>;
}

const MenuOptions: React.FC<Props> = ({ chat, setSelectedChat }) => {
  const { refetchChats } = useAppData();

  const { mutate } = useMutation({
    mutationKey: ["deleteChat"],
    mutationFn: () => deleteChat(chat.id),
    onError: (error, variables, context) => {
      console.log("🚀 ~ Error while querying:", { error, variables, context });
    },
    onSuccess: () => refetchChats(),
  });

  return (
    <Menu>
      <MenuButton className="px-0.5 py-0.5 bg-indigo-500/10 rounded-lg">
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="z-20 w-28 origin-top-right rounded-xl border border-indigo-500/5 bg-indigo-200 p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-indigo-500/10 text-black"
              onClick={() => setSelectedChat(chat)}
            >
              <PencilIcon className="size-4" />
              Edit
            </button>
          </MenuItem>

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-indigo-500/10 text-black"
              onClick={() => mutate()}
            >
              <TrashIcon className="size-4" />
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default MenuOptions;
