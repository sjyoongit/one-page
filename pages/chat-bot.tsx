import { fetchQuery } from "../utils/helper";
import ChatBotComp from "../components/ChatBot";

export default function ChatBot({ interchanges }) {
  return <ChatBotComp interchanges={interchanges} />;
}

export async function getStaticProps() {
  const interchanges = await fetchQuery("api/interchanges");
  return {
    props: {
      interchanges,
    },
  };
}
