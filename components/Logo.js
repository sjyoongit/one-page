import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="hd_logo">
      <Link href="/">
        <a>
          <Image
            src="https://res.cloudinary.com/applotnwjd/image/upload/v1654423187/one_logo_white_nheu0i.png"
            alt="로고"
            width={75}
            height={24}
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
