import "./about.css";
import { Navbar, Footer } from "./Frame.js";

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

navWrapper.appendChild(Navbar());
ceoObserver.observe(ceo);
cfoObserver.observe(cfo);
Footer(footer);
