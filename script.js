const CONFIG = {
  email: "lisandraduvernay211221@gmail.com",
  linkedin: "",
  calendar15: "https://calendly.com/lisandraduvernay211221/new-meeting",
  calendar30: "https://calendly.com/lisandraduvernay211221/30min",
  resumePdf: "./assests/resume/CV_Lisandra_Duvernay_OFC_WC.pdf",
  github: "https://github.com/LisandraDv",
  portfolio: "https://lisandradv.github.io/lsdr-security-portfolio/"
};

const ACCESS_KEY = "lisandraos-accessibility-v3";
const THEME_KEY = "lisandraos-theme-v3";
const PALETTE_KEY = "lisandraos-palette-v32";
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
      link.title = "LinkedIn URL has not been configured yet.";
    }
  });

  qsa("[data-resume-link]").forEach((link) => {
    if (CONFIG.resumePdf) {
      link.href = CONFIG.resumePdf;
      link.download = "CV_Lisandra_Duvernay_OFC_WC.pdf";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
    } else {
      link.setAttribute("aria-disabled", "true");
      link.title = "Resume PDF is not configured.";
    }
  });

  const resumeFrame = qs("[data-resume-frame]");
  if (resumeFrame && CONFIG.resumePdf) {
    resumeFrame.src = CONFIG.resumePdf;
  }

  const emailCell = qs("[data-contact-email]");
  if (emailCell && CONFIG.email) emailCell.textContent = CONFIG.email;

  const linkedInCell = qs("[data-contact-linkedin]");
  if (linkedInCell && CONFIG.linkedin) {
    linkedInCell.textContent = CONFIG.linkedin.replace(/^https?:\/\/(www\.)?/, "");
  } else if (linkedInCell) {
    linkedInCell.textContent = "Not configured";
  }
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
      if (status) status.textContent = "Contact email is not configured.";
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const senderEmail = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Hi Lisandra,

${message}

` +
      `From: ${name}
` +
      `Email: ${senderEmail}

` +
      `Sent from LisandraOS portfolio.`
    );

    if (status) status.textContent = "Opening your email app…";
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

function openAvailableTimes() {
  const status = qs("[data-schedule-status]");
  const length = qs('input[name="meeting-length"]:checked')?.value || "15";

  const target = length === "30" ? CONFIG.calendar30 : CONFIG.calendar15;

  if (!target) {
    if (status) status.textContent = "Scheduling link is not configured.";
    return;
  }

  if (status) {
    status.textContent = `Opening ${length}-minute availability in Calendly…`;
  }

  window.open(target, "_blank", "noopener,noreferrer");
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
  qsa(".js-open-career").forEach((button) => button.addEventListener("click", () => openDialog("career-archive-dialog", button)));
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


function wireLegacyArchive() {
  const archive = document.getElementById("career-archive-dialog");
  if (!archive) return;
  const page = qs("[data-legacy-page]", archive);
  qsa("[data-legacy-target]", archive).forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.legacyTarget || "");
      if (!target || !page) return;
      page.scrollTo({ top: Math.max(0, target.offsetTop - 72), behavior: document.body.classList.contains("reduced-motion") ? "auto" : "smooth" });
    });
  });
  qs(".js-legacy-refresh", archive)?.addEventListener("click", () => {
    if (page) page.scrollTo({ top: 0, behavior: "auto" });
  });
  qsa(".js-close-and-scroll", archive).forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector?.startsWith("#")) return;
      event.preventDefault();
      closeDialog(archive);
      window.setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" }), 80);
    });
  });
}

const PALETTES = {
  "cyber-girl": {
    label: "Cyber Girl",
    primary: "#ff5f93",
    secondary: "#b188ff",
    soft: "#c7b3ff",
    deep: "#6f478f"
  },
  "classic-blue": {
    label: "Classic Blue",
    primary: "#4f9cff",
    secondary: "#75a8ee",
    soft: "#a9cfff",
    deep: "#2858a6"
  },
  "cyan-night": {
    label: "Cyan Night",
    primary: "#20d9df",
    secondary: "#7857d8",
    soft: "#9ff4f0",
    deep: "#35518d"
  },
  "violet": {
    label: "Violet",
    primary: "#c05cff",
    secondary: "#8e65ef",
    soft: "#d8b5ff",
    deep: "#643c95"
  }
};

function normalizeHex(hex) {
  const value = String(hex || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
  return "#ff5f93";
}

function mixHex(hex, mixWith = "#ffffff", amount = 0.35) {
  const a = normalizeHex(hex).slice(1);
  const b = normalizeHex(mixWith).slice(1);
  const ar = parseInt(a.slice(0,2),16), ag = parseInt(a.slice(2,4),16), ab = parseInt(a.slice(4,6),16);
  const br = parseInt(b.slice(0,2),16), bg = parseInt(b.slice(2,4),16), bb = parseInt(b.slice(4,6),16);
  const blend = (x, y) => Math.round(x + (y - x) * amount).toString(16).padStart(2, "0");
  return `#${blend(ar,br)}${blend(ag,bg)}${blend(ab,bb)}`;
}

function applyPalette(palette, persist = true) {
  const root = document.documentElement;
  root.style.setProperty("--accent", palette.primary);
  root.style.setProperty("--accent-2", palette.secondary);
  root.style.setProperty("--accent-soft", palette.soft);
  root.style.setProperty("--accent-deep", palette.deep);

  const label = qs("[data-theme-label]");
  if (label) label.textContent = palette.label || "Custom";

  const primaryInput = qs("[data-custom-primary]");
  const secondaryInput = qs("[data-custom-secondary]");
  if (primaryInput) primaryInput.value = normalizeHex(palette.primary);
  if (secondaryInput) secondaryInput.value = normalizeHex(palette.secondary);

  qsa("[data-palette]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.palette === palette.id ? "true" : "false");
  });

  if (persist) localStorage.setItem(PALETTE_KEY, JSON.stringify(palette));
}

function readPalette() {
  try {
    const saved = JSON.parse(localStorage.getItem(PALETTE_KEY) || "null");
    if (saved?.primary && saved?.secondary) return saved;
  } catch {}
  return { id: "cyber-girl", ...PALETTES["cyber-girl"] };
}

function wireThemeCustomizer() {
  applyPalette(readPalette(), false);

  const menu = qs("[data-theme-menu]");
  const opener = qs("[data-open-theme]");
  const modeButton = qs("[data-mode-toggle]");

  const setMenu = (open) => {
    if (!menu || !opener) return;
    menu.hidden = !open;
    opener.setAttribute("aria-expanded", open ? "true" : "false");
  };

  opener?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenu(menu?.hidden ?? true);
  });

  qsa("[data-palette]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.palette;
      const preset = PALETTES[id];
      if (!preset) return;
      applyPalette({ id, ...preset });
      setMenu(false);
      showToast(`${preset.label} theme applied.`);
    });
  });

  qs("[data-apply-custom-theme]")?.addEventListener("click", () => {
    const primary = normalizeHex(qs("[data-custom-primary]")?.value);
    const secondary = normalizeHex(qs("[data-custom-secondary]")?.value);
    const custom = {
      id: "custom",
      label: "Custom",
      primary,
      secondary,
      soft: mixHex(secondary, "#ffffff", .42),
      deep: mixHex(primary, "#000000", .48)
    };
    applyPalette(custom);
    setMenu(false);
    showToast("Custom colors applied.");
  });

  const storedMode = localStorage.getItem(THEME_KEY);
  if (storedMode === "light") document.body.classList.add("light-theme");

  const syncModeButton = () => {
    if (!modeButton) return;
    const light = document.body.classList.contains("light-theme");
    modeButton.textContent = light ? "🌙" : "☀️";
    modeButton.title = light ? "Switch to dark mode" : "Switch to light mode";
    modeButton.setAttribute("aria-label", modeButton.title);
  };

  syncModeButton();
  modeButton?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem(THEME_KEY, document.body.classList.contains("light-theme") ? "light" : "default");
    syncModeButton();
  });

  document.addEventListener("click", (event) => {
    if (!menu || menu.hidden) return;
    if (!event.target.closest(".theme-picker")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

function wireSearch() {
  const input = document.getElementById("profile-search");
  if (!input) return;
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const term = input.value.trim().toLowerCase();
    if (!term) return;
    const candidates = qsa("main section").filter((section) => section.textContent.toLowerCase().includes(term));
    if (!candidates.length) {
      showToast(`No profile section found for “${input.value.trim()}”.`);
      return;
    }
    candidates[0].scrollIntoView({ behavior: document.body.classList.contains("reduced-motion") ? "auto" : "smooth", block: "start" });
    showToast(`Found “${input.value.trim()}”.`);
  });
}


function wireSelectableChips() {
  qsa(".interest-grid span, .built-with-row span").forEach((chip) => {
    chip.setAttribute("role", "button");
    chip.setAttribute("tabindex", "0");
    chip.setAttribute("aria-pressed", "false");

    const toggle = () => {
      const selected = chip.classList.toggle("is-selected");
      chip.setAttribute("aria-pressed", selected ? "true" : "false");
    };

    chip.addEventListener("click", toggle);
    chip.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });
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
  wireLegacyArchive();
  wireThemeCustomizer();
  wireSearch();
  wireSelectableChips();
}

document.addEventListener("DOMContentLoaded", initialize);
