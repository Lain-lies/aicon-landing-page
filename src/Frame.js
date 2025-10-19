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
  const projectsContainer = document.createElement("ul");
  projectsContainer.classList.add("list");

  if (projects.length < 5) projectsContainer.classList.add("short-list");
  projects.forEach((project) => {
    const node = document.createElement("li");
    node.textContent = project;
    node.classList.add("list-item");
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
  panel.classList.add("hidden");
  panel.appendChild(partner);
  panel.appendChild(project);

  return panel;
}

function Frame(data, type) {
  const frame = document.createElement("div");
  const polaroids = data.map((prop) => Polaroid(prop));
  polaroids.forEach((polaroid) => frame.appendChild(polaroid));
  frame.classList.add("frame");
  frame.classList.add("hidden");
  return frame;
}

function slideRight(state, images) {
  const previousImage = images[state.current];

  previousImage.classList.toggle("slide-right");

  setTimeout(() => {
    previousImage.classList.toggle("show");
    previousImage.classList.toggle("slide-right");

    const temp = state.current + 1;
    temp > state.max ? (state.current = state.min) : (state.current = temp);

    const nextImage = images[state.current];
    nextImage.classList.toggle("show");
    nextImage.classList.toggle("set-left");
    setTimeout(() => nextImage.classList.toggle("set-left"), 50);
    
  }, 200);
  state.mousedown = false;
  state.rightThreshold = false;
  state.leftThreshold = false;
  state.thresholdValue = undefined;
  state.startingX = undefined;
}

function slideLeft(state, images) {
  const previousImage = images[state.current];

  previousImage.classList.toggle("slide-left");

  setTimeout(() => {
    previousImage.classList.toggle("show");
    previousImage.classList.toggle("slide-left");

    const temp = state.current + 1;
    temp > state.max ? (state.current = state.min) : (state.current = temp);

    const nextImage = images[state.current];
    nextImage.classList.toggle("show");
    nextImage.classList.toggle("set-right");
    setTimeout(() => nextImage.classList.toggle("set-right"), 50);
  }, 200);
  state.mousedown = false;
  state.rightThreshold = false;
  state.leftThreshold = false;
  state.thresholdValue = undefined;
  state.startingX = undefined;
}

function Carousel(assets) {
  const max = assets.length - 1;
  const min = 0;
  let current = 0;

  const carousel = document.createElement("div");
  carousel.classList.add("carousel");
  const images = assets.map((asset) => {
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = asset;
    imageContainer.appendChild(img);
    imageContainer.classList.add("image-container");
    return imageContainer;
  });

  images[current].classList.toggle("show");

  console.log(images);
  const button = {
    left: document.createElement("button"),
    right: document.createElement("button"),
  };

  button.left.textContent = "<";
  button.right.textContent = ">";

  button.left.classList.add("carousel-btn");
  button.right.classList.add("carousel-btn");

  button.left.addEventListener("click", (e) => {
    e.target.disabled = true;

    const previousImage = images[current];

    previousImage.classList.toggle("slide-left");

    setTimeout(() => {
      previousImage.classList.toggle("show");
      previousImage.classList.toggle("slide-left");

      const temp = current - 1;
      temp < min ? (current = max) : (current = temp);

      const nextImage = images[current];
      nextImage.classList.toggle("show");
      nextImage.classList.toggle("set-right");
      setTimeout(() => nextImage.classList.toggle("set-right"), 50);
      setTimeout(() => (e.target.disabled = false), 500);
    }, 200);
  });

  button.right.addEventListener("click", (e) => {
    e.target.disabled = true;

    const previousImage = images[current];

    previousImage.classList.toggle("slide-right");

    setTimeout(() => {
      previousImage.classList.toggle("show");
      previousImage.classList.toggle("slide-right");

      const temp = current + 1;
      temp > max ? (current = min) : (current = temp);

      const nextImage = images[current];
      nextImage.classList.toggle("show");
      nextImage.classList.toggle("set-left");
      setTimeout(() => nextImage.classList.toggle("set-left"), 50);
      setTimeout(() => (e.target.disabled = false), 500);
    }, 200);
  });

  carousel.appendChild(button.left);
  images.forEach((image) => carousel.appendChild(image));
  carousel.appendChild(button.right);

  return carousel;
}

function CarouselSwipe(assets) {
  const state = {
    max: assets.length - 1,
    min: 0,
    current: 0,
    touchStart: false,
    rightThreshold: false,
    leftThreshold: false,
    thresholdValue: undefined,
    startingX: undefined,
  };

  const carousel = document.createElement("div");
  const wrapper = document.createElement("div");

  carousel.classList.add("carousel");
  const images = assets.map((asset) => {
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = asset;
    imageContainer.appendChild(img);
    imageContainer.classList.add("image-container");
    return imageContainer;
  });

  images[state.current].classList.toggle("show");

  wrapper.addEventListener("touchstart", (e) => {
    state.startingX = e.touches[0].clientX - e.target.offsetLeft;
    state.touchStart = true;
    console.log(state.startingX);
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (!state.touchStart || state.rightThreshold || state.leftThreshold)
      return;

    if (e.touches[0].clientX > state.startingX) {
      state.thresholdValue = getRightThreshold(state.startingX, wrapper);
      state.rightThreshold = true;
    }

    if (e.touches[0].clientX < state.startingX) {
      state.thresholdValue = getLeftThreshold(state.startingX, wrapper);
      state.leftThreshold = true;
    }

    return;
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (state.rightThreshold && e.touches[0].clientX >= state.thresholdValue) {
      slideRight(state, images);
      return;
    }

    if (state.leftThreshold && e.touches[0].clientX <= state.thresholdValue) {
      slideLeft(state, images);
    }

    return;
  });

  images.forEach((image) => wrapper.appendChild(image));
  carousel.appendChild(wrapper);

  return carousel;
}

function getRightThreshold(x, wrapper) {
  const multiplier = 0.5;
  const width = wrapper.getBoundingClientRect().width;
  console.log(width);
  return (width - x) * multiplier + x;
}

function getLeftThreshold(x, wrapper) {
  const multiplier = 2;
  const threshold = x - x / multiplier;

  console.log(threshold);

  return threshold;
}
export { Frame, Panel, Carousel, CarouselSwipe };
