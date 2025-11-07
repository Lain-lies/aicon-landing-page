import "./services.css";
import { Frame, Carousel, CarouselSwipe, Catalog } from "./Frame.js";
import {
  productData as products,
  rentalData as rentals,
  productDataMobile as productsM,
  rentalDataMobile as rentalsM,
  catalogData,
  realEstateData,
} from "./data.js";

const body = document.querySelector("body");
const carouselSwipe = CarouselSwipe(productsM, "");
const carousel = Carousel(products, "Products");
const rentalCarousel = Carousel(rentals, "Rentals");
const rentalSwipe = CarouselSwipe(rentalsM, "Rentals");

const catalog = Catalog(
  [
    "Chemical Materials",
    "Electrical Materials",
    "Heavy Equipments",
    "Aggregates",
    "Electrical Products by JCMS",
    "Wellness Products by JCMS",
  ],
  catalogData,
);

body.appendChild(carousel);
body.appendChild(carouselSwipe);
body.appendChild(rentalCarousel);
body.appendChild(rentalSwipe);
body.appendChild(catalog);
realEstateInit();
