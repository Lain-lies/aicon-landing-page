import "./projects.css";
let state = 1;

function Polaroid(data) {
  const container = document.createElement("div");
  const imageContainer = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("p");
  img.src = data.url;
  name.textContent = data.name;

  imageContainer.appendChild(img);

  if (state % 2) {
    container.appendChild(imageContainer);
    container.appendChild(name);
  } else {
    container.appendChild(name);
    container.appendChild(imageContainer);
  }

  imageContainer.classList.add("image-container");
  container.classList.add("polaroid");
  state += 1;
  return container;
}

function Project(projects) {
  //PARAM EXPECT ARR

  const projectsContainer = document.createElement("ul");

  projects.forEach((project) => {
    const node = document.createElement("li");
    node.textContent = project;
    projectsContainer.appendChild(node);
  });

  return projectsContainer;
}

function Panel(data) {
  const panel = document.createElement("div");
  const partner = document.createElement("h2");

  partner.textContent = data.partner;

  const project = Project(data.projects);
  panel.classList.add("panel");
  panel.appendChild(partner);
  panel.appendChild(project);

  return panel;
}

function Frame(data, type) {
  const frame = document.createElement("div");
  const polaroids = data.map((prop) => Polaroid(prop));
  polaroids.forEach((polaroid) => frame.appendChild(polaroid));
  frame.classList.add("frame");

  return frame;
}

export { Frame, Panel };
