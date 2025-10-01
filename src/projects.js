import Frame from "./Frame";
import intData from "./data";

function appInit() {
  const frameContainer = document.querySelector(".frame-container");
  const showButton = document.querySelector(".show-button");

  const maxPolaroid = 4;
  const state = [];
  let start = 0;
  let end = 4;

  while (true) {
    const sliced = intData.slice(start, end);
    if (sliced.length === 0) break;
    state.push(sliced);
    start = end;
    end += maxPolaroid;
  }

  let activeFrames = 0;

  const framesDOM = state.map((frame) => Frame(frame, "polaroid"));
  framesDOM[activeFrames].classList.add("active");
  framesDOM.forEach((node) => frameContainer.appendChild(node));

  showButton.classList.add("active");
  showButton.addEventListener("click", () => {
    const frame = framesDOM[++activeFrames];
    if (frame === null || frame === undefined) return;
    frame.classList.add("active");
  });
}

appInit();

