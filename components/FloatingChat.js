import ChatBot from "../components/ChatBot";

const FloatingChat = ({ interchanges, float }) => {
  return (
    <>
      <div className={`chat_float ${float ? "on" : "off"}`}>
        <ChatBot interchanges={interchanges} />
      </div>
    </>
  );
};

export default FloatingChat;
