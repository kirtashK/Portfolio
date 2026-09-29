/*
  Theme bootstrap. Loaded in <head> WITHOUT defer by every page, so it runs
  before the first paint and the page never flashes the wrong theme.
  Keep the storage key in sync with themeStorageKey in script.js.
*/
(function () {
  var rootElement = document.documentElement;
  var savedTheme = null;

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {}

  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  rootElement.classList.add("has-js");
  rootElement.setAttribute(
    "data-theme",
    savedTheme === "dark" || savedTheme === "light" ? savedTheme : (prefersDark ? "dark" : "light")
  );
})();
