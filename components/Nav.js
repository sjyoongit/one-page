import Link from "next/link";
import ScrollIntoView from "react-scroll-into-view";

const Nav = () => {
  const prevent = (e) => {
    e.preventDefault();
  };
  return (
    <nav>
      <div className="wrap container">
        <ul>
          <li>
            <ScrollIntoView selector="#about">
              <a href="#" onClick={prevent}>
                ABOUT
              </a>
            </ScrollIntoView>
          </li>
          <li>
            <ScrollIntoView selector="#vision">
              <a href="#" onClick={prevent}>
                VISION&MISSION
              </a>
            </ScrollIntoView>
          </li>
          <li>
            <ScrollIntoView selector="#sns">
              <a href="#" onClick={prevent}>
                SNS
              </a>
            </ScrollIntoView>
          </li>
          <li>
            <ScrollIntoView selector="#contact">
              <a href="#" onClick={prevent}>
                CONTACT US
              </a>
            </ScrollIntoView>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
