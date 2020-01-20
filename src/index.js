// Import SASS stylesheets
import "./sass/main.scss";

const styleSheet = document.styleSheets[0];

// const lastSelectorIndex = Array.from(styleSheet.cssRules)
//   .reverse()
//   .findIndex(
//     cssRule =>
//       cssRule.selectorText && cssRule.selectorText.includes(`.projects__item`)
//   );
// const insertionIndex = styleSheet.cssRules.length - lastSelectorIndex;

const insertionIndex =
  Array.from(styleSheet.cssRules).findIndex(
    cssRule => cssRule.selectorText === `.projects__item--selected`
  ) + 1;

const projects = [`ateliers`, `aouf`, `wecashup`];

projects.forEach(project => {
  const tile = document.getElementById(project);

  tile.addEventListener(`click`, () => {
    tile.blur();

    const { y: top, x: left, width, height } = tile.getBoundingClientRect();

    const posProperties = {
      top: top + 2, // Because it's 2px too high on every browser for some reason
      left,
      width,
      height
    };

    const posRules = Object.entries(posProperties)
      .map(([key, value]) => `${key}: ${value / 10}rem;`)
      .join(` `);

    styleSheet.insertRule(
      `
        .projects__item--selected {
          ${posRules}
        }
      `,
      insertionIndex
    );
    tile.classList.add(`projects__item--selected`);

    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add("noScroll");

    setTimeout(() => tile.classList.add(`projects__item--active`), 100);
  });
});
