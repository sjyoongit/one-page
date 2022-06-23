import { useState, useEffect } from "react";
import {
  createMarkup,
  tranformInterchanges,
  showBotTyping,
  getBotAnswer,
} from "../utils/helper";

//https://strapi.io/blog/how-to-create-a-chat-bot-assistant-using-next-js-tailwind-css-and-strapi?utm_source=dev.to&utm_medium=post&utm_campaign=blog
const ChatBot = ({ interchanges }) => {
  const [userQuestion, setUserQuestion] = useState("");
  const [allow, setAllow] = useState(false);
  const [interchange, setInterchange] = useState([]);

  useEffect(() => {
    const interChangesAsync = async () => {
      await showBotTyping(setInterchange, [], setAllow);
      setInterchange([
        {
          owner: false,
          text: tranformInterchanges(interchanges, true),
        },
      ]);
    };
    interChangesAsync();
  }, [interchanges]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userQuestion || !allow) return;
    const uQ = userQuestion;
    const newInterchange = [
      ...interchange,
      {
        owner: true,
        text: userQuestion,
      },
    ];
    setInterchange(newInterchange);
    setUserQuestion("");
    setAllow(false);
    getBotAnswer(interchanges, setInterchange, uQ, newInterchange, setAllow);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex flex-col w-full flex-1" onSubmit={handleSubmit}>
        <div className="flex w-full bg-black border-b py-2 pl-2 bg-primary rounded-t-2xl">
          <span className="flex items-center font-bold text-lg p-2 bot_tit">
            {" "}
            Bot Assistant
          </span>
        </div>
        <div
          className="flex flex-col bg-gray-200  overflow-auto p-2 w-full bg-white"
          style={{ height: "360px" }}
        >
          {interchange.map((chat, i) =>
            chat.owner ? (
              <div
                key={i}
                className="user flex flex-row my-2 w-full p-2 justify-end"
              >
                <span className="w-1/5"></span>
                <span className="bg-gray-100 p-2 rounded">{chat.text}</span>
              </div>
            ) : (
              <div key={i} className="bot my-2 bg-gray-100 p-2 rounded">
                <span dangerouslySetInnerHTML={createMarkup(chat.text)} />
              </div>
            )
          )}
          <div id="scrollTo"></div>
        </div>
        <div className="flex flex-row justify-between items-center h-5/6  w-full -bottom-5 send_box">
          <div className="flex flex-row justify-between flex-1 w-full input_box">
            <input
              className=" bg-gray-200 p-2 txt_input"
              placeholder="Type a message"
              value={userQuestion}
              onChange={(e) => {
                setUserQuestion(e.target.value);
              }}
            />
            <button className=" bg-black p-2 text-white txt_send" type="submit">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
