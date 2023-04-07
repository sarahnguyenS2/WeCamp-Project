const cartContainer = document.querySelector(".cart-detail");
const cartTable = document.querySelector("#cart");
const cartTotalContainer = document.querySelector(".cart-total");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartQuantity = document.querySelector(".cart-quantity");

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   Update product quantity into cart icon
  let totalQuantity = 0;
  cart.forEach((product) => {
    totalQuantity += parseInt(product.quantity);
  });
  cartQuantity.innerHTML = `<span class="cart-quantity" style="font-weight:normal">[${totalQuantity}]</span>`;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty">Your cart is empty</p>`;
    cartTotalContainer.classList.add("hide");
    return;
  } else {
    cartTotalContainer.classList.remove("hide")
  }
  cartTable.innerHTML = `
    <tr>
        <th class="image"></th>
        <th class="product-name">Product name</th>
        <th class="price">Price</th>
        <th class="quantity">Quantity</th>
        <th class="total">Total</th>
        <th class="button"></th>
    </tr>
    `;
  cart.forEach((product, index) => {
    const newRow = cartTable.insertRow();
    newRow.innerHTML = `
        <td class="image"><img src="${product.img}" alt="" srcset=""></td>
        <td class="product-name">${product.name}</td>
        <td class="price">$${product.price}</td>
        <td class="quantity"><input type="number" value="${
          product.quantity
        }" min="1" onchange="updateQuantity(${index}, this.value)"></td>
        <td class="total">$${(product.price * product.quantity).toFixed(2)}</td>
        <td class="button"><i class="fa-solid fa-xmark" style="color: #82ae46;" onclick="removeFromCart(${
          product.id
        })"></i></td>
      `;
  });

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = 15.0;
  const total = subtotal + tax + shipping;

  const totalsHtml = `
    <div class="totals">
      <div class="totals-item">
        <label>Subtotal</label>
        <div class="totals-value" id="cart-subtotal">$${subtotal.toFixed(
          2
        )}</div>
      </div>
      <div class="totals-item">
        <label>Tax (10%)</label>
        <div class="totals-value" id="cart-tax">$${tax.toFixed(2)}</div>
      </div>
      <div class="totals-item">
        <label>Shipping</label>
        <div class="totals-value" id="cart-shipping">$${shipping.toFixed(
          2
        )}</div>
      </div>
      <div class="totals-item totals-item-total">
        <label>Grand Total</label>
        <div class="totals-value" id="cart-total">$${total.toFixed(2)}</div>
      </div>
    </div>
    <button class="checkout">Checkout</button>
  `;

  cartTotalContainer.innerHTML = totalsHtml;
}

displayCart();

// Remove product from cart
function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((product) => product.id === id);
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Update input quantity
function updateQuantity(index, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Check if user has logged in
const checkoutButton = document.querySelector(".checkout");
checkoutButton.addEventListener("click", () => {
  const user = sessionStorage.getItem("loginEmail")
  if(user) {
    window.location.assign("checkout.html")
  } else {
    window.location.assign("login.html")
  }
})
