import AppLayout from "../components/layout/AppLayout";

const Chat = () => {
  return <div>Chat</div>;
};
const WrappedChat = AppLayout()(Chat);
export default WrappedChat;
