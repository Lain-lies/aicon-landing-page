import "./services.css";
import { Carousel } from "./Frame.js";
import test from "./assets/test.jpg";
import test2 from "./assets/test2.jpg";
import test3 from "./assets/test3.jpg";

const assets = [test, test2, test3];

const body = document.querySelector("body");
const carousel = Carousel(assets);
body.appendChild(carousel);
