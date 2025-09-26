console.log("test");
import "./about.css";

const ceo = document.querySelector(".officers-ceo");
const cfo = document.querySelector(".officers-cfo");

const ceoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry); 
        entry.target.classList.toggle("ceo-show", entry.isIntersecting);
    });
});

const cfoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry); 
        entry.target.classList.toggle("cfo-show", entry.isIntersecting);
    });
});

ceoObserver.observe(ceo);
cfoObserver.observe(cfo);

