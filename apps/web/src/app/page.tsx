import MainChat from "../components/main_chat";
import Sidebar from "../components/sidebar";

export default function Page(): JSX.Element {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <MainChat />
    </main>
  );
}
