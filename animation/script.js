const button = document.querySelector('.gsap-fill-btn');
const circle = document.querySelector('.btn-fill-circle');

// Set initial transform centering & zero scale in GSAP so GSAP manages xPercent & yPercent
gsap.set(circle, {
  xPercent: -50,
  yPercent: -50,
  scale: 0,
  transformOrigin: "center center"
});

// QuickTo functions optimize performance for fast mouse movements
const xTo = gsap.quickTo(circle, "x", { duration: 0.15, ease: "power2.out" });
const yTo = gsap.quickTo(circle, "y", { duration: 0.15, ease: "power2.out" });

// 1. Move the circle to follow the mouse within the button bounds
button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  xTo(mouseX);
  yTo(mouseY);
});

// 2. Scale the circle up smoothly from the entry position on hover
button.addEventListener('mouseenter', (e) => {
  const rect = button.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // Set position instantly on entry
  gsap.set(circle, {
    x: mouseX,
    y: mouseY
  });

  // Sync quickTo internal targets so there's no jump on movement
  xTo(mouseX);
  yTo(mouseY);
  
  // Animate the fill scaling up to cover the button area
  gsap.to(circle, {
    scale: 3, // Adjust based on button size to ensure full coverage
    duration: 0.5,
    ease: "power3.out",
    overwrite: "auto"
  });
});

// 3. Shrink the circle back down smoothly when leaving
button.addEventListener('mouseleave', () => {
  gsap.to(circle, {
    scale: 0,
    duration: 0.4,
    ease: "power3.out",
    overwrite: "auto"
  });
});

