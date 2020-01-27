/* Import SASS stylesheets */
import "./sass/main.scss";

/* Project tiles animations */
(() => {
  const styleSheet = document.styleSheets[0];

  const getStylesheetIndex = selector =>
    Array.from(styleSheet.cssRules).findIndex(
      cssRule => cssRule.selectorText === selector
    ) + 1;

  const projects = [`ateliers`, `aouf`, `wecashup`];

  projects.forEach(project => {
    const tile = document.getElementById(project);

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
        getStylesheetIndex(`.projects__item--selected`)
      );
      tile.classList.add(`projects__item--selected`);

      styleSheet.insertRule(
        `
          .no-scroll {
            top: -${window.scrollY / 10}rem;
          }
        `,
        getStylesheetIndex(`.no-scroll`)
      );
      document.body.classList.add(`no-scroll`);

      setTimeout(() => {
        tile.classList.add(`projects__item--active`);
        setTimeout(() => {
          tile.classList.remove(`projects__item--grid`);
          tile.classList.add(`projects__item--full-screen`);
        }, 200);
      }, 4);
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
//   const tile = document.getElementById(projects[0]);
//   tile.scrollIntoView();
//   tile.click();
// })();
