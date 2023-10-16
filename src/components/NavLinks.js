import React from "react";

function NavLinks({ activeLink, link, handleNavClick }) {
  return (
    <li
      className={activeLink === `${link}` ? "active" : ""}
      onClick={() => handleNavClick(`${link}`)}
    >
      {link}
    </li>
  );
}

export default NavLinks;
