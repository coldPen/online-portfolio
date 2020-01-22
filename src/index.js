/* Import SASS stylesheets */
import "./sass/main.scss";

/* Import dark versions of logos */
import darkAouf from "./assets/dark-aouf.svg";
import darkAteliers from "./assets/dark-ateliers.svg";
import darkWecashup from "./assets/dark-wecashup.svg";

/* Project tiles animations */
(() => {
  const styleSheet = document.styleSheets[0];

  const getInsertionIndex = selector =>
    Array.from(styleSheet.cssRules).findIndex(
      cssRule => cssRule.selectorText === selector
    ) + 1;

  const projects = [`ateliers`, `aouf`, `wecashup`];
  const darkLogos = {
    aouf: darkAouf,
    ateliers: darkAteliers,
    wecashup: darkWecashup
  };

  projects.forEach(project => {
    const tile = document.getElementById(project);
    const logo = document.getElementById(`logo-${project}`);

    tile.addEventListener(`mousedown`, e => e.preventDefault());

    const openTile = () => {
      const { y: top, x: left, width, height } = tile.getBoundingClientRect();

      const itemPosProps = {
        top: top + 2, // Because it's 2px too high on every browser for some reason
        left,
        width,
        height
      };

      const itemPosRules = Object.entries(itemPosProps)
        .map(([key, value]) => `${key}: ${value / 10}rem;`)
        .join(` `);

      styleSheet.insertRule(
        `
          .projects__item--selected {
            ${itemPosRules}
          }
        `,
        getInsertionIndex(`.projects__item--selected`)
      );
      tile.classList.add(`projects__item--selected`);

      styleSheet.insertRule(
        `
          .noScroll {
            top: -${window.scrollY / 10}rem;
          }
        `,
        getInsertionIndex(`.noScroll`)
      );
      document.body.classList.add("noScroll");

      setTimeout(() => {
        tile.classList.add(`projects__item--active`);
        setTimeout(() => {
          tile.classList.remove(`projects__item--grid`);
          tile.classList.add(`projects__item--full-screen`);
          logo.src = darkLogos[project];
        }, 400);
      }, 100);
    };

    tile.addEventListener(`keypress`, e => {
      if (e.key === `Enter`) openTile();
    });

    tile.addEventListener(`click`, () => openTile());
  });
})();

/* For development purposes only */
// (() => {
//   const projects = [`ateliers`, `aouf`, `wecashup`];
//   const tile = document.getElementById(projects[1]);
//   tile.scrollIntoView();
//   tile.click();
// })();
