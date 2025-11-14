import "./services.css";
import "./master.css";

import {
  Frame,
  Carousel,
  CarouselSwipe,
  Catalog,
  Navbar,
  Footer,
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

function init() {
  const navWrapper = document.querySelector(".nav-wrapper");
  const contentWrapper = document.querySelector(".content-wrapper");
  const carouselSwipe = CarouselSwipe(productsM, "");
  const carousel = Carousel(products, "Products");
  const rentalCarousel = Carousel(rentals, "Rentals");
  const rentalSwipe = CarouselSwipe(rentalsM, "Rentals");
  const catalog = Catalog(productTypes, catalogData);
  const footer = document.querySelector("footer");

  contentWrapper.appendChild(carousel);
  contentWrapper.appendChild(carouselSwipe);
  contentWrapper.appendChild(rentalCarousel);
  contentWrapper.appendChild(rentalSwipe);
  contentWrapper.appendChild(catalog);
  navWrapper.appendChild(Navbar());
  Footer(footer);
}

init();
