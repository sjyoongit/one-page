import { useState } from "react";
import { useRouter } from "next/router";
import baseApiUrl from "../utils/baseApiUrl";
import { useForm } from "react-hook-form";

const Contact = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(false);

  // addProduct는 원래 다른 파일에 분리되어 있던 코드이다.
  const addProduct = async (values) => {
    const formData = new FormData();
    const { images, ...rest } = values;
    formData.append("files.images", images[0]);
    formData.append("data", JSON.stringify(rest));
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    );
    return data;
  };
  const onSubmit = async (values) => {
    try {
      const data = await addProduct(values);
      if (data) alert("제품 등록 성공");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error.message;
        alert(`제품 등록 실패 \n ${errorMessage}`);
      } else {
        alert("등록 도중에 오류 발생");
      }
    }
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
            <form name="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <ul>
                <li>
                  <label htmlFor="name">이름</label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    {...register("name")}
                  />
                </li>
                <li>
                  <label htmlFor="email">이메일</label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    {...register("email")}
                  />
                </li>
                <li>
                  <label htmlFor="content">내용</label>
                  <textarea
                    id="content"
                    name="content"
                    {...register("content")}
                  ></textarea>
                </li>
                <li>
                  <label htmlFor="file">파일업로드</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    {...register("file")}
                  ></input>
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
