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

function Strip(data) {
  const container = document.createElement("div");
  const name = document.createElement("p");

  name.textContent = data.name;
  container.appendChild(name);

  return container;
}

export default function Frame(data, type) {
  const frame = document.createElement("div");
  console.log(data);
  switch (type) {
    case "polaroid":
      const polaroids = data.map((prop) => Polaroid(prop));
      polaroids.forEach((polaroid) => frame.appendChild(polaroid));
      break;
    case "strip":
      const strips = data.map((prop) => Strip(prop));
      strips.forEach((strip) => frame.appendChild(strip));
      break;
  }

  frame.classList.add("frame");

  return frame;
}
