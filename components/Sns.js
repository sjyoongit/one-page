import Link from "next/link";

const Sns = () => {
  return (
    <section id="sns" className="sns">
      <div className="wrap container">
        <h2>SNS</h2>
        <p className="sec_desc">SNS로 우리의 일상을 확인할 수 있습니다.</p>
        <Link href="/">
          <a>SNS 보러가기</a>
        </Link>
      </div>
    </section>
  );
};

export default Sns;
