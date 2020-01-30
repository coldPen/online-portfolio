/* Import SASS stylesheets */
import "./sass/main.scss";

/* Project tiles animations */
(() => {
  const styleSheet = document.styleSheets[0];
  const { body } = document;

  const getStylesheetIndex = selector =>
    Array.from(styleSheet.cssRules).findIndex(cssRule => {
      return cssRule.selectorText === selector;
    }) + 1;

  const projects = [`ateliers`, `aouf`, `wecashup`];

  projects.forEach(project => {
    const tile = document.getElementById(project);

    tile.addEventListener(`mousedown`, e => e.preventDefault());

    const openTile = () => {
      tile.removeEventListener(`click`, openTile);
      tile.removeEventListener(`keypress`, openTileOnEnter);

      /* Open the tile */
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

      const itemSelectedIndex = getStylesheetIndex(`.projects__item--selected`);
      styleSheet.insertRule(
        `
          .projects__item--selected {
            ${itemPosRules}
          }
        `,
        itemSelectedIndex
      );
      tile.classList.add(`projects__item--selected`);

      const noScrollIndex = getStylesheetIndex(`.no-scroll`);
      const verticalOffset = window.pageYOffset;
      styleSheet.insertRule(
        `
          .no-scroll {
            top: -${verticalOffset / 10}rem;
          }
        `,
        noScrollIndex
      );
      body.classList.add(`no-scroll`);

      setTimeout(() => {
        tile.classList.add(`projects__item--active`);

        setTimeout(() => {
          tile.classList.remove(`projects__item--grid`);
          console.log(Array.from(tile.classList));
          tile.classList.add(`projects__item--full-screen`);
        }, 200);
      }, 4);

      /* Make the tile closable with a button */
      const closeButton = document.getElementById(`close-${project}`);

      const closeProject = () => {
        closeButton.removeEventListener(`click`, closeProject);

        tile.classList.remove(`projects__item--full-screen`);
        tile.classList.add(`projects__item--grid`);

        setTimeout(() => {
          tile.classList.remove(`projects__item--active`);

          setTimeout(() => {
            body.classList.remove(`no-scroll`);
            styleSheet.deleteRule(noScrollIndex);
            window.scrollBy(0, verticalOffset);

            tile.classList.remove(`projects__item--selected`);
            styleSheet.deleteRule(itemSelectedIndex);

            tile.addEventListener(`click`, openTile);
            tile.addEventListener(`keypress`, openTileOnEnter);
          }, 4);
        }, 200);
      };

      closeButton.addEventListener(`click`, closeProject);
    };
    tile.addEventListener(`click`, openTile);

    const openTileOnEnter = ({ key }) => {
      if (key === `Enter`) openTile();
    };
    tile.addEventListener(`keypress`, openTileOnEnter);
  });
})();

/* For development purposes only */
// (() => {
//   const projects = [`ateliers`, `aouf`, `wecashup`];
//   const tile = document.getElementById(projects[0]);
//   tile.scrollIntoView();
//   tile.click();
// })();
