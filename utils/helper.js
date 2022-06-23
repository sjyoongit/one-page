//dev, deploy same url
const baseUrl = "3.36.58.66:1337";
export const createMarkup = (text) => {
  return { __html: text };
};
export const tranformInterchanges = (interchanges, initial = false) => {
  let initialText = initial
    ? `<b>방문을 환영합니다🥰</b> <br/>
     궁금하신걸 알려주세요 <br/> <br/> `
    : "";
  interchanges.data.map((e, i) => {
    initialText += `${i + 1}. ${e.attributes.question} <br /> <br />`;
  });
  return initialText;
};
export const searchInterchange = (interchanges, question) => {
  //질문을 번호로 했을때
  let questionNum = Number(question); //질문이 Number인지 식별
  // 질문 번호 범위 안에 있나 체크
  if (
    questionNum !== NaN &&
    questionNum > 0 &&
    questionNum <= interchanges.data.length
  ) {
    return interchanges.data[questionNum - 1].attributes.answer;
  } else {
    //질문에 따른 대답 검색
    let result = interchanges.data.find((e) =>
      e.attributes.question.toLowerCase().includes(question.toLowerCase())
    );
    if (result) return result.attributes.answer;
    return `질문을 이해하지 못했습니다.😔<br><br>
        아래 질문 중 다시 시도해주세요 <br/> <br/>
        ${tranformInterchanges(interchanges)}
      `;
  }
};

export const showBotTyping = async (setInterchange, prevState, setAllow) => {
  scrollDown();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setInterchange([
    ...prevState,
    {
      owner: false,
      text: "Bot Assistant is typing.",
    },
  ]);
  scrollDown();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setInterchange([
    ...prevState,
    {
      owner: false,
      text: "Bot Assistant is typing..",
    },
  ]);
  scrollDown();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setInterchange([
    ...prevState,
    {
      owner: false,
      text: "Bot Assistant is typing...",
    },
  ]);
  scrollDown();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  setAllow(true);
  scrollDown();
};

export const getBotAnswer = async (
  interchanges,
  setInterchange,
  question,
  prevState,
  setAllow
) => {
  await showBotTyping(setInterchange, prevState, setAllow);
  setInterchange([
    ...prevState,
    {
      owner: false,
      text: searchInterchange(interchanges, question),
    },
  ]);
  scrollDown();
};

const scrollDown = () => {
  document
    .getElementById("scrollTo")
    .scrollIntoView({ behavior: "smooth", block: "start" });
};

export const fetchQuery = async (path, params = null) => {
  let url;
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`;
  } else {
    url = `${baseUrl}/${path}`;
  }
  const response = await fetch(`http://${url}`);
  const data = await response.json();
  return data;
};
