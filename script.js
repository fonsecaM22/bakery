"use strict";

/* ========================================
   MOBILE NAVIGATION
======================================== */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    navToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
});


const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});


/* ========================================
   MENU FILTERING
======================================== */

const filterButtons =
    document.querySelectorAll(".filter-button");

const menuCards =
    document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        menuCards.forEach((card) => {

            const category =
                card.dataset.category;

            card.hidden =
                selectedCategory !== "all" &&
                category !== selectedCategory;
        });
    });
});


/* ========================================
   CART
======================================== */

const cart = [];

const cartButton =
    document.querySelector("#cart-button");

const cartPanel =
    document.querySelector("#cart-panel");

const cartClose =
    document.querySelector("#cart-close");

const cartOverlay =
    document.querySelector("#cart-overlay");

const cartItems =
    document.querySelector("#cart-items");

const cartCount =
    document.querySelector("#cart-count");

const cartTotal =
    document.querySelector("#cart-total");

const orderButtons =
    document.querySelectorAll(".order-button");


/* Open cart */

function openCart() {

    cartPanel.classList.add("open");

    cartOverlay.classList.add("show");

    cartPanel.setAttribute(
        "aria-hidden",
        "false"
    );

    cartButton.setAttribute(
        "aria-expanded",
        "true"
    );
}


/* Close cart */

function closeCart() {

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("show");
}


cartButton.addEventListener(
    "click",
    openCart
);

cartClose.addEventListener(
    "click",
    closeCart
);

cartOverlay.addEventListener(
    "click",
    closeCart
);


/* ========================================
   ADD ITEM
======================================== */

orderButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.item;

        const price =
            Number(button.dataset.price);

        const existingItem =
            cart.find((item) => item.name === name);


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name,
                price,
                quantity: 1
            });
        }


        updateCart();

        openCart();
    });
});


/* ========================================
   UPDATE CART
======================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "$0.00";

        return;
    }


    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>

                <p class="cart-item-price">
                    $${item.price.toFixed(2)}
                </p>
            </div>

            <div class="quantity-controls">

                <button
                    class="quantity-button"
                    type="button"
                    data-action="decrease"
                    data-index="${index}"
                    aria-label="Decrease ${item.name} quantity"
                >
                    −
                </button>

                <span class="quantity">
                    ${item.quantity}
                </span>

                <button
                    class="quantity-button"
                    type="button"
                    data-action="increase"
                    data-index="${index}"
                    aria-label="Increase ${item.name} quantity"
                >
                    +
                </button>

            </div>
        `;

        cartItems.appendChild(cartItem);
    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;
}


/* ========================================
   QUANTITY CONTROLS
======================================== */

cartItems.addEventListener("click", (event) => {

    const button =
        event.target.closest(".quantity-button");

    if (!button) {
        return;
    }


    const index =
        Number(button.dataset.index);

    const action =
        button.dataset.action;


    if (action === "increase") {

        cart[index].quantity++;

    } else if (action === "decrease") {

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }


    updateCart();
});


/* ========================================
   CHECKOUT
======================================== */

const checkoutButton =
    document.querySelector("#checkout-button");

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Checkout is coming soon! ☕🥐"
    );
});
