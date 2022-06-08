const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

export default async (req, res) => {
  const body = JSON.parse(req.body);
  //console.log("req: ", req);
  //console.log("메일:", req.body);
  const message = `
    Name: ${body.data.attributes.name}\r\n
    Email: ${body.data.attributes.email}\r\n
    Message: ${body.data.attributes.content}
  `;

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
