import "./services.css";
import "./master.css";

import {
  Frame,
  Carousel,
  CarouselSwipe,
  Catalog,
  Navbar,
  Footer,
  antiFOUC
} from "./Components.js";

import {
  productData as products,
  rentalData as rentals,
  productDataMobile as productsM,
  rentalDataMobile as rentalsM,
  catalogData,
  realEstateData,
  productTypes,
} from "./data.js";

function realEstateInit() {
  const maxPolaroid = 4;
  const maxFrames = 4;
  const data = [];
  let start = 0;
  let end = 4;

  // divide projects to 4
  while (true) {
    const sliced = realEstateData.slice(start, end);
    if (sliced.length === 0) break;
    data.push(sliced);
    start = end;
    end += maxPolaroid;
  }

  return Frame(data, maxFrames, "Real Estate / Rentals");
}

function init() {
  const navWrapper = document.querySelector(".nav-wrapper");
  const contentWrapper = document.querySelector(".content-wrapper");

  const productCarousel = Carousel(products, "Products");

  const rentalCarousel = Carousel(rentals, "Rentals");
  const productCatalog = Catalog(productTypes, catalogData);

  const productCarouselMobile = CarouselSwipe(productsM, "Products");

  const rentalCarouselMobile = CarouselSwipe(rentalsM, "Rentals");

  const realEstateFrame = realEstateInit();
  const footer = document.querySelector("footer");

  navWrapper.appendChild(Navbar("services"));
  contentWrapper.appendChild(productCarousel);
  contentWrapper.appendChild(rentalCarousel);
  contentWrapper.appendChild(productCarouselMobile);
  contentWrapper.appendChild(rentalCarouselMobile);
  contentWrapper.appendChild(productCatalog);
  contentWrapper.appendChild(realEstateFrame);

  Footer(footer);

  console.log(contentWrapper);
}

init();
antiFOUC();
