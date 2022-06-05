import { useState, useEffect } from "react";

const Hamburger = () => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      document.getElementsByTagName("header")[0].classList.add("scrolled");
      document.getElementsByTagName("nav")[0].classList.add("on");
    } else {
      document.getElementsByTagName("nav")[0].classList.remove("on");
    }
  }, [clicked]);
  return (
    <div className="menu-icon">
      <input
        className="menu-icon__cheeckbox"
        type="checkbox"
        onChange={() => setClicked(!clicked)}
      />
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Hamburger;
