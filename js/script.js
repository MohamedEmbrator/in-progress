let users = ["rokaya", "mohamed"];
const username = document.querySelector(".container form > .input-field input");
const password = document.querySelector(
  ".container form > .input-field input[type='password']"
);
document.querySelector(".container.form .btn").onclick = function (e) {
  e.preventDefault();
  if (users.includes(username.value) && password.value === "rokaya20051002rokaya") {
    document.querySelector(".container.form").remove();
    document
      .querySelectorAll("section")
      .forEach((el) => (el.style.display = "block"));
    document.querySelector(".spikes").style.display = "block";
    document.getElementById("header").style.display = "block";
    document.querySelector("footer").style.display = "block";
    document.querySelector(".landing").style.display = "block";
    document.querySelector(".settings-box").style.display = "block";
    document.querySelector(".scroll-progress").style.display = "block";
  } else {
    document
      .getElementsByTagName("section")
      .forEach((el) => (el.style.display = "none"));
    document.querySelector(".spikes").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
    document.querySelector(".landing").style.display = "none";
    document.querySelector(".settings-box").style.display = "none";
    document.querySelector(".scroll-progress").style.display = "none";
    document.querySelector(".button.scroll-button").style.display = "none";
  }
};

// ------------------------------------------------------------------
const scrollButton = document.querySelector(".scroll-button");
const scrollProgressParentElement = document.querySelector(".scroll-progress");
const scrollProgress = document.querySelector(".scroll-progress div");
window.onscroll = () => {
  scrollProgressParentElement.style.display = "block";
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
  if (window.scrollY >= 600) {
    scrollButton.style.display = "flex";
  } else {
    scrollButton.style.display = "none";
  }
};
scrollButton.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
};
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
const allLis = document.querySelectorAll("header .container .navigation ul li");

btn.addEventListener("click", function () {
  navigatinBar.classList.toggle("show");
});

allLis.forEach(function (e) {
  e.onclick = function () {
    navigatinBar.classList.remove("show");
  };
});
document.addEventListener("click", function (event) {
  if (!navigatinBar.contains(event.target) && !btn.contains(event.target)) {
    navigatinBar.classList.remove("show");
  }
});
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

fetch(
  "https://www.googleapis.com/blogger/v3/blogs/2751603337577110409/posts?key=AIzaSyBMNdHAqDUMki47IJccq052xzmAW5ZYkzI"
)
  .then((result) => result.json())
  .then((data) => {
    data.items.forEach(function (post) {
      const articles = document.querySelector(".articles .container");
      const mainBox = document.createElement("div");
      mainBox.classList.add("box");
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");
      const firstImage = doc.querySelector("img");
      const img = document.createElement("img");
      img.setAttribute("alt", "Article Preview");
      img.src = firstImage ? firstImage.src : "imgs/landing-02.jpg";
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("content");
      const contentHeading = document.createElement("h3");
      contentHeading.innerHTML = post.title;
      const contentP = document.createElement("p");
      contentP.innerHTML = `Published: ${post.published.slice(
        0,
        10
      )} <br> Updated: ${post.updated.slice(0, 10)}`;
      contentDiv.append(contentHeading, contentP);
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info");
      infoDiv.onclick = function () {
        window.open(post.url, "_blank");
      };
      const infoLink = document.createElement("a");
      infoLink.setAttribute("target", "_blank");
      infoLink.href = post.url;
      infoLink.innerHTML = "Read More";
      const infoIcon = document.createElement("i");
      infoIcon.classList.add("fa-solid", "fa-arrow-right-long");
      infoDiv.append(infoLink, infoIcon);
      mainBox.append(img, contentDiv, infoDiv);
      articles.appendChild(mainBox);
    });
  });
