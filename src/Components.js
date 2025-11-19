import logo from "./assets/aiconlogo.png";
import fbLogo from "./assets/footer_assets/fb.svg";
import igLogo from "./assets/footer_assets/ig.svg";
import xLogo from "./assets/footer_assets/x.svg";
import ttLogo from "./assets/footer_assets/tt.svg";
import liLogo from "./assets/footer_assets/li.svg";
import emLogo from "./assets/footer_assets/em.svg";

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

  imageContainer.classList.add("polaroid-image-container");
  container.classList.add("polaroid");
  return container;
}

function Frame(data, maxFrames, bannerName) {
  const state = {
    activeFrames: 0,
  };
  const mainWrapper = document.createElement("div");
  const frameBanner = Banner(bannerName);
  const framesWrapper = document.createElement("div");
  const showButton = document.createElement("button");
  const frames = [];
  const polaroids = [];
  mainWrapper.classList.add("frame");

  showButton.textContent = "V";
  showButton.classList.add("show-button");

  for (let i = 0; i < maxFrames; i++) {
    const node = document.createElement("div");
    node.classList.add("frame");
    node.classList.add("frame-hidden");
    frames.push(node);
  } 

  data.forEach((list) => {
    const temp = [];
    list.forEach((item, index) => temp.push(Polaroid(item, index)));
    polaroids.push(temp);
  });

  frames.forEach((frame, index) => {
    polaroids[index].forEach((polaroid) => frame.appendChild(polaroid));
    framesWrapper.appendChild(frame);
  });

  frames[state.activeFrames].classList.remove("frame-hidden");

  showButton.addEventListener("click", (e) => {

    /* maxFrames - 2 will hide the showButton before the last frame is shown because if
    we reach the last frame the showButton is still rendered even though there is no content
    to show after that. */

    if(state.activeFrames === (maxFrames - 2)){
      showButton.classList.add("hidden");
    }

    frames[++state.activeFrames].classList.remove("frame-hidden");
 
  });

  mainWrapper.append(frameBanner);
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
  panel.classList.add("panel-hidden");
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
      previousImage.classList.toggle("carousel-show");
      previousImage.classList.toggle(_class);

      indices[state.current].classList.toggle("index-selected");

      state.current = toRight ? nextSlide() : previousSlide();

      indices[state.current].classList.toggle("index-selected");

      const nextImage = images[state.current];
      nextImage.classList.toggle("carousel-show");

      if (isMobile) {
        state.touchStart = false;
        state.rightThreshold = false;
        state.leftThreshold = false;
        state.thresholdValue = undefined;
        state.startingX = undefined;
      }

      if (button !== null) button.disabled = false;
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
  const carouselBanner = Banner(description);
  const indicator = Indicator(state.max);
  const contentWrapper = document.createElement("div");

  carousel.classList.add("carousel");
  contentWrapper.classList.add("carousel-content-wrapper");

  const images = assets.map((asset) => {
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = asset;
    imageContainer.appendChild(img);
    imageContainer.classList.add("carousel-image-container");
    return imageContainer;
  });

  images[state.current].classList.toggle("carousel-show");

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

  contentWrapper.appendChild(button.left);
  images.forEach((image) => contentWrapper.appendChild(image));
  contentWrapper.appendChild(button.right);

  carousel.appendChild(carouselBanner);
  carousel.appendChild(contentWrapper);
  carousel.appendChild(indicator.wrapper);

  return carousel;
}

function CarouselSwipe(assets, description) {
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
  const carouselBanner = Banner(description);
  const carouselContentWrapper = document.createElement("div");
  const indicator = Indicator(state.max);

  carousel.classList.add("carousel-mobile");
  carouselContentWrapper.classList.add("carousel-content-wrapper");
  const images = assets.map((asset) => {
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = asset;
    imageContainer.appendChild(img);
    imageContainer.classList.add("carousel-image-container");
    return imageContainer;
  });

  images[state.current].classList.toggle("carousel-show");

  carouselContentWrapper.addEventListener("touchstart", (e) => {
    state.startingX = e.touches[0].clientX - e.target.offsetLeft;
    state.touchStart = true;
    console.log(state.startingX);
  });

  carouselContentWrapper.addEventListener("touchmove", (e) => {
    if (!state.touchStart || state.leftThreshold || state.rightThreshold)
      return;

    const current = e.touches[0].clientX - e.target.offsetLeft;

    if (current > state.startingX) {
      state.thresholdValue = getRightThreshold(
        state.startingX,
        carouselContentWrapper,
      );
      state.rightThreshold = true;
      return;
    }

    if (current < state.startingX) {
      state.thresholdValue = getLeftThreshold(
        state.startingX,
        carouselContentWrapper,
      );
      console.log(`left threshold value ${state.thresholdValue}`);
      state.leftThreshold = true;
      return;
    }

    return;
  });

  carouselContentWrapper.addEventListener("touchmove", (e) => {
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

  images.forEach((image) => carouselContentWrapper.appendChild(image));

  carousel.appendChild(carouselBanner);
  carousel.appendChild(carouselContentWrapper);
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
  const catalogLabelSelectorWrapper = document.createElement("div");

  const catalogBanner = Banner("Product Catalog");
  const catalogLabel = document.createElement("label");
  const catalogSelector = document.createElement("select");
  const catalogContentWrapper = document.createElement("div");
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
    catalogContentWrapper.removeChild(content[state.selectedIndex]);
    state.selectedIndex = value;
    catalogContentWrapper.appendChild(content[state.selectedIndex]);
  };

  catalog.classList.add("catalog");
  catalogLabelSelectorWrapper.classList.add("catalog-label-selector-wrapper");
  catalogLabel.classList.add("catalog-label");
  catalogSelector.classList.add("catalog-selector");
  catalogContentWrapper.classList.add("catalog-content-wrapper");

  catalogLabel.for = "catalog-selector";
  catalogLabel.textContent = "Product Type: ";
  catalogSelector.id = "catalog-selector";

  options.forEach((option, index) => {
    const node = document.createElement("option");
    node.classList.add("catalog-option");
    node.value = index;
    node.textContent = option;

    catalogSelector.appendChild(node);
  });

  catalogSelector.addEventListener("change", (e) => {
    updateContent(e.target.value);
  });

  catalogLabelSelectorWrapper.appendChild(catalogLabel);
  catalogLabelSelectorWrapper.appendChild(catalogSelector);
  catalogContentWrapper.appendChild(content[state.selectedIndex]);
  catalog.appendChild(catalogBanner);
  catalog.appendChild(catalogLabelSelectorWrapper);
  catalog.appendChild(catalogContentWrapper);

  return catalog;
}

function List(product) {
  const wrapper = document.createElement("div");
  const name = document.createElement("p");
  const ul = document.createElement("ul");

  name.classList.add("list-name");
  name.classList.add("list-name-active");
  ul.classList.add("list");
  ul.classList.add("list-inactive");

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
    ul.classList.toggle("list-inactive");
    name.classList.toggle("list-name-active");
    name.classList.toggle("list-name-inactive");
  });

  wrapper.appendChild(ul);

  return wrapper;
}

function Navbar(pageName) {
  const nav = document.createElement("nav");
  nav.classList.add("nav");

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("nav-logo-container");

  const img = document.createElement("img");
  img.src = logo;

  logoContainer.appendChild(img);

  const centerBar = document.createElement("div");
  centerBar.classList.add("nav-center-bar");

  const numberOfLinks = 4;

  const linksData = [
    { text: "Home", link: "#", href: "index.html" },
    { text: "About", link: "#", href: "about.html" },
    { text: "Projects", link: "#", href: "projects.html" },
    { text: "Services", link: "#", href: "services.html" },
    { text: "Contacts", link: "#", href: "contacts.html" },
  ];

  for (let i = 0; i <= numberOfLinks; i++) {
    const linkData = linksData[i];
    const node = document.createElement("a");
  
    if (i === numberOfLinks) {
      node.classList.add("nav-center-bar-contact");
      node.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("footer").scrollIntoView({behavior: "smooth"});
      })
    }

    node.textContent = linkData.text;
    node.href = linkData.href;
    node.classList.add("nav-center-bar-link");
    if(linkData.text.toLowerCase() === pageName.toLowerCase()) node.classList.add("nav-current-page-highlight");
    centerBar.appendChild(node);
  }

  const button = document.createElement("button");
  button.textContent = "CONTACTS";
  button.classList.add("nav-contact-button");
  button.addEventListener("click", () => {
    document.getElementById("footer").scrollIntoView({
      behavior: "smooth",
    });
  });

  nav.appendChild(logoContainer);
  nav.appendChild(centerBar);
  nav.appendChild(button);

  return nav;
}

function Footer(wrapper) {
  wrapper.innerHTML = `

  <div id="footer" class="footer-content">

    <div class="footer-title-quote">
      <p class="title">AICON</p>
      <p class="short-quote">
        Construction Services, General Trading, & Services
      </p>
    </div>

    <div class="footer-socmed">
      <p class="label">CONNECT WITH US:</p>
      <div class="footer-logos-wrapper">
        <a href="https://www.facebook.com/ataiconsuph">
          <div class="footer-logo-container">
            <img src="${fbLogo}" alt="Facebook" />
          </div>
        </a>
        <a href="https://www.instagram.com/aiconsuph">
          <div class="footer-logo-container">
            <img src="${igLogo}" alt="Instagram" />
          </div>
        </a>
        <a href="https://x.com/aiconsuph">
          <div class="footer-logo-container">
            <img src="${xLogo}" alt="X" />
          </div>
        </a>
        <a href="https://www.tiktok.com/@aiconsuph">
          <div class="footer-logo-container">
            <img src="${ttLogo}" alt="TikTok" />
          </div>
        </a>
        <a href="https://ph.linkedin.com/company/aiconsuph">
          <div class="footer-logo-container">
            <img src="${liLogo}" alt="LinkedIn" />
          </div>
        </a>
        <a href="mailto:inquireataiconsup@gmail.com">
          <div class="footer-logo-container">
            <img src="${emLogo}" alt="Email" />
          </div>
        </a>
      </div>

    </div>

    <div class="footer-contacts">
      <p class="label">CONTACTS</p>
      <div class="footer-numbers">
        <p>+639087009307</p>
        <p>+639936890205</p>
      </div>
  </div>
</div>

<p class="copyright">
  &copy; ${new Date().getFullYear()} AICON Construction Supplies and General Trading Services
</p>

  `;
}

function antiFOUC(){
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
  });
}

export { Frame, Panel, Carousel, CarouselSwipe, Catalog, Navbar, Footer, antiFOUC };
