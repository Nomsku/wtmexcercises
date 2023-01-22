import Menu from './sodexo.json';
// console.log('menu from json', Menu);

const coursesEn = Object.values(Menu.courses).map((course) => course.title_en);
const coursesFi = Object.values(Menu.courses).map((course) => course.title_fi);

let lang = "fi";
let activeMenu = coursesFi;
/**
 * renders menu content to html page
 * @param {*} menu - array of courses
 */
// Menu renderin, 3
const renderMenu = (menu) => {
  const menuText = document.querySelector(".menuText");
  menuText.innerHTML = "";
  const list = document.createElement("ul");
  for (const meal of menu) {
    const listItem = document.createElement("li");
    listItem.textContent = meal;

    list.appendChild(listItem);
  }
  menuText.append(list);
};

renderMenu(activeMenu);

//Language change, 4
const changeLanguage = (language) => {
  if (language === "fi") {
    lang = "fi";
    activeMenu = coursesFi;
  } else if (language === "en") {
    activeMenu = coursesEn;
  }
  lang = language;
  renderMenu(activeMenu);
};

const languageButton = document.querySelector("#language");

languageButton.addEventListener("click", () => {
  if (lang === "fi") {
    changeLanguage("en");
  } else if (lang === "en") {
    changeLanguage("fi");
  }
});

// Menu sortin, 5
const sortMenu = (menu, order = "asc") => {
  menu.sort();
  if (order === "desc") {
    menu.reverse();
  }
  return menu;
};
const sortButton = document.querySelector("#sort");

sortButton.addEventListener("click", () => {
  renderMenu(sortMenu(activeMenu));
});

//random dish, 6
const randomMeal = (menu) => {
  const random = Math.floor(Math.random() * menu.length);
  return menu[random];
};

const randomButton = document.querySelector("#random");

randomButton.addEventListener("click", () => {
  const meal = randomMeal(activeMenu);
  const menuText2 = document.querySelector(".menuText2");
  menuText2.innerHTML = "";
  menuText2.append(meal);
});