const screens = [...document.querySelectorAll(".screen")];
const music = document.getElementById("bgMusic");

let current = 0;

function goTo(id) {
  const target = document.getElementById(id);
  const nextIndex = screens.indexOf(target);
  if (!target || nextIndex === -1 || nextIndex === current) return;

  const currentScreen = screens[current];
  currentScreen.classList.add("exit-left");
  currentScreen.classList.remove("active");

  target.classList.remove("exit-left");
  target.classList.add("active");
  current = nextIndex;

  window.scrollTo({ top: 0, behavior: "instant" });
}

function startMusic() {
  if (!music) return;

  music.volume = 0;

  music.play().then(() => {
    const targetVolume = 0.15;
    const duration = 10;
    const startTime = performance.now();

    function fadeIn(now) {
      const progress = Math.min((now - startTime) / duration, 1);

      music.volume = targetVolume * progress;

      if (progress < 1) {
        requestAnimationFrame(fadeIn);
      }
    }

    requestAnimationFrame(fadeIn);
  }).catch(() => {
    // Browser may block playback.
  });
}

document.getElementById("openBtn").addEventListener("click", () => {
  startMusic();
  goTo("gifts");
});

document.querySelectorAll(".gift-card").forEach(card => {
  card.addEventListener("click", () => {
    const gift = card.dataset.gift;

    card.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.08) rotate(-2deg)" },
        { transform: "scale(.96) rotate(1deg)" },
        { transform: "scale(1)" }
      ],
      { duration: 520, easing: "cubic-bezier(.22,.8,.25,1)" }
    );

    setTimeout(() => {
      goTo(gift === "1" ? "ticket1" : "ticket2");
    }, 420);
  });
});

document.getElementById("toGift2").addEventListener("click", () => {
  goTo("ticket2");
});

document.getElementById("toTogether").addEventListener("click", () => {
  goTo("together");
});

document.getElementById("toWish").addEventListener("click", () => {
  goTo("wish");
});

document.getElementById("toClosing").addEventListener("click", () => {
  goTo("closing");
});

document.getElementById("restart").addEventListener("click", () => {
  goTo("opening");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") goTo("opening");
});
