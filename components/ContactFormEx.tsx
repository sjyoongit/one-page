import { useState, useEffect } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useForm } from "react-hook-form";
import baseApiUrl from "../utils/baseApiUrl";

interface AddProductValues {
  name: string;
  email: string;
  content: string;
  file: FileList;
}

const AddProduct: NextPage = () => {
  const { register, handleSubmit } = useForm<AddProductValues>();
  const [addedId, setAddedId] = useState(0);

  /*useEffect(() => {
    fetch(`${baseApiUrl}/api/contacts/${addedId}?populate=*`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("여기:", data);
        fetch("/api/contact", {
          method: "post",
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status === 200) {
            alert("접수되었습니다.");
          } else {
            alert("접수를 실패하였습니다.");
          }
        });
      });
  }, [addedId]);*/

  // addProduct는 원래 다른 파일에 분리되어 있던 코드이다.
  const addProduct = async (values: AddProductValues) => {
    const formData = new FormData();
    const { file, ...rest } = values;

    formData.append("files.file", file[0]);
    formData.append("data", JSON.stringify(rest));
    const { data } = await axios.post(`${baseApiUrl}/api/contacts`, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    return data;
  };

  const onSubmit = async (values: AddProductValues) => {
    try {
      const data = await addProduct(values).then((data) => {
        fetch(`${baseApiUrl}/api/contacts/${data.data.id}?populate=*`, {
          method: "get",
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log("여기:", data);
            fetch("/api/contact", {
              method: "post",
              body: JSON.stringify(data),
            }).then((res) => {
              if (res.status === 200) {
                alert("접수되었습니다.");
              } else {
                alert("접수를 실패하였습니다.");
              }
            });
          });
      });
      //console.log("메일링 데이터: ", data);
      //console.log("아이디:", addedId);

      //if (data) alert("제품 등록 성공");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { error: Error }).error;
        alert(`문의하기 실패 \n ${errorMessage}`);
      } else {
        alert("문의하기 도중에 오류 발생");
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
            <form onSubmit={handleSubmit(onSubmit)}>
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

export default AddProduct;
