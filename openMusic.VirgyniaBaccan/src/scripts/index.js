import { products } from "./productsData.js";
import { renderProducts, filter, filterPrice } from "./render.js";
import { changeTheme } from "./theme.js";

renderProducts(products)
filter(products)
filterPrice(products)
changeTheme()