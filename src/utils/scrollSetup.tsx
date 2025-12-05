import ScrollReveal from "scrollreveal";

export const initScroll = () => {
  const sr = ScrollReveal({
    distance: "65px",
    duration: 1000,
    delay: 200,
    reset: false,
  });


  sr.reveal(".hero-text", { delay: 200, origin: "top" });
  sr.reveal(".hero-img", { delay: 450, origin: "top" });
  sr.reveal(".scroll-down", { origin: "bottom" });
  sr.reveal(".icons", { origin: "left" });
};
