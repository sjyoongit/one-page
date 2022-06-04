import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= window.innerHeight) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="hd_wrap flex justify-between	items-center">
          <Logo />
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
