// Import SASS stylesheets
import "./sass/main.scss";

const styleSheet = document.styleSheets[0];
const insertionIndex =
  Array.from(styleSheet.cssRules).findIndex(
    cssRule => cssRule.selectorText === `.projects__item`
  ) + 1;

const projects = [`ateliers`, `aouf`, `wecashup`];

projects.forEach(project => {
  const tile = document.getElementById(project);

  tile.addEventListener(`click`, () => {
    tile.blur();

    const tileCoords = tile.getBoundingClientRect();

    const posProperties = {
      top: tileCoords.y + 2, // Because it's 2px too high on every browser for some reason
      left: tileCoords.x,
      width: tileCoords.width,
      height: tileCoords.height
    };

    const posRules = Object.entries(posProperties)
      .map(([key, value]) => `${key}: ${value / 10}rem;`)
      .join(` `);
    styleSheet.insertRule(
      `.projects__item--${project} { position: fixed; ${posRules} transition: all 10s ease-out; }`,
      insertionIndex
    );

    setTimeout(() => tile.classList.add(`projects__item--active`), 20);
  });
});
