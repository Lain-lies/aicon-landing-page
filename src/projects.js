import "./projects.css";
import { Frame, Panel } from "./Frame";
import { intData, localData } from "./data";

function intProjectInit() {
  const frameContainer = document.querySelector(
    ".int-projects .frame-container",
  );
  const showButton = document.querySelector(".int-projects .show-button");

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

  const framesDOM = state.map((frame) => Frame(frame));
  framesDOM[activeFrames].classList.remove("hidden");
  framesDOM.forEach((node) => frameContainer.appendChild(node));

  showButton.addEventListener("click", () => {
    const frame = framesDOM[++activeFrames];
    frame.classList.remove("hidden");

    const nextFrame = activeFrames + 1;
    if (framesDOM[nextFrame] === undefined) {
      showButton.classList.toggle("hidden");
    }
  });
}

function localProjectInit() {
  const panelContainer = document.querySelector(
    ".local-projects .panel-container",
  );

  const panelDOM = localData.map((data) => Panel(data));
  let activePanels = 0;

  panelDOM.forEach((panel) => panelContainer.appendChild(panel));
  panelDOM[activePanels].classList.remove("hidden");

  const showButton = document.querySelector(".local-projects .show-button");
  showButton.addEventListener("click", () => {
    const panel = panelDOM[++activePanels];
    panel.classList.remove("hidden");
    const nextPanel = activePanels + 1;
    if (panelDOM[nextPanel] === undefined) {
      showButton.classList.toggle("hidden");
    }
  });
}

function appInit() {
  intProjectInit();
  localProjectInit();
}

appInit();
