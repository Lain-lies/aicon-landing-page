import "./services.css";
import { Carousel, CarouselSwipe } from "./Frame.js";
import { productData as products, rentalData as rentals } from "./data.js";

const body = document.querySelector("body");
const carouselSwipe = CarouselSwipe(products);
const carousel = Carousel(products);
const rentalCarousel = Carousel(rentals);

body.appendChild(carousel);
body.appendChild(carouselSwipe);
body.appendChild(rentalCarousel);
