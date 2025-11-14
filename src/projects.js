import "./projects.css";
import "./master.css";

import { Frame, Panel, Navbar, Footer } from "./Components.js";
import { intData, localData } from "./data";

function intProjectInit() {
  const section = document.querySelector(".int-projects");
  const maxPolaroid = 4;
  const maxFrames = 4;
  const data = [];
  let start = 0;
  let end = 4;

  // divide projects to 4
  while (true) {
    const sliced = intData.slice(start, end);
    if (sliced.length === 0) break;
    data.push(sliced);
    start = end;
    end += maxPolaroid;
  }

  section.appendChild(Frame(data, maxPolaroid, maxFrames));
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
  const navWrapper = document.querySelector(".nav-wrapper");
  const footer = document.querySelector("footer");
  navWrapper.appendChild(Navbar());
  Footer(footer);
  intProjectInit();
  localProjectInit();
}

appInit();
