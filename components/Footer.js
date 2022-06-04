import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="wrap container">
        <div className="copyright">
          <p>@ONE Page Example</p>
        </div>
        <div className="law">
          <ul>
            <li>
              <Link href="/">
                <a>개인정보처리방침</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>법적고지</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>이메일주소 무단수집 거부</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
