const productSection = document.querySelector(".product-section");
const productContainer = document.querySelector(".product-container");
const btnContainer = document.querySelector(".btn-container");
const btnCategory = btnContainer.querySelectorAll(".btn-category");
const pagination = document.querySelector(".pagination");
const paginationList = document.querySelector(".pagination-list");
// console.log(paginationList);
const paginationA = paginationList.querySelectorAll("a");
// console.log(paginationA);

//category
function displayCategory(list) {
  const categories = list.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["All"]
  );

  btnCategory.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      Array.from(btnCategory).forEach((el) => el.classList.remove("active"));
      e.currentTarget.classList.add("active");
      let categoryId = e.currentTarget.dataset.id;
      // console.log(e.currentTarget);
      let menuCategory = list.filter((product) => {
        if (product.category === categoryId) {
          return product;
        }
      });
      if (categoryId === "All") {
        displayMenuProducts(list);
      } else {
        displayMenuProducts(menuCategory);
      }
    });
  });
}
//display slider
function displayMenuProductsSlider(list) {
  let items1 = list.slice(0, list.length / 2);
  let items2 = list.slice(list.length / 2, list.length);

  paginationA.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      paginationA.forEach((a) => {
        a.classList.remove("active");
      });
      a.classList.toggle("active");
      // console.log(a.dataset.page);
      if (a.dataset.page === "1") {
        displayMenuProducts(items1);
      } else {
        // a.classList.add("active");
        displayMenuProducts(items2);
      }
    });
  });
}
function displayMenuProducts(list) {
  let displayMenu = list
    .map((result) => {
      return `
      <div class="product-detail">
        <a href="#" class=""}
          ><img
            class="product-img"
            src=${result.img}
            alt=""
          />
        </a>
        <div class="product-text">
          <h3>${result.title}</h3>

          <div class="product-price">
            <span class="pricing">$${result.price}</span>
          </div>

          <div class="d-flex flex-justify product-icons">
            <a href="./detail.html?id=${result.id}" class="details">
              <i class="fa-solid fa-bars"></i>
            </a>
            <a class="add-to-cart" id="add-to-cart-${result.id}" data-id=${result.id} onclick="addToCart(${result.id})">
              <span><i class="fa-solid fa-cart-plus"></i></span>
            </a>
          </div>
        </div>
      </div>`;
    })
    .join("");
  productContainer.innerHTML = displayMenu;
}

const productApi = "https://drab-plum-oyster-hat.cyclic.app/products/";
fetch(productApi)
  .then((res) => res.json())
  .then((data) => {
    result = data;
    // displayMenuProducts(result);
    displayCategory(result);
    displayMenuProductsSlider(result);
    // result.forEach(disableAddToCart)
    document.getElementById("firstPage").click();
  });

// Add to cart function
function addToCart(productId) {
  const product = result.find((item) => item.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === product.id);
  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    const newProduct = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      img: product.img,
    };
    cart.push(newProduct);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  const cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
  const totalQuantity = cartDetails.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  cartDetails.totalQuantity = totalQuantity;
  localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
  calculateTotalQuantity();
}

// Update the quantity when click add to cart button
function calculateTotalQuantity() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce(
    (acc, item) => acc + parseInt(item.quantity),
    0
  );
  localStorage.setItem("totalQuantity", totalQuantity);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.innerHTML = `[${totalQuantity}]`;
    if (initialQuantity !== undefined) {
      cartCount.textContent = initialQuantity;
    }
  }
}
const initialTotalQuantity = localStorage.getItem("totalQuantity") || 0;
calculateTotalQuantity(initialTotalQuantity);

// Disable add to cart button when the quantity of product is 0
// function disableAddToCart(product) {
//   const quantity = product.quantity;
//   if (quantity === 0) {
//     const addToCartLink = document.getElementById(`add-to-cart-${product.id}`);
//     addToCartLink.classList.add("disabled");
//   }
// }
