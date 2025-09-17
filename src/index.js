import "./index.css";
const mainBg = document.querySelector("main");

window.addEventListener("scroll", () => {
  let offset = window.pageYOffset;
  const velocity = 0.5;

  mainBg.style.backgroundPositionX = offset * velocity + "px";
});

const marketingItemNodes = [...document.querySelectorAll(".feature")];

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


marketingItemNodes.forEach((item) => {
  item.addEventListener("mouseenter", handleHover);
  item.addEventListener("mouseleave", handleDefault);
});
