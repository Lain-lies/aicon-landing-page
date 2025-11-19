import "./master.css";
import "./index.css";

import { Navbar, Footer, antiFOUC } from "./Components.js";

function init() {
  const mainBg = document.querySelector("main");
  const navWrapper = document.querySelector(".nav-wrapper");
  const mobileContactButton = document.querySelector(".mobile-contact-btn")
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

  const servicesShortcutButton = document.querySelector(".slogan-services-btn");

  servicesShortcutButton.addEventListener(
    "click",
    () => (location.href = "services.html"),
  );

  mobileContactButton.addEventListener("click", () => document.getElementById("footer").scrollIntoView({behavior: "smooth"}));
  
  navWrapper.appendChild(Navbar("home"));
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
antiFOUC();
