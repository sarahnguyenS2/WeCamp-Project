// const productButton = document.querySelector(".details")
// productButton.addEventListener("click", () => {
//     currentId = productButton.id;
//     console.log("hello")
//     // window.location.assign("product-detail.html");
// })

var searchParams = new URLSearchParams(window.location.search);

const productApi = `https://drab-plum-oyster-hat.cyclic.app/products/${searchParams.get(
  "id"
)}`;
const productContainer = document.querySelector(".product");
const addToCartButton = document.querySelector("button.add-to-cart");
let product;
fetch(productApi)
  .then((res) => res.json())
  .then((data) => {
    product = data;
    htmls = `
        <div class="product-image">
            <img src="${product.img}" alt="">
        </div>

        <div class="product-info">
            <h3>${product.title}</h3>
            <div class="rating">
                <div class="text-left">
                    <span>5.0</span>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="text-middle">
                    <span class="number">100</span>
                    <span class="text">Rating</span>
                </div>
                <div class="text-right">
                    <span class="number">500</span>
                    <span class="text">Sold</span>
                </div>
            </div>

            <div class="price">
                <h2>$${product.price}</h2>
            </div>

            <div class="description">
                <p>${product.description}</p>
            </div>

            <div class="input-group">
                <select name="size" id="size" class="size-control">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <div class="quantity">
                    <input type="button" value="-" class="descrease-btn buttons">
                    <input type="text" name="quantity" id="quantity" value="1" min="1">
                    <input type="button" value="+" class="increase-btn buttons">
                </div>
                <p class="amount">${product.quantity} available</p>
                <button type="submit" class="add-to-cart" onclick="addToCart()">Add to cart</button>
            </div>
        </div> 
        `;
    productContainer.innerHTML = htmls;
    //increase/decrease quantity
    const value = document.getElementById("quantity");
    console.log(value.value);
    let count = 0;
    const quantityBtn = document.querySelectorAll(".buttons");
    quantityBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const styles = e.currentTarget.classList;
        if (styles.contains("descrease-btn")) {
          if (count <= 1) {
            count = 1;
          } else {
            count--;
          }
        } else {
          count++;
        }
        value.value = count;
      });
    });
  });

function addToCart() {
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
}
