const mail = require("@sendgrid/mail");

//sendgrid api key 발급 필요
//https://docs.sendgrid.com/for-developers/sending-email/api-getting-started
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);
  //접수하기 폼데이터 메일로 전송
  //메일 내용
  const message = `
    Name: ${body.data.attributes.name}\r\n
    Email: ${body.data.attributes.email}\r\n
    Message: ${body.data.attributes.content}
  `;

  // https://docs.sendgrid.com/ui/sending-email/sender-verification
  // from 메일계정 주의해서 입력. 확인된 메일주소만 가능
  const data = {
    to: "applotnwjd@gmail.com",
    from: "applotnwjd@gmail.com",
    subject: `[${body.data.attributes.name}] 문의사항`,
    text: message,
    html:
      message.replace(/\r\n/g, "<br />") +
      "<a href=" +
      `${body.data.attributes.file.data[0].attributes.url}` +
      " >첨부파일</a>",
  };

  await mail.send(data);

  res.status(200).json({ status: "OK" });
};
