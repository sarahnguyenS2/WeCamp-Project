const totalContainer = document.querySelector(".cart-total")
const cartQuantity = document.querySelector(".cart-quantity")

const cartDetail = JSON.parse(localStorage.getItem("cartDetails"))

const cart = cartDetail.cartItems
const subtotal = cartDetail.subtotal.toFixed(2)
const tax = cartDetail.tax.toFixed(2)
const shipping = cartDetail.shipping.toFixed(2)
const total = cartDetail.total.toFixed(2)
const totalQuantity = cartDetail.totalQuantity;

var cartTotalDiv = document.querySelector(".cart-total");
var cartTotalsElement = document.createElement("div");
cartTotalsElement.classList.add("totals")
cartTotalsElement.innerHTML = `
  <h3>Cart Totals</h3>
  <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">$${subtotal}</div>
  </div>
  <div class="totals-item">
      <label>Tax (10%)</label>
      <div class="totals-value" id="cart-tax">$${tax}</div>
  </div>
  <div class="totals-item">
      <label class="shipping">Shipping</label>
      <div class="totals-value" id="cart-shipping">$${shipping}</div>
  </div>
  <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">$${total}</div>
  </div>
`;
var submitButton = document.querySelector(".checkout");
cartTotalDiv.insertBefore(cartTotalsElement, submitButton);
cartQuantity.innerHTML = `<span class="cart-quantity" style="font-weight:normal">[${totalQuantity}]</span>`

submitButton.addEventListener("click", () => {
    validateForm();
})

function validateForm() {
    var form = document.querySelector(".checkout-form");
    var inputs = form.getElementsByTagName("input[required]");
    var isEmpty = false;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) {
      alert("Please fill in all the required fields.");
    } else {
      form.submit();
      window.location.assign("order.html")
    }
  }