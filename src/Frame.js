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

function slide(state, images, button, toRight, isMobile) {
  console.log(`toRight ${toRight}`);
  let _class = null;

  if (toRight === true) _class = "slide-right";
  else if (toRight === false) _class = "slide-left";
  else return;

  const nextSlide = () => {
    const temp = state.current + 1;
    return temp > state.max ? state.min : temp;
  };

  const previousSlide = () => {
    const temp = state.current - 1;
    return temp < state.min ? state.max : temp;
  };

  const previousImage = images[state.current];

  previousImage.classList.toggle(_class);
  if (button !== null) button.disabled = true;

  previousImage.addEventListener(
    "transitionend",
    () => {
      previousImage.classList.toggle("show");
      previousImage.classList.toggle(_class);

      state.current = toRight ? nextSlide() : previousSlide();

      const nextImage = images[state.current];
      nextImage.classList.toggle("show");

      if (isMobile) {
        state.touchStart = false;
        state.rightThreshold = false;
        state.leftThreshold = false;
        state.thresholdValue = undefined;
        state.startingX = undefined;
      }

      if (button !== null) button.disabled = false;

      console.log(state);
    },
    { once: true },
  );
}

function Carousel(assets) {
  const state = {
    max: assets.length - 1,
    min: 0,
    current: 0,
  };

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

  images[state.current].classList.toggle("show");

  console.log(images);
  const button = {
    left: document.createElement("button"),
    right: document.createElement("button"),
  };

  button.left.textContent = "<";
  button.right.textContent = ">";
  button.left.classList.add("carousel-btn");
  button.right.classList.add("carousel-btn");

  button.left.addEventListener("click", (e) =>
    slide(state, images, e.target, false),
  );

  button.right.addEventListener("click", (e) =>
    slide(state, images, e.target, true),
  );

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
    delay: false,
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
    if (!state.touchStart || state.leftThreshold || state.rightThreshold)
      return;

    const current = e.touches[0].clientX - e.target.offsetLeft;

    if (current > state.startingX) {
      state.thresholdValue = getRightThreshold(state.startingX, wrapper);
      state.rightThreshold = true;
      return;
    }

    if (current < state.startingX) {
      state.thresholdValue = getLeftThreshold(state.startingX, wrapper);
      console.log(`left threshold value ${state.thresholdValue}`);
      state.leftThreshold = true;
      return;
    }

    return;
  });

  wrapper.addEventListener("touchmove", (e) => {
    const current = e.touches[0].clientX - e.target.offsetLeft;

    if (
      state.rightThreshold &&
      current >= state.thresholdValue &&
      !state.delay
    ) {
      slide(state, images, null, true, true);
      state.delay = true;
      setTimeout(() => (state.delay = false), 1000);
      return;
    }

    if (
      state.leftThreshold &&
      current <= state.thresholdValue &&
      !state.delay
    ) {
      slide(state, images, null, false, true);
      state.delay = true;
      setTimeout(() => (state.delay = false), 1000);
      return;
    }

    return;
  });

  images.forEach((image) => wrapper.appendChild(image));
  carousel.appendChild(wrapper);

  return carousel;
}

function getRightThreshold(startingX, wrapper) {
  const multiplier = 0.5;
  const width = wrapper.getBoundingClientRect().width;
  return (width - startingX) * multiplier + startingX;
}

function getLeftThreshold(startingX) {
  const multiplier = 2;
  return startingX - startingX / multiplier;
}

export { Frame, Panel, Carousel, CarouselSwipe };
