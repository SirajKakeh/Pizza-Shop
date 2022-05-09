const pizzas = {
  classic: {
    name: "Classic Pizza",
    price: 13.95,
  },
  pesto: {
    name: "Pesto Pizza",
    price: 17.95,
  },
  marg: {
    name: "Margherita Pizza",
    price: 15.95,
  },
};

const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
const cartAmountEl = document.getElementById("cart-amount");
const cartTotalPriceEl = document.getElementById("cart-price-total");
const cartModalItems = document.querySelector(".cart-modal-items");
const cartModaltotal = document.getElementById("modal-total");

for (var i = 0; i < addToCartButtons.length; i++) {
  const button = addToCartButtons[i];
  button.addEventListener("click", function (event) {
    const buttonId = event.target.id;
    const pizza = pizzas[buttonId];

    // add to cart button
    addToCartButton(pizza);

    // add Pizza to modal
    addToCartModal(pizza);
  });
}

function addToCartButton(pizza) {
  cartAmountEl.innerHTML = Number(cartAmountEl.innerHTML) + 1;
  const totalPrice = Number(cartTotalPriceEl.innerHTML) + pizza.price;
  const totalPriceRounded = limitDigits(totalPrice);
  cartTotalPriceEl.innerHTML = totalPriceRounded;
}

function addToCartModal(pizza) {
  const isPizzaAdded = cartModalItems.innerHTML.includes(pizza.name);
  if (isPizzaAdded) {
    const pizzaId = getPizzaId(pizza.name);
    const pizzaItem = document.getElementById(pizzaId);
    pizzaItem.value = Number(pizzaItem.value) + 1;
  } else {
    cartModalItems.innerHTML =
      cartModalItems.innerHTML + getCartItemDiv(pizza.name);
  }
  const total = Number(cartModaltotal.innerHTML) + pizza.price;
  cartModaltotal.innerHTML = limitDigits(total);
}

function getCartItemDiv(pizzaName) {
  const pizzaId = getPizzaId(pizzaName);
  const increasButtonId = getIncButtonId(pizzaName);
  const decreasButtonId = getDecButtonId(pizzaName);

  return `<div class="cart-modal-item d-flex align-items-center">
    <span class="fw-bold">${pizzaName}</span>
    <div class="ms-auto">
      <button
        type="button"
        class="btn btn-light"
        id="${increasButtonId}"
        onclick="handleIncOnClick('${pizzaId}')"
      >+</button>
      <input
        required
        value="1"
        placeholder="1"
        size="2"
        class="text-center border border-light"
        id="${pizzaId}"
      />
      <button
        type="button"
        class="btn btn-light"
        id="${decreasButtonId}"
        onclick="handleDecOnClick('${pizzaId}')"
      >-</button>
    </div>
  </div>`;
}

function getPizzaId(pizzaName) {
  return pizzaName.toLowerCase().replace(" ", "-");
}
function getIncButtonId(pizzaName) {
  return getPizzaId(pizzaName) + "-inc";
}
function getDecButtonId(pizzaName) {
  return getPizzaId(pizzaName) + "-dec";
}

function handleIncOnClick(pizzaId) {
  const input = document.getElementById(pizzaId);
  input.value = Number(input.value) + 1;
  addToModalTotal(pizzaId, "sum");
}
function handleDecOnClick(pizzaId) {
  const input = document.getElementById(pizzaId);
  const currentValue = input.value;
  if (Number(currentValue) > 0) {
    input.value = Number(input.value) - 1;
    addToModalTotal(pizzaId, "dec");
  }
}

function addToModalTotal(pizzaId, operationType) {
  const currentTotal = Number(cartModaltotal.innerHTML);
  var price;

  if (pizzaId === "pesto-pizza") {
    price = pizzas.pesto.price;
  } else if (pizzaId === "margherita-pizza") {
    price = pizzas.marg.price;
  } else {
    price = pizzas.classic.price;
  }

  if (operationType === "sum") {
    cartModaltotal.innerHTML = limitDigits(currentTotal + price);
  } else {
    cartModaltotal.innerHTML = limitDigits(currentTotal - price);
  }
}

function limitDigits(number) {
  return parseFloat(number.toFixed(2));
}
