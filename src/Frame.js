import { intData } from "./data";

function Polaroid(data, order) {
 
  const container = document.createElement("div");
  const imageContainer = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("p");
  img.src = data.url;
  name.textContent = data.name;

  imageContainer.appendChild(img);

  if (order % 2) {
    container.appendChild(imageContainer);
    container.appendChild(name);
  } else {
    container.appendChild(name);
    container.appendChild(imageContainer);
  }

  imageContainer.classList.add("image-container");
  container.classList.add("polaroid");
  return container;
}

function Frame(data, maxPolaroid, maxFrames) {
  const state = {
    activeFrames: 0,
  }
  const mainWrapper = document.createElement("div");
  const framesWrapper = document.createElement("div");
  const showButton = document.createElement("button");
  const frames = [];
  const polaroids = [];

  showButton.textContent = "V";
  showButton.classList.add("show-button");

  for(let i = 0; i < maxFrames; i++){
    const node = document.createElement("div");
    node.classList.add("frame");
    node.classList.add("hidden");
    frames.push(node);
  }

  data.forEach(list => {
    const temp = [];
    list.forEach((item, index) => temp.push(Polaroid(item, index)));
    polaroids.push(temp);
  })
   
  frames.forEach((frame, index) => {
    polaroids[index].forEach(polaroid => frame.appendChild(polaroid));
    framesWrapper.appendChild(frame);
  });

  frames[state.activeFrames].classList.remove("hidden");
  
  showButton.addEventListener("click", () => {
    frames[++state.activeFrames].classList.remove("hidden");
    const nextFrame = state.activeFrames + 1;
    if (frames[nextFrame] === undefined) {
      showButton.classList.toggle("hidden");
    }
  })

  mainWrapper.appendChild(framesWrapper);
  mainWrapper.appendChild(showButton);
  return mainWrapper;
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

function slide(state, images, button, indices, toRight, isMobile) {
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

      indices[state.current].classList.toggle("index-selected");

      state.current = toRight ? nextSlide() : previousSlide();

      indices[state.current].classList.toggle("index-selected");

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

function Carousel(assets, description) {
  const state = {
    max: assets.length - 1,
    min: 0,
    current: 0,
  };

  const carousel = document.createElement("div");
  const banner = Banner(description);
  const indicator = Indicator(state.max);
  const wrapper = document.createElement("div");

  wrapper.classList.add("wrapper");
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

  const button = {
    left: document.createElement("button"),
    right: document.createElement("button"),
  };

  button.left.textContent = "<";
  button.right.textContent = ">";
  button.left.classList.add("carousel-btn");
  button.right.classList.add("carousel-btn");

  button.left.addEventListener("click", (e) => {
    slide(state, images, e.target, indicator.indices, false, false);
  });

  button.right.addEventListener("click", (e) =>
    slide(state, images, e.target, indicator.indices, true, false),
  );

  wrapper.appendChild(button.left);
  images.forEach((image) => wrapper.appendChild(image));
  wrapper.appendChild(button.right);

  carousel.appendChild(banner);
  carousel.appendChild(wrapper);
  carousel.appendChild(indicator.wrapper);

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
  const indicator = Indicator(state.max);

  carousel.classList.add("carousel-mobile");
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
      slide(state, images, null, indicator.indices, true, true);
      state.delay = true;
      setTimeout(() => (state.delay = false), 1000);
      return;
    }

    if (
      state.leftThreshold &&
      current <= state.thresholdValue &&
      !state.delay
    ) {
      slide(state, images, null, indicator.indices, false, true);
      state.delay = true;
      setTimeout(() => (state.delay = false), 1000);
      return;
    }

    return;
  });

  images.forEach((image) => wrapper.appendChild(image));
  carousel.appendChild(wrapper);
  carousel.appendChild(indicator.wrapper);
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

function Indicator(length) {
  const wrapper = document.createElement("div");

  wrapper.classList.add("indicator");
  const indices = [];

  for (let i = 0; i <= length; i++) {
    const index = document.createElement("div");
    index.classList.add("index");
    indices.push(index);
  }

  indices.forEach((index) => wrapper.appendChild(index));
  indices[0].classList.toggle("index-selected");
  return {
    wrapper,
    indices,
  };
}

function Banner(description) {
  const wrapper = document.createElement("div");
  const text = document.createElement("h2");

  wrapper.classList.add("banner");
  text.classList.add("text");
  text.textContent = description;

  wrapper.appendChild(text);
  return wrapper;
}

function Catalog(options, listArray) {
  const state = { selectedIndex: 0 };
  const catalog = document.createElement("div");
  const banner = Banner("Product Catalog");
  const label = document.createElement("label");
  const selector = document.createElement("select");
  const contentWrapper = document.createElement("div");
  const content = listArray.map((list) => {
    const ul = document.createElement("ul");
    list.forEach((item) => {
      const li = document.createElement("li");
      const temp = List(item);
      li.appendChild(temp);
      ul.appendChild(li);
    });

    return ul;
  });
  const updateContent = (value) => {
    contentWrapper.removeChild(content[state.selectedIndex]);
    state.selectedIndex = value;
    contentWrapper.appendChild(content[state.selectedIndex]);
  };

  catalog.classList.add("catalog");
  contentWrapper.classList.add("content-wrapper");

  label.for = "product-type";
  label.textContent = "Product Type: ";
  selector.id = "product-type";

  options.forEach((option, index) => {
    const node = document.createElement("option");
    node.value = index;
    node.textContent = option;
    selector.appendChild(node);
  });

  selector.addEventListener("change", (e) => {
    updateContent(e.target.value);
  });

  contentWrapper.appendChild(content[state.selectedIndex]);
  catalog.appendChild(banner);
  catalog.appendChild(label);
  catalog.appendChild(selector);
  catalog.appendChild(contentWrapper);

  return catalog;
}

function List(product) {
  const wrapper = document.createElement("div");
  const name = document.createElement("p");
  const ul = document.createElement("ul");

  name.classList.add("product-name");
  name.classList.add("product-inactive");
  ul.classList.add("inactive");
  ul.classList.add("inner-list");

  wrapper.appendChild(name);

  if (product.list === undefined) {
    name.textContent = product.name;
    console.log("test1");
    return wrapper;
  }

  name.textContent = product.name;

  product.list.forEach((item) => {
    const node = document.createElement("li");
    node.textContent = `- ${item}`;
    ul.appendChild(node);
  });

  name.addEventListener("click", () => {
    ul.classList.toggle("inactive");
    name.classList.toggle("product-active");
    name.classList.toggle("product-inactive");
  });

  wrapper.appendChild(ul);

  return wrapper;
}

export { Frame, Panel, Carousel, CarouselSwipe, Catalog };
