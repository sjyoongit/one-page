import Image from "next/image";

const Visual = () => {
  return (
    <div className="visual">
      <div className="container">
        <div className="txt">
          <small>ONE</small>
          <strong>
            WORLD-LEADING
            <br />
            ONE ENTERPRISES BY ACCELERATING
            <br />
            AI TECHNOLOGIES
          </strong>
        </div>
      </div>
      <Image
        src="https://res.cloudinary.com/applotnwjd/image/upload/v1654236804/one_visual_xou98n.jpg"
        alt="메인비주얼 배경"
        width={1920}
        height={1080}
        layout="fill"
      />
    </div>
  );
};

export default Visual;
