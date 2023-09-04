import { categories, products } from "./productsData.js";

export const createCard = (array) => {
  const listAlbums = document.querySelector(".list__albums");
  const card = document.createElement("li");
  const img = document.createElement("img");
  const divDescription = document.createElement("div");
  const band = document.createElement("h3");
  const year = document.createElement("h3");
  const title = document.createElement("h2");
  const divPriceButton = document.createElement("div");
  const price = document.createElement("h2");
  const buttonBuy = document.createElement("button");

  const category = document.createElement("p");
  const id = document.createElement("p");

  listAlbums.classList.add("list__albums");
  card.classList.add("list__card");
  img.classList.add("card__img");
  divDescription.classList.add("card__divDescription");
  band.classList.add("card__band");
  year.classList.add("card__year");
  title.classList.add("card__title");
  divPriceButton.classList.add("div__price-button");
  price.classList.add("card__price");
  buttonBuy.classList.add("card__button");

  img.src = array.img;
  band.innerText = array.band;
  year.innerText = array.year;
  title.innerText = array.title;
  buttonBuy.innerHTML = "Comprar";
  price.innerText = `R$${array.price.toFixed(2)}`;
  category.innerText = array.category;
  id.dataset.buttonBuy = array.id;

  listAlbums.appendChild(card);
  card.append(img, divDescription, title, divPriceButton);
  divDescription.append(band, year);
  divPriceButton.append(price, buttonBuy);

  return card;
};

export const renderProducts = (array) => {
  const listAlbums = document.querySelector(".list__albums");
  listAlbums.innerHTML = "";
  array.forEach((product) => {
    createCard(product);
  });
};

export function filter(array) {
  const buttonsSelect = document.querySelectorAll(
    ".container > .div__buttons > button"
  );
  let filterProducts = [];

  buttonsSelect.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const categoryID = categories.indexOf(button.textContent);

      if (categoryID === 0) {
        filterProducts = products;
      } else {
        filterProducts = array.filter((product) => {
          return product.category === categoryID;
        });
      }
      renderProducts(filterProducts);
      filterPrice(filterProducts);
    });
  });
}

export const filterPrice = (array) => {
  const input = document.querySelector(".input__range");
  const filterTitle = document.querySelector(".filter__title");

  input.value = 89;
  input.addEventListener("input", () => {
    const maxPrice = parseFloat(input.value).toFixed(2);
    filterTitle.textContent = "Até R$" + maxPrice;
    const filterProducts = array.filter((product) => {
      return product.price <= maxPrice;
    });
    renderProducts(filterProducts);
  });
};
