import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import Hamburger from "./Hamburger";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= window.innerHeight) {
        setScrolled(false);
        if (document.getElementsByTagName("nav")[0].classList.contains("on")) {
          setScrolled(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={scrolled ? "scrolled" : "no-scrolled"}>
      <div className="container">
        <div className="hd_wrap flex justify-between	items-center">
          <Logo />
          <Nav />
          <Hamburger />
        </div>
      </div>
    </header>
  );
};

export default Header;
