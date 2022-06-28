import { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useForm } from "react-hook-form";
import baseApiUrl from "../utils/baseApiUrl";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

//입력받을 데이터
interface AddProductValues {
  name: string;
  email: string;
  contents: string;
  file: FileList;
}

const AddProduct: NextPage = () => {
  const { register, handleSubmit } = useForm<AddProductValues>();
  const [open, setOpen] = useState(false); // Backdrop open

  //문의하기 폼데이터 strapi에 저장
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
    setOpen(true);
    try {
      const data = await addProduct(values).then((data) => {
        //strapi에 저장된 데이터 불러와서 sendgrid api로 전송
        fetch(`${baseApiUrl}/api/contacts/${data.data.id}?populate=*`, {
          method: "get",
        })
          .then((res) => res.json())
          .then((data) => {
            fetch("/api/contact", {
              method: "post",
              body: JSON.stringify(data),
            }).then((res) => {
              setOpen(false);
              if (res.status === 200) {
                alert("접수되었습니다.");
              } else {
                alert("접수를 실패하였습니다.");
              }
            });
          });
      });
    } catch (error) {
      setOpen(false);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { error: Error }).error;
        alert(`문의하기를 실패하였습니다. \n ${errorMessage}`);
      } else {
        alert("문의하기 도중에 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
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
                    <label htmlFor="contents">내용</label>
                    <textarea
                      id="contents"
                      name="contents"
                      {...register("contents")}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AddProduct;
