import { useState } from "react";
import { useRouter } from "next/router";
import baseApiUrl from "../utils/baseApiUrl";

const Contact = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      content,
    };
    //console.log(data);

    fetch(`${baseApiUrl}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: `${data.name}`,
          email: `${data.email}`,
          content: `${data.content}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
      });

    fetch("/api/contact", {
      method: "post",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        alert("접수되었습니다.");
        return router.push("/");
      } else {
        alert("접수를 실패하였습니다.");
      }
    });
  };
  return (
    <section id="contact" className="contact">
      <div className="wrap container">
        <h2>CONTACT US</h2>
        <p className="sec_desc">
          궁금한 사항을 남겨주시면 빠르게 답변드리겠습니다.
        </p>
        <div className="form_wrap">
          <div className="form_box">
            <form name="contact-form" onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label htmlFor="name">이름</label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="email">이메일</label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="content">내용</label>
                  <textarea
                    id="content"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </li>
              </ul>
              <button type="submit" className="submit">
                문의하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
