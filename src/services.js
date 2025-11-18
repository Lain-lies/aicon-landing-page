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

  const productCarousel = Carousel(products, "Products");
  console.log(productCarousel);
  const rentalCarousel = Carousel(rentals, "Rentals");
  const productCatalog = Catalog(productTypes, catalogData);

  const productCarouselMobile = CarouselSwipe(productsM, "Products");

  const rentalCarouselMobile = CarouselSwipe(rentalsM, "Rentals");

  const footer = document.querySelector("footer");

  navWrapper.appendChild(Navbar());
  contentWrapper.appendChild(productCarousel);
  contentWrapper.appendChild(rentalCarousel);
  contentWrapper.appendChild(productCarouselMobile);
  contentWrapper.appendChild(rentalCarouselMobile);
  contentWrapper.appendChild(productCatalog);

  Footer(footer);

  console.log(contentWrapper);
}

init();
