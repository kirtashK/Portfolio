/*
  Portfolio behavior, shared by the English (index.html) and Spanish
  (es/index.html) pages. This file holds behavior only, no visible text.
  Each feature is a small init function called from init() below.
*/

/*
  Note: the "has-js" class and the initial data-theme are set by
  theme-init.js in the <head>, so they apply before first paint.
*/

const mobileNavBreakpoint = window.matchMedia("(min-width: 40em)");
const systemDarkPreference = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "portfolio-theme";

/* ---------- Mobile navigation toggle ---------- */

function initNavToggle() {
  const navToggleButton = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!navToggleButton || !primaryNav) {
    return;
  }

  function setNavOpen(isOpen) {
    navToggleButton.setAttribute("aria-expanded", String(isOpen));
    primaryNav.classList.toggle("is-open", isOpen);
  }

  navToggleButton.addEventListener("click", () => {
    const isOpen = navToggleButton.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  // Close the menu after choosing a section
  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNavOpen(false);
    }
  });

  // Close with Escape and return focus to the toggle
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      setNavOpen(false);
      navToggleButton.focus();
    }
  });

  // Reset state when resizing up to the desktop layout
  mobileNavBreakpoint.addEventListener("change", (event) => {
    if (event.matches) {
      setNavOpen(false);
    }
  });
}

/* ---------- Theme toggle (light / dark) ---------- */

function getSavedTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (error) {
    return null; // Storage blocked (e.g. private mode): fall back to system theme
  }
}

function saveTheme(themeName) {
  try {
    localStorage.setItem(themeStorageKey, themeName);
  } catch (error) {
    // Storage blocked: the choice simply won't persist across visits
  }
}

function initThemeToggle() {
  const themeToggleButton = document.querySelector(".theme-toggle");
  const rootElement = document.documentElement;

  if (!themeToggleButton) {
    return;
  }

  function applyTheme(themeName) {
    rootElement.setAttribute("data-theme", themeName);
    themeToggleButton.setAttribute("aria-pressed", String(themeName === "dark"));
  }

  // Sync the button with the theme chosen by the inline <head> script
  applyTheme(rootElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

  themeToggleButton.addEventListener("click", () => {
    const nextTheme = rootElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  // Follow system changes until the visitor picks a theme themselves
  systemDarkPreference.addEventListener("change", (event) => {
    if (!getSavedTheme()) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

/* ---------- Language switcher ---------- */

// Both language pages use the same section ids, so switching language
// can land on the section the visitor is currently reading.
function getCurrentSectionId() {
  const readingLine = window.innerHeight / 3;
  let currentSectionId = "";

  document.querySelectorAll("main section[id]").forEach((section) => {
    if (section.getBoundingClientRect().top <= readingLine) {
      currentSectionId = section.id;
    }
  });

  return currentSectionId === "hero" ? "" : currentSectionId;
}

function initLanguageSwitcher() {
  const otherLanguageLinks = document.querySelectorAll(
    '.language-switcher__link:not([aria-current="page"])'
  );

  otherLanguageLinks.forEach((languageLink) => {
    languageLink.addEventListener("click", () => {
      const currentSectionId = getCurrentSectionId();
      languageLink.hash = currentSectionId ? `#${currentSectionId}` : "";
    });
  });
}

/* ---------- Footer year ---------- */

function setFooterYear() {
  const currentYearElement = document.getElementById("current-year");

  if (currentYearElement) {
    currentYearElement.textContent = String(new Date().getFullYear());
  }
}

/* ---------- Init ---------- */

function init() {
  initNavToggle();
  initThemeToggle();
  initLanguageSwitcher();
  setFooterYear();
}

init();
