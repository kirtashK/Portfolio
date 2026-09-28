/*
  Portfolio behavior.
  This file holds behavior only. All visible text lives in index.html.
  Each feature is a small init function called from init() below;
  future features (theme toggle, language switcher) plug in the same way.
*/

const mobileNavBreakpoint = window.matchMedia("(min-width: 40em)");

/* ---------- Progressive enhancement flag ---------- */

function markJavaScriptAvailable() {
  document.documentElement.classList.add("has-js");
}

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

/* ---------- Footer year ---------- */

function setFooterYear() {
  const currentYearElement = document.getElementById("current-year");

  if (currentYearElement) {
    currentYearElement.textContent = String(new Date().getFullYear());
  }
}

/* ---------- Init ---------- */

function init() {
  markJavaScriptAvailable();
  initNavToggle();
  setFooterYear();
}

init();
