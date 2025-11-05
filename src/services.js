import "./services.css";
import { Carousel, CarouselSwipe } from "./Frame.js";
import {
  productData as products,
  rentalData as rentals,
  productDataMobile as productsM,
  rentalDataMobile as rentalsM,
} from "./data.js";

const body = document.querySelector("body");
const carouselSwipe = CarouselSwipe(productsM);
const carousel = Carousel(products);
// const rentalCarousel = Carousel(rentals);
// const rentalSwipe = CarouselSwipe(rentalsM);

body.appendChild(carousel);
body.appendChild(carouselSwipe);
// body.appendChild(rentalCarousel);
// body.appendChild(rentalSwipe);
