// Import SASS stylesheets
import "./sass/main.scss";

const projects = ["ateliers", "aouf", "wecashup"];

projects.forEach(project =>
  document.getElementById(project).addEventListener("click", e => {
    // console.log(e.currentTarget.getBoundingClientRect());
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const content = Array.from(
      document.getElementById(`${project}-content`).children
    );
    content.forEach(child => popup.appendChild(child));
    const body = document.getElementById("body");
    body.appendChild(popup);
  })
);
