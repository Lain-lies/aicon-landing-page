import "./master.css";
import "./index.css";

import { Navbar, Footer } from "./Components.js";

function init() {
  const mainBg = document.querySelector("main");
  const navWrapper = document.querySelector(".nav-wrapper");
  const footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    let offset = window.pageYOffset;
    const velocity = 0.5;

    mainBg.style.backgroundPositionX = offset * velocity + "px";
  });

  const marketingItemNodes = [...document.querySelectorAll(".feature")];

  marketingItemNodes.forEach((item) => {
    item.addEventListener("mouseenter", handleHover);
    item.addEventListener("mouseleave", handleDefault);
  });

  navWrapper.appendChild(Navbar());
  Footer(footer);

}

function handleHover() {
  const title = [...this.children[0].children];

  const desc = this.children[1];
  title.forEach((titleFragment) =>
    titleFragment.classList.toggle("feature-hovered"),
  );

  desc.classList.toggle("feature-hovered");
}

function handleDefault() {
  const title = [...this.children[0].children];
  const desc = this.children[1];
  title.forEach((titleFragment) =>
    titleFragment.classList.toggle("feature-hovered"),
  );
  desc.classList.toggle("feature-hovered");
}

init();
