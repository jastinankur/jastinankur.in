const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const controls = slider.querySelector("[data-slider-controls]");
  const dotsWrap = slider.querySelector("[data-slider-dots]");
  const prev = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  let active = 0;
  let timer = null;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index, true));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function showSlide(index, restart = false) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === active);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === active);
    });

    if (restart) {
      startTimer();
    }
  }

  function startTimer() {
    window.clearInterval(timer);
    if (slides.length > 1) {
      timer = window.setInterval(() => showSlide(active + 1), 5000);
    }
  }

  if (slides.length <= 1) {
    controls.classList.add("is-hidden");
  } else {
    prev.addEventListener("click", () => showSlide(active - 1, true));
    next.addEventListener("click", () => showSlide(active + 1, true));
  }

  showSlide(0);
  startTimer();
}
