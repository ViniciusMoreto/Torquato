// =========================
// LOADER
// =========================
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1500);
});

// =========================
// CURSOR PERSONALIZADO
// =========================
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

if (window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    setTimeout(() => {
      follower.style.left = e.clientX - 20 + "px";
      follower.style.top = e.clientY - 20 + "px";
    }, 80);
  });

  document
    .querySelectorAll("a, button, .service-card, .faq-item, .testimonial-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => follower.classList.add("hover"));
      el.addEventListener("mouseleave", () =>
        follower.classList.remove("hover"),
      );
    });
}

// =========================
// NAVBAR
// =========================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// =========================
// MENU MOBILE
// =========================
const menuToggle = document.getElementById("menuToggle");
const navUl = document.querySelector("nav ul");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navUl.classList.toggle("active");
});

// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const destino = document.querySelector(href);
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth" });
        menuToggle.classList.remove("active");
        navUl.classList.remove("active");
      }
    }
  });
});

// =========================
// PARTÍCULAS
// =========================
const particles = document.getElementById("particles");
for (let i = 0; i < 35; i++) {
  const particle = document.createElement("span");
  particle.classList.add("particle");
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = 5 + Math.random() * 10 + "s";
  particle.style.animationDelay = Math.random() * 5 + "s";
  const size = 3 + Math.random() * 5 + "px";
  particle.style.width = size;
  particle.style.height = size;
  particles.appendChild(particle);
}

// =========================
// GSAP + SCROLLTRIGGER
// =========================
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

window.addEventListener("DOMContentLoaded", () => {

  mm.add("(min-width: 991px)", () => {

    // Timeline inicial

    const tl = gsap.timeline({ delay: 1.9 });

    tl.from(".logo", {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        "nav li",
        {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".tag",
        { x: -80, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.2",
      )
      .from(
        ".hero h1",
        { x: -100, opacity: 0, duration: 1, ease: "power4.out" },
        "-=0.5",
      )
      .from(".hero p", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".buttons", { scale: 0.7, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-image", { x: 100, opacity: 0, duration: 1.2 }, "-=0.8")
      .from(".glow", { scale: 0.4, opacity: 0, duration: 1.5 }, "-=1")
      .from(".scroll-indicator", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");
  });

  // Reveal animations
  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Parallax blurs
  gsap.to(".blur1", {
    y: -100,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });
  gsap.to(".blur2", {
    y: 100,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

});

// =========================
// CONTADORES ANIMADOS
// =========================
const animateCounter = (el) => {
  const target = +el.dataset.target;
  const duration = 2000;
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else
      el.textContent =
        target + (target >= 100 ? "" : target === 5 ? ".0" : "+");
  };
  requestAnimationFrame(update);
};

document.querySelectorAll(".stat-number, .counter-number").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    onEnter: () => animateCounter(el),
    once: true,
  });
});

// =========================
// TILT 3D CARDS
// =========================
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// =========================
// SLIDER ANTES x DEPOIS
// =========================
const baTrack = document.getElementById("baTrack");
const baDots = document.getElementById("baDots");
const baPrev = document.getElementById("baPrev");
const baNext = document.getElementById("baNext");
let currentBA = 0;

function updateBASlider() {
  const slides = baTrack.querySelectorAll(".ba-slide");
  if (slides.length === 0) return;

  const maxIndex = slides.length - 1;
  currentBA = Math.max(0, Math.min(currentBA, maxIndex));

  // Desloca o track
  const offset = currentBA * 100;
  baTrack.style.transform = `translateX(-${offset}%)`;

  // Atualiza dots
  baDots.innerHTML = "";
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("button");
    dot.className = "ba-dot" + (i === currentBA ? " active" : "");
    dot.setAttribute("aria-label", `Ir para transformação ${i + 1}`);
    dot.addEventListener("click", () => {
      currentBA = i;
      updateBASlider();
    });
    baDots.appendChild(dot);
  }

  // Atualiza estado dos botões
  baPrev.disabled = currentBA === 0;
  baNext.disabled = currentBA >= maxIndex;
}

baPrev.addEventListener("click", () => {
  if (currentBA > 0) {
    currentBA--;
    updateBASlider();
  }
});

baNext.addEventListener("click", () => {
  const slides = baTrack.querySelectorAll(".ba-slide");
  if (currentBA < slides.length - 1) {
    currentBA++;
    updateBASlider();
  }
});

// Suporte a teclado
document.addEventListener("keydown", (e) => {
  const sliderRect = baTrack.getBoundingClientRect();
  const inView = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;
  if (!inView) return;

  if (e.key === "ArrowLeft" && currentBA > 0) {
    currentBA--;
    updateBASlider();
  } else if (e.key === "ArrowRight" && currentBA < baTrack.querySelectorAll(".ba-slide").length - 1) {
    currentBA++;
    updateBASlider();
  }
});

// Suporte a swipe no mobile
let baTouchStartX = 0;
let baTouchEndX = 0;

baTrack.addEventListener("touchstart", (e) => {
  baTouchStartX = e.changedTouches[0].screenX;
}, { passive: true });

baTrack.addEventListener("touchend", (e) => {
  baTouchEndX = e.changedTouches[0].screenX;
  handleBASwipe();
}, { passive: true });

function handleBASwipe() {
  const diff = baTouchStartX - baTouchEndX;
  const threshold = 50;

  if (Math.abs(diff) < threshold) return;

  const slides = baTrack.querySelectorAll(".ba-slide");

  if (diff > 0 && currentBA < slides.length - 1) {
    currentBA++;
    updateBASlider();
  } else if (diff < 0 && currentBA > 0) {
    currentBA--;
    updateBASlider();
  }
}

window.addEventListener("load", updateBASlider);
window.addEventListener("resize", updateBASlider);

// =========================
// DEPOIMENTOS SLIDER
// =========================
const track = document.getElementById("testimonialsTrack");
const dotsContainer = document.getElementById("testDots");
let currentTest = 0;

function getVisible() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function updateTestimonials() {
  const cards = [...track.querySelectorAll(".testimonial-card")];

  const visible = getVisible();

  const maxIndex = cards.length - visible;

  currentTest = Math.max(0, Math.min(currentTest, maxIndex));

  const gap = 25;

  const cardWidth = cards[0].getBoundingClientRect().width;

  track.style.transform = `translateX(-${currentTest * (cardWidth + gap)}px)`;
}

document.getElementById("prevTest").addEventListener("click", () => {
  if (currentTest > 0) {
    currentTest--;
    updateTestimonials();
  }
});
document.getElementById("nextTest").addEventListener("click", () => {
  const cards = track.querySelectorAll(".testimonial-card");
  const visible = getVisible();
  if (currentTest < cards.length - visible) {
    currentTest++;
    updateTestimonials();
  }
});

window.addEventListener("load", updateTestimonials);
window.addEventListener("resize", updateTestimonials);

// Auto-play
setInterval(() => {
  const cards = track.querySelectorAll(".testimonial-card");
  const visible = getVisible();
  currentTest = currentTest < cards.length - visible ? currentTest + 1 : 0;
  updateTestimonials();
}, 5000);

// =========================
// FAQ ACCORDION
// =========================
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const answer = item.querySelector(".faq-answer");
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// =========================
// PARALLAX HERO IMAGE
// =========================
if (window.innerWidth > 768) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const heroImg = document.querySelector(".hero-image img");
    if (heroImg && scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });
}
