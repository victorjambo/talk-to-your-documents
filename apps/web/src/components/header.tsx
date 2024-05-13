import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  return (
    <header className="flex w-full py-4 border-b justify-between">
      <div className="px-4 text-lg flex flex-row items-center">
        <ChatBubbleBottomCenterTextIcon className="w-4 h-4 mr-2" />
        <span>JF Kennedy</span>
      </div>
    </header>
  );
};
export default Header;
