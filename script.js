const CONFIG = {
  email: "",
  linkedin: "",
  calendar: "",
  resumePdf: "",
  github: "https://github.com/LisandraDv",
  portfolio: "https://lisandradv.github.io/lsdr-security-portfolio/"
};

const ACCESS_KEY = "lisandraos-accessibility-v2";
let lastTrigger = null;
let galleryImages = [];
let galleryIndex = 0;
let toastTimer = null;

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function showToast(message) {
  const toast = qs("[data-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function openDialog(dialogId, trigger = null) {
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;
  lastTrigger = trigger || document.activeElement;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  if (lastTrigger instanceof HTMLElement) lastTrigger.focus({ preventScroll: true });
}

function configureAvatarFallbacks() {
  qsa("[data-avatar-image]").forEach((img) => {
    const fallback = img.parentElement?.querySelector("[data-avatar-fallback]");
    const hideFallback = () => { if (fallback) fallback.hidden = true; };
    const showFallback = () => { img.hidden = true; if (fallback) fallback.hidden = false; };
    img.addEventListener("load", hideFallback, { once: true });
    img.addEventListener("error", showFallback, { once: true });
    if (img.complete) {
      if (img.naturalWidth > 0) hideFallback(); else showFallback();
    }
  });
}

function configureLinks() {
  qsa("[data-linkedin-link]").forEach((link) => {
    if (CONFIG.linkedin) {
      link.href = CONFIG.linkedin;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.removeAttribute("aria-disabled");
    } else {
      link.setAttribute("aria-disabled", "true");
      link.title = "Add your LinkedIn URL in CONFIG.linkedin inside script.js";
    }
  });
  qsa("[data-resume-link]").forEach((link) => {
    if (CONFIG.resumePdf) {
      link.href = CONFIG.resumePdf;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.removeAttribute("aria-disabled");
    } else {
      link.setAttribute("aria-disabled", "true");
      link.title = "Upload your resume PDF and set CONFIG.resumePdf in script.js";
    }
  });
  const emailCell = qs("[data-contact-email]");
  if (emailCell && CONFIG.email) emailCell.textContent = CONFIG.email;
  const linkedInCell = qs("[data-contact-linkedin]");
  if (linkedInCell && CONFIG.linkedin) linkedInCell.textContent = CONFIG.linkedin.replace(/^https?:\/\/(www\.)?/, "");
}

function openConnectDialog(trigger) {
  openDialog("connect-dialog", trigger);
}

function openScheduleDialog(trigger) {
  openDialog("schedule-dialog", trigger);
}

function openResumeDialog(trigger) {
  openDialog("resume-dialog", trigger);
}

async function shareProfile() {
  const shareData = { title: "Lisandra Duvernay — Cloud & Cybersecurity Portfolio", text: "LisandraOS — Cloud & Cybersecurity Portfolio", url: CONFIG.portfolio };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast("Profile shared.");
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(CONFIG.portfolio);
      showToast("Portfolio link copied to clipboard.");
      return;
    }
    window.prompt("Copy this portfolio link:", CONFIG.portfolio);
  } catch (error) {
    if (error?.name !== "AbortError") showToast("Could not open sharing. Copy the portfolio URL instead.");
  }
}

function downloadVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Lisandra Duvernay",
    "TITLE:Cloud & Cybersecurity Engineer",
    CONFIG.email ? `EMAIL:${CONFIG.email}` : "",
    CONFIG.linkedin ? `URL;TYPE=LinkedIn:${CONFIG.linkedin}` : "",
    `URL;TYPE=GitHub:${CONFIG.github}`,
    `URL;TYPE=Portfolio:${CONFIG.portfolio}`,
    "END:VCARD"
  ].filter(Boolean);
  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Lisandra-Duvernay.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("Contact card saved.");
}

function openProjectDialog(button) {
  const dialog = document.getElementById("project-dialog");
  if (!dialog) return;
  qs("[data-project-title]", dialog).textContent = button.dataset.title || "Project";
  qs("[data-project-objective]", dialog).textContent = button.dataset.objective || "";
  qs("[data-project-tools]", dialog).textContent = button.dataset.tools || "";
  const projectLink = qs("[data-project-link]", dialog);
  projectLink.href = `https://github.com/LisandraDv/lsdr-security-portfolio/tree/main/${button.dataset.path || ""}`;
  projectLink.target = "_blank";
  projectLink.rel = "noreferrer";
  openDialog("project-dialog", button);
}

function renderGallery(dialog) {
  const stage = qs("[data-gallery-stage]", dialog);
  const controls = qs("[data-gallery-controls]", dialog);
  const counter = qs("[data-gallery-counter]", dialog);
  if (!stage || !controls || !counter) return;
  if (!galleryImages.length) {
    controls.hidden = true;
    stage.innerHTML = `<div class="gallery-placeholder"><span aria-hidden="true">🖼</span><strong>Your real training photos will appear here</strong><small>Add 3–6 images inside <code>assets/training/</code> and list their paths in the training button's <code>data-images</code>.</small></div>`;
    return;
  }
  galleryIndex = Math.max(0, Math.min(galleryIndex, galleryImages.length - 1));
  const img = document.createElement("img");
  img.src = galleryImages[galleryIndex];
  img.alt = `Training photo ${galleryIndex + 1} of ${galleryImages.length}`;
  img.loading = "lazy";
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
  galleryImages = (button.dataset.images || "").split("|").map((x) => x.trim()).filter(Boolean);
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

function saveAccessibilitySettings(settings) {
  localStorage.setItem(ACCESS_KEY, JSON.stringify(settings));
}

function readAccessibilitySettings() {
  const defaults = { textSize: 100, highContrast: false, readableSpacing: false, reducedMotion: false, enhancedFocus: false };
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(ACCESS_KEY) || "{}") }; }
  catch { return defaults; }
}

function applyAccessibilitySettings(settings, persist = true) {
  document.documentElement.style.fontSize = `${settings.textSize}%`;
  document.body.classList.toggle("high-contrast", settings.highContrast);
  document.body.classList.toggle("readable-spacing", settings.readableSpacing);
  document.body.classList.toggle("reduced-motion", settings.reducedMotion);
  document.body.classList.toggle("enhanced-focus", settings.enhancedFocus);
  const range = qs("[data-text-size]");
  const label = qs("[data-text-size-label]");
  if (range) range.value = String(settings.textSize);
  if (label) label.textContent = `${settings.textSize}%`;
  const map = { "[data-access-high-contrast]": settings.highContrast, "[data-access-readable-spacing]": settings.readableSpacing, "[data-access-reduced-motion]": settings.reducedMotion, "[data-access-focus]": settings.enhancedFocus };
  Object.entries(map).forEach(([selector, checked]) => { const el = qs(selector); if (el) el.checked = checked; });
  if (persist) saveAccessibilitySettings(settings);
}

function currentAccessibilitySettings() {
  return {
    textSize: Number(qs("[data-text-size]")?.value || 100),
    highContrast: Boolean(qs("[data-access-high-contrast]")?.checked),
    readableSpacing: Boolean(qs("[data-access-readable-spacing]")?.checked),
    reducedMotion: Boolean(qs("[data-access-reduced-motion]")?.checked),
    enhancedFocus: Boolean(qs("[data-access-focus]")?.checked)
  };
}

function wireAccessibility() {
  const settings = readAccessibilitySettings();
  applyAccessibilitySettings(settings, false);
  qsa("[data-access-high-contrast],[data-access-readable-spacing],[data-access-reduced-motion],[data-access-focus],[data-text-size]").forEach((el) => el.addEventListener("input", () => applyAccessibilitySettings(currentAccessibilitySettings())));
  qs(".js-text-minus")?.addEventListener("click", () => { const range = qs("[data-text-size]"); range.value = String(Math.max(90, Number(range.value) - 5)); applyAccessibilitySettings(currentAccessibilitySettings()); });
  qs(".js-text-plus")?.addEventListener("click", () => { const range = qs("[data-text-size]"); range.value = String(Math.min(125, Number(range.value) + 5)); applyAccessibilitySettings(currentAccessibilitySettings()); });
  qs(".js-reset-access")?.addEventListener("click", () => applyAccessibilitySettings({ textSize:100, highContrast:false, readableSpacing:false, reducedMotion:false, enhancedFocus:false }));
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key.toLowerCase() === "a") { event.preventDefault(); openDialog("accessibility-dialog", qs(".js-open-accessibility")); }
  });
}

function wireMessageForm() {
  const form = document.getElementById("message-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = qs("[data-message-status]", form);
    if (!CONFIG.email) {
      status.textContent = "Add your public contact email to CONFIG.email in script.js to enable Send IM.";
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`From: ${data.get("name")} <${data.get("email")}>\n\n${data.get("message")}`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email app…";
  });
}

function openAvailableTimes() {
  const status = qs("[data-schedule-status]");
  if (!CONFIG.calendar) {
    if (status) status.textContent = "Add your Calendly/booking URL to CONFIG.calendar in script.js to enable scheduling.";
    return;
  }
  const length = qs('input[name="meeting-length"]:checked')?.value || "15";
  const separator = CONFIG.calendar.includes("?") ? "&" : "?";
  window.open(`${CONFIG.calendar}${separator}duration=${encodeURIComponent(length)}`, "_blank", "noopener,noreferrer");
}

function incrementLocalViews() {
  const key = "lisandraos-local-views";
  const count = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(count));
  const el = document.getElementById("local-visits");
  if (el) el.textContent = String(count);
}

function updateMeta() {
  qsa("[data-last-login]").forEach((el) => { el.textContent = "now"; });
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
}

function wireDialogs() {
  qsa(".js-close-dialog").forEach((button) => button.addEventListener("click", () => closeDialog(button.closest("dialog"))));
  qsa("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(dialog); }));
  qsa(".js-open-contact").forEach((button) => button.addEventListener("click", () => openDialog("contact-dialog", button)));
  qsa(".js-open-connect").forEach((button) => button.addEventListener("click", () => openConnectDialog(button)));
  qsa(".js-open-schedule").forEach((button) => button.addEventListener("click", () => openScheduleDialog(button)));
  qsa(".js-open-resume").forEach((button) => button.addEventListener("click", () => openResumeDialog(button)));
  qsa(".js-open-career").forEach((button) => button.addEventListener("click", () => openDialog("career-dialog", button)));
  qsa(".js-open-accessibility").forEach((button) => button.addEventListener("click", () => openDialog("accessibility-dialog", button)));
  qsa(".js-save-contact").forEach((button) => button.addEventListener("click", () => openDialog("save-contact-dialog", button)));
  qsa(".js-share-profile").forEach((button) => button.addEventListener("click", shareProfile));
  qsa(".js-project").forEach((button) => button.addEventListener("click", () => openProjectDialog(button)));
  qsa(".js-training").forEach((button) => button.addEventListener("click", () => openTrainingDialog(button)));
  qs("[data-gallery-prev]")?.addEventListener("click", () => moveGallery(-1));
  qs("[data-gallery-next]")?.addEventListener("click", () => moveGallery(1));
  qs(".js-download-vcard")?.addEventListener("click", downloadVCard);
  qs(".js-view-times")?.addEventListener("click", openAvailableTimes);
  qs(".js-open-resume-file")?.addEventListener("click", () => { if (CONFIG.resumePdf) window.open(CONFIG.resumePdf, "_blank", "noopener,noreferrer"); else showToast("Upload your resume PDF and set CONFIG.resumePdf first."); });
}

function wireUtilityActions() {
  qsa(".js-copy-url").forEach((button) => button.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(CONFIG.portfolio); showToast("Portfolio URL copied."); }
    catch { window.prompt("Copy portfolio URL:", CONFIG.portfolio); }
  }));
  qs(".js-refresh")?.addEventListener("click", () => window.location.reload());
  qsa("a[aria-disabled='true']").forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
}

function initialize() {
  configureAvatarFallbacks();
  configureLinks();
  updateMeta();
  incrementLocalViews();
  wireDialogs();
  wireAccessibility();
  wireMessageForm();
  wireUtilityActions();
}

document.addEventListener("DOMContentLoaded", initialize);
