import "./index.css";

const mainBg = document.querySelector("main");

window.addEventListener("scroll", () => {
  let offset = window.pageYOffset;
  const velocity = 0.5;

  mainBg.style.backgroundPositionX = offset * velocity + "px";
});

function changeTitleColor() {
  title;
  e.target.style.color = "#000";
}

function revertColor(e) {
  e.target.style.color = "#fff";
}

const marketingItem = document.querySelector(".marketing-item");
const titleFragment = [...document.querySelectorAll(".title > p")];

marketingItem.addEventListener("mouseover", () => {
  titleFragment.forEach((title) => (title.style.color = "#000"));
});

marketingItem.addEventListener("mouseleave", () => {
  titleFragment.forEach((title) => (title.style.color = "#fff"));
});
