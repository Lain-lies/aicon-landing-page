import "./about.css";
import "./master.css";

import { Navbar, Footer, antiFOUC} from "./Components.js";

function init() {
  const ceo = document.querySelector(".officers-ceo");
  const cfo = document.querySelector(".officers-cfo");
  const footer = document.querySelector("footer");

  const ceoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      entry.target.classList.toggle("ceo-show", entry.isIntersecting);
    });
  });

  const cfoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      entry.target.classList.toggle("cfo-show", entry.isIntersecting);
    });
  });

  const navWrapper = document.querySelector(".nav-wrapper");

  navWrapper.appendChild(Navbar("about"));
  ceoObserver.observe(ceo);
  cfoObserver.observe(cfo);
  Footer(footer);
}


init();
antiFOUC();
