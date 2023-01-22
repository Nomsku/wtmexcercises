const coursesEn = [
    "Hamburger, cream sauce and poiled potates",
    "Goan style fish curry and whole grain rice",
    "Vegan Chili sin carne and whole grain rice",
    "Broccoli puree soup, side salad with two napas",
    "Lunch baguette with BBQ-turkey filling",
    "Cheese / Chicken / Vege / Halloum burger and french fries",
  ];
  const coursesFi = [
    "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
    "Goalaista kalacurrya ja täysjyväriisiä",
    "vegaani Chili sin carne ja täysjyväriisi",
    "Parsakeittoa,lisäkesalaatti kahdella napaksella",
    "Lunch baguette with BBQ-turkey filling",
    "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset",
  ];
  
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
    for (const dish of menu) {
      const li = document.createElement("li");
      li.textContent = dish;
  
      list.appendChild(li);
    }
    menuText.append(list);
  };
  
  renderMenu(activeMenu);
  
  //Language change, 4
  const changeLan = (language) => {
    if (language === "fi") {
      lang = "fi";
      activeMenu = coursesFi;
    } else if (language === "en") {
      activeMenu = coursesEn;
    }
    lang = language;
    renderMenu(activeMenu);
  };
  
  const lanButton = document.querySelector("#language");
  
  lanButton.addEventListener("click", () => {
    if (lang === "fi") {
      changeLan("en");
    } else if (lang === "en") {
      changeLan("fi");
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
  const getRandomDish = (menu) => {
    const randomIndex = Math.floor(Math.random() * menu.length);
    return menu[randomIndex];
  };
  
  const randomButton = document.querySelector("#random");
  
  randomButton.addEventListener("click", () => {
    const dish = getRandomDish(activeMenu);
    const menuText2 = document.querySelector(".menuText2");
    menuText2.innerHTML = "";
    menuText2.append(dish);
  });