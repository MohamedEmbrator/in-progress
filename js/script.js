// Settings Box
document.querySelector(".settings-box .settings-icon").onclick = () => {
  document.querySelector(".settings-box .icon").classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
const colors = document.querySelectorAll(".colors-list li");
let backgroundOption = true;
let backgroundInterval;
if (window.localStorage.getItem("main_color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("main_color")
  );
  document.documentElement.style.setProperty(
    "--main-color-alt",
    window.localStorage.getItem("main_color_alt")
  );
  colors.forEach((color) => {
    color.classList.remove("active");
    if (color.dataset.color === window.localStorage.getItem("main_color")) {
      color.classList.add("active");
    }
  });
}
colors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    document.documentElement.style.setProperty(
      "--main-color-alt",
      e.target.dataset.coloralt
    );
    window.localStorage.setItem("main_color", e.target.dataset.color);
    window.localStorage.setItem("main_color_alt", e.target.dataset.coloralt);
    colors.forEach((color) => {
      color.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
const randomBackgroundButtons = document.querySelectorAll(
  ".random-backgrounds span"
);
randomBackgroundButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    randomBackgroundButtons.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.classList.contains("on")) {
      backgroundOption = true;
      randomizeBackground();
      window.localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// Other
const btn = document.querySelector("header .container .btn");
const navigatinBar = document.querySelector("header .container .navigation ul");
let navigatin = document.getElementById("header");
const allLis = document.querySelectorAll("header .container .navigation ul li");
const scrollProgress = document.querySelector(".scroll-height");
const totalHeight = document.body.scrollHeight - window.innerHeight;
const scrollProgressDiv = document.querySelector(".scroll-height > div");

btn.addEventListener("click", function () {
  navigatinBar.classList.toggle("show");
});

allLis.forEach(function (e) {
  e.onclick = function () {
    navigatinBar.classList.remove("show");
  };
});

let scrollbtn = document.querySelector(".scroll");

window.onscroll = function () {
  if (window.scrollY >= 150) {
    navigatin.classList.add("fixed");
  } else {
    navigatin.classList.remove("fixed");
  }
  if (window.scrollY >= 600) {
    scrollbtn.style.display = "flex";
  } else {
    scrollbtn.style.display = "none";
  }
};

scrollbtn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
};

let copyRight = document.querySelector("footer .container .footer-title sub");

copyRight.innerHTML = new Date().getFullYear();

// Landing Image
const landing = document.querySelector(".landing .container .image img");
const imgs = ["landing-01.jpg", "landing-02.jpg", "landing-03.jpg"];
let backgroundOptionValue = window.localStorage.getItem("background_option");
if (backgroundOptionValue !== null) {
  if (backgroundOptionValue === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .on").click();
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .off").click();
  }
}
function randomizeBackground() {
  if (backgroundOption) {
    backgroundInterval = setInterval(function () {
      const randomNumber = Math.floor(Math.random() * imgs.length);
      landing.src = `imgs/${imgs[randomNumber]}`;
    }, 3000);
  }
}
randomizeBackground();
// Internet Connection
const onlineMessage = document.querySelector(".online");
const offlineMessage = document.querySelector(".offline");
let connectionButton = document.querySelectorAll(".close");

window.addEventListener("online", function () {
  onlineMessage.style.display = "flex";
  offlineMessage.style.display = "none";
  setTimeout(function () {
    if (onlineMessage.style.display === "flex") {
      onlineMessage.style.display = "none";
    } else {
      onlineMessage.style.display = "flex";
    }
  }, 10000);
});
window.addEventListener("offline", function () {
  onlineMessage.style.display = "none";
  offlineMessage.style.display = "flex";
});
connectionButton.forEach(function (el) {
  addEventListener("click", function () {
    el.parentElement.style.display = "none";
  });
});
// Drak Mode
const darkModeButtons = document.querySelectorAll(
  ".settings-box .dark-mode span"
);
let darkModeLocalStorage = window.localStorage.getItem("dark_mode");
if (darkModeLocalStorage != null) {
  document.body.classList.add("dark");
  darkModeButtons.forEach((el) => {
    el.classList.remove("active");
    document
      .querySelector(".settings-box .dark-mode .on")
      .classList.add("active");
  });
}
darkModeButtons.forEach((el) => {
  el.addEventListener("click", function (e) {
    darkModeButtons.forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.classList.contains("on")) {
      document.body.classList.add("dark");
      window.localStorage.setItem("dark_mode", "dark");
    } else {
      document.body.classList.remove("dark");
      window.localStorage.removeItem("dark_mode");
    }
  });
});
// Language Switch
const languageButtons = document.querySelectorAll(
  ".settings-box .language span"
);

languageButtons.forEach((el) => {
  el.addEventListener("click", function (e) {
    languageButtons.forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
  });
});
