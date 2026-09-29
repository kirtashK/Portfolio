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
const navCloseScrollDistance = 40; // px scrolled before an open mobile menu closes

/* ---------- Scroll helpers ---------- */

// Run a callback on scroll, at most once per animation frame
function onScrollFrame(callback) {
  let isFrameQueued = false;

  window.addEventListener(
    "scroll",
    () => {
      if (isFrameQueued) {
        return;
      }
      isFrameQueued = true;
      window.requestAnimationFrame(() => {
        isFrameQueued = false;
        callback();
      });
    },
    { passive: true }
  );
}

// Id of the section being read: the last one whose top has passed the upper
// third of the viewport. Returns "" while on the hero (top of the page).
function getCurrentSectionId() {
  const sections = document.querySelectorAll("main section[id]");
  const readingLine = window.innerHeight / 3;
  const isAtPageBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let currentSectionId = "";

  // A short last section may never reach the reading line
  if (isAtPageBottom && sections.length > 0) {
    return sections[sections.length - 1].id;
  }

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= readingLine) {
      currentSectionId = section.id;
    }
  });

  return currentSectionId === "hero" ? "" : currentSectionId;
}

/* ---------- Sticky header ---------- */

// Adds a shadow to the header once the page is scrolled
function initStickyHeader() {
  const siteHeader = document.querySelector(".site-header");

  if (!siteHeader) {
    return;
  }

  function updateHeaderShadow() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 0);
  }

  updateHeaderShadow();
  onScrollFrame(updateHeaderShadow);
}

/* ---------- Current section highlight ---------- */

function initCurrentSectionHighlight() {
  const sectionLinks = document.querySelectorAll('.primary-nav__link[href^="#"]');

  if (sectionLinks.length === 0) {
    return;
  }

  function updateCurrentSectionLink() {
    const currentSectionId = getCurrentSectionId();

    sectionLinks.forEach((sectionLink) => {
      if (sectionLink.hash === `#${currentSectionId}`) {
        sectionLink.setAttribute("aria-current", "location");
      } else {
        sectionLink.removeAttribute("aria-current");
      }
    });
  }

  updateCurrentSectionLink();
  onScrollFrame(updateCurrentSectionLink);
}

/* ---------- Mobile navigation toggle ---------- */

function initNavToggle() {
  const navToggleButton = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!navToggleButton || !primaryNav) {
    return;
  }

  let scrollYWhenOpened = 0;

  function isNavOpen() {
    return primaryNav.classList.contains("is-open");
  }

  function setNavOpen(isOpen) {
    navToggleButton.setAttribute("aria-expanded", String(isOpen));
    primaryNav.classList.toggle("is-open", isOpen);

    if (isOpen) {
      scrollYWhenOpened = window.scrollY;
    }
  }

  navToggleButton.addEventListener("click", () => {
    setNavOpen(!isNavOpen());
  });

  // Close the menu after choosing a section
  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNavOpen(false);
    }
  });

  // Close with Escape and return focus to the toggle
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isNavOpen()) {
      setNavOpen(false);
      navToggleButton.focus();
    }
  });

  // The open menu is tall and pinned to the top, so close it once the
  // visitor scrolls the page. Keep focus out of the hidden menu.
  onScrollFrame(() => {
    if (isNavOpen() && Math.abs(window.scrollY - scrollYWhenOpened) > navCloseScrollDistance) {
      if (primaryNav.contains(document.activeElement)) {
        navToggleButton.focus({ preventScroll: true });
      }
      setNavOpen(false);
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

  // Sync the button with the theme chosen by theme-init.js
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
  initStickyHeader();
  initCurrentSectionHighlight();
  initNavToggle();
  initThemeToggle();
  initLanguageSwitcher();
  setFooterYear();
}

init();
