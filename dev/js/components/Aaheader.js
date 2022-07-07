if (localStorage.length > 1) {
  document.documentElement.style.setProperty(
    "--dominant1-wmode-color",
    localStorage.getItem("L")
  );
  document.documentElement.style.setProperty(
    "--dominant1-bmode-color",
    localStorage.getItem("D")
  );
  document
    .querySelector("header .searchingBW .dl-mode")
    .classList.add(localStorage.getItem("D-icon"));
  document
    .querySelector("header .searchingBW .dl-mode")
    .classList.add(localStorage.getItem("L-icon"));
} else {
  document.querySelector("header .searchingBW .dl-mode").classList.add("L");
}

let searchingIcon = document.querySelector("header .searchingBW .fa-search");
let searchingBox = document.querySelector(".searchingBox");
searchingIcon.addEventListener("click", () => {
  document.querySelector("audio").play();
  searchingBox.classList.toggle("active");
  document
    .querySelector(".searchingBox .inputSearch")
    .classList.toggle("inert");
  document.querySelector(".searchingBox .inputSearch input").focus();
  document.querySelector(".searchingBox .filtering").classList.toggle("inert");
});
console.log(searchingBox);

document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("inputSearch") &&
    !e.target.classList.contains("fa-search") &&
    !e.target.classList.contains("Sinput")
  ) {
    if (searchingBox.classList.contains("active")) {
      searchingBox.classList.toggle("active");
      document
        .querySelector(".searchingBox .inputSearch")
        .classList.toggle("inert");
      document
        .querySelector(".searchingBox .filtering")
        .classList.toggle("inert");
    }
  }
});

let dlMode = document.querySelector("header .searchingBW .dl-mode");
dlMode.addEventListener("click", () => {
  document.querySelector("audio").play();
  dlMode.classList.toggle("D");
  dlMode.classList.toggle("L");
  if (dlMode.classList.contains("D")) {
    document.documentElement.style.setProperty(
      "--dominant1-wmode-color",
      "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--dominant1-bmode-color",
      "#030712"
    );
    localStorage.setItem("L", "#ffffff");
    localStorage.setItem("D", "#030712");

    localStorage.setItem("D-icon", "D");
    localStorage.removeItem("L-icon");
  } else {
    document.documentElement.style.setProperty(
      "--dominant1-bmode-color",
      "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--dominant1-wmode-color",
      "#030712"
    );
    localStorage.setItem("D", "#ffffff");
    localStorage.setItem("L", "#030712");

    localStorage.setItem("L-icon", "L");
    localStorage.removeItem("D-icon");
  }
});
// responsive nav links..
let hamburger = document.querySelector("#nav-icon1");
let navLinks = document.querySelector("header ul");
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  e.currentTarget.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.addEventListener("click", (e) => {
  e.stopPropagation;
});

let links = document.querySelectorAll("header ul li a");
let activeBody = document.querySelector("body").classList.item(0);
let activeLink = null ;
for (let i = 0; i < links.length; i++) {
  if(links[i].textContent == activeBody){
    activeLink = links[i];
    break;
  }
  
}
activeLink.parentElement.classList.add("active")
