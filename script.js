const CONFIG = {
  linkedin: "",
  resume: ""
};

let lastTrigger = null;
let galleryImages = [];
let galleryIndex = 0;

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function openDialog(dialogId, trigger = null) {
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;

  lastTrigger = trigger || document.activeElement;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeDialog(dialog) {
  if (!dialog) return;

  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }

  if (lastTrigger instanceof HTMLElement) {
    lastTrigger.focus({ preventScroll: true });
  }
}

function configureOptionalLinks() {
  const linkedin = qs("[data-linkedin-link]");
  const resume = qs("[data-resume-link]");

  if (linkedin && CONFIG.linkedin) {
    linkedin.href = CONFIG.linkedin;
    linkedin.textContent = "Open LinkedIn";
    linkedin.classList.remove("is-disabled");
    linkedin.removeAttribute("aria-disabled");
    linkedin.target = "_blank";
    linkedin.rel = "noreferrer";
  }

  if (resume && CONFIG.resume) {
    resume.href = CONFIG.resume;
    resume.textContent = "View Resume";
    resume.classList.remove("is-disabled");
    resume.removeAttribute("aria-disabled");
    resume.target = "_blank";
    resume.rel = "noreferrer";
  }
}

function openProjectDialog(button) {
  const dialog = document.getElementById("project-dialog");
  if (!dialog) return;

  qs("[data-project-title]", dialog).textContent = button.dataset.title || "Project";
  qs("[data-project-objective]", dialog).textContent = button.dataset.objective || "";
  qs("[data-project-tools]", dialog).textContent = button.dataset.tools || "";

  const projectLink = qs("[data-project-link]", dialog);
  if (projectLink) {
    projectLink.href = `https://github.com/LisandraDv/lsdr-security-portfolio/tree/main/${button.dataset.path || ""}`;
    projectLink.target = "_blank";
    projectLink.rel = "noreferrer";
  }

  openDialog("project-dialog", button);
}

function renderGallery(dialog) {
  const stage = qs("[data-gallery-stage]", dialog);
  const controls = qs("[data-gallery-controls]", dialog);
  const counter = qs("[data-gallery-counter]", dialog);
  if (!stage || !controls || !counter) return;

  if (!galleryImages.length) {
    controls.hidden = true;
    stage.innerHTML = `
      <div class="gallery-placeholder">
        <span aria-hidden="true">🖼</span>
        <strong>Your training photos go here</strong>
        <small>Add 3–6 images in <code>assets/training/</code>, then list them in the button’s <code>data-images</code>.</small>
      </div>`;
    return;
  }

  galleryIndex = Math.max(0, Math.min(galleryIndex, galleryImages.length - 1));
  const current = galleryImages[galleryIndex];
  const img = document.createElement("img");
  img.src = current;
  img.alt = `Training photo ${galleryIndex + 1} of ${galleryImages.length}`;
  img.loading = "lazy";
  img.decoding = "async";

  stage.replaceChildren(img);
  controls.hidden = galleryImages.length < 2;
  counter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
}

function openTrainingDialog(button) {
  const dialog = document.getElementById("training-dialog");
  if (!dialog) return;

  qs("[data-training-title]", dialog).textContent = button.dataset.title || "Training";
  qs("[data-training-provider]", dialog).textContent = button.dataset.provider || "";
  qs("[data-training-location]", dialog).textContent = button.dataset.location || "";
  qs("[data-training-description]", dialog).textContent = button.dataset.description || "";

  galleryImages = (button.dataset.images || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  galleryIndex = 0;
  renderGallery(dialog);
  openDialog("training-dialog", button);
}

function moveGallery(delta) {
  const dialog = document.getElementById("training-dialog");
  if (!dialog || galleryImages.length < 2) return;

  galleryIndex = (galleryIndex + delta + galleryImages.length) % galleryImages.length;
  renderGallery(dialog);
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const clock = document.getElementById("taskbar-time");
  if (clock) clock.textContent = time;
}

function wireDialogs() {
  qsa(".js-close-dialog").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
  });

  qsa("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });

  qsa(".js-open-contact").forEach((button) => {
    button.addEventListener("click", () => openDialog("contact-dialog", button));
  });

  qsa(".js-project").forEach((button) => {
    button.addEventListener("click", () => openProjectDialog(button));
  });

  qsa(".js-training").forEach((button) => {
    button.addEventListener("click", () => openTrainingDialog(button));
  });

  const prev = qs("[data-gallery-prev]");
  const next = qs("[data-gallery-next]");
  if (prev) prev.addEventListener("click", () => moveGallery(-1));
  if (next) next.addEventListener("click", () => moveGallery(1));
}

function wireDisabledLinks() {
  qsa("a[aria-disabled='true']").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

function initialize() {
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  configureOptionalLinks();
  wireDialogs();
  wireDisabledLinks();
  updateClock();
  window.setInterval(updateClock, 30000);
}

document.addEventListener("DOMContentLoaded", initialize);
