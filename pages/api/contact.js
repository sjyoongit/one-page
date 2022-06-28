import baseApiUrl from "../../utils/baseApiUrl";

const mail = require("@sendgrid/mail");
//sendgrid api key 발급 필요
//https://docs.sendgrid.com/for-developers/sending-email/api-getting-started
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const name = body.data.attributes.name; //이름
  const email = body.data.attributes.email; //이메일
  const contents =
    body.data.attributes.contents !== "" ? body.data.attributes.contents : ""; //내용
  const fileHtml =
    body.data.attributes.file.data !== null
      ? "<a href=" +
        `${baseApiUrl}${body.data.attributes.file.data[0].attributes.url}` +
        " >첨부파일</a>"
      : ""; //첨부파일

  //접수하기 폼데이터 메일로 전송
  //메일 내용
  const message = `
    Name: ${name}\r\n
    Email: ${email}\r\n
    Message: ${contents}
  `;

  // https://docs.sendgrid.com/ui/sending-email/sender-verification
  // from 메일계정 주의해서 입력. 확인된 메일주소만 가능
  const data = {
    to: "applotnwjd@gmail.com",
    from: "applotnwjd@gmail.com",
    subject: `[${name}] 문의사항`,
    text: message,
    html: message.replace(/\r\n/g, "<br />") + `${fileHtml}`,
  };

  await mail.send(data);

  res.status(200).json({ status: "OK" });
};
