// Import SASS stylesheets
import "./sass/main.scss";

const projects = ["ateliers", "aouf", "wecashup"];

projects.forEach(project =>
  document.getElementById(project).addEventListener("click", e => {
    console.log(e);
  })
);
