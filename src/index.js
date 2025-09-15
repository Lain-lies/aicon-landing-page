import "./index.css";
const mainBg = document.querySelector("main");

window.addEventListener("scroll", () => {
  let offset = window.pageYOffset;
  const velocity = 0.5;

  mainBg.style.backgroundPositionX = offset * velocity + "px";
});

const marketingItemNodes = [...document.querySelectorAll(".marketing-item")];

function handleHover() {
  const title = [...this.children[0].children];
  const desc = this.children[1];
  title.forEach((titleFragment) =>
    titleFragment.classList.toggle("marketing-item-hovered"),
  );
  desc.classList.toggle("marketing-item-hovered");
}

function handleDefault() {
  const title = [...this.children[0].children];
  const desc = this.children[1];
  title.forEach((titleFragment) =>
    titleFragment.classList.toggle("marketing-item-hovered"),
  );
  desc.classList.toggle("marketing-item-hovered");
}
marketingItemNodes.forEach((item) => {
  item.addEventListener("mouseenter", handleHover);
  item.addEventListener("mouseleave", handleDefault);
});
