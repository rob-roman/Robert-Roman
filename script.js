(() => {
  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Sparks effect (subtle, vintage vibe)
  const sparks = document.getElementById("sparks");
  if (sparks) {
    const spawn = () => {
      const s = document.createElement("div");
      s.className = "spark";

      // start near bottom-left
      const x = Math.random() * 45;     // %
      const y = 80 + Math.random() * 18; // %

      s.style.left = `${x}%`;
      s.style.top = `${y}%`;

      // fly direction
      const dx = (Math.random() * 180 + 60) * (Math.random() > 0.2 ? 1 : 0.6);
      const dy = -(Math.random() * 140 + 40);

      s.style.setProperty("--dx", `${dx}px`);
      s.style.setProperty("--dy", `${dy}px`);

      sparks.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    };

    // Rate kept low for performance
    setInterval(() => {
      const count = Math.random() > 0.65 ? 2 : 1;
      for (let i = 0; i < count; i++) spawn();
    }, 220);
  }
})();