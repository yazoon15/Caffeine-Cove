//window.alert("can you listen to me");

const products = document.querySelectorAll(".gather");

const cartItems = document.querySelector(".cart-items");
const grandTotalElement = document.querySelector(".grand-total");
const clearCartButton = document.querySelector(".clear-cart");
const cartButton = document.getElementById("cart-button");
const cartPanel = document.querySelector(".cart");
const closeCart = document.getElementById("close-cart");
const cartCount = document.querySelector(".cart-count");




const cart = {};

// ====================
// Products
// ====================

products.forEach(product => {

    const plusButton = product.querySelector(".plus");
    const minusButton = product.querySelector(".minus");
    const quantityNumber = product.querySelector(".quantity-number");


    const name = product.querySelector(".details h3").textContent.trim();

    const price = parseFloat(
        product.querySelector(".details p").textContent.replace("$", "")
    );

    let quantity = 0;


    // PLUS
    plusButton.addEventListener("click", () => {

        quantity++;

        quantityNumber.textContent = quantity;

        cart[name] = {
            price: price,
            quantity: quantity
        };

        updateCart();

    });


    // MINUS
    minusButton.addEventListener("click", () => {

        if (quantity > 0) {

            quantity--;

            quantityNumber.textContent = quantity;


            if (quantity === 0) {

                delete cart[name];

            } else {
                cart[name].quantity = quantity;
            }

            updateCart();
        }
    });
});

if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {

        Object.keys(cart).forEach(name => {
            delete cart[name];
        });

        products.forEach(product => {
            product.querySelector(".quantity-number").textContent = "0";
        });

        updateCart();
    });
} 

// ====================
// Update Cart
// ====================

function updateCart() {

    // Clear cart display
    cartItems.innerHTML = "";

    // Start total from zero
    let grandTotal = 0;

    // Get all products from cart
    const items = Object.entries(cart);


    // If cart is empty
    if (items.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty
            </p>
        `;
    }

    // Display products
    items.forEach(([name, item]) => {

        const total = item.price * item.quantity;
        grandTotal += total;

        // inset remove button
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${name} × ${item.quantity}</span>
            <span>$${total.toFixed(2)}
            <button class="remove-item">×</button>
            </span>
        `;

        // remove 
        cartItems.appendChild(cartItem);
        const removeButton = cartItem.querySelector(".remove-item");
        removeButton.addEventListener("click", () => {
            delete cart[name];
            products.forEach(product => {
                const productName =
                    product.querySelector(".details h3").textContent.trim();
                if (productName === name) {
                    product.querySelector(".quantity-number").textContent = "0";
                }
            });

            updateCart();

        });
    });

    // Display grand total
    grandTotalElement.textContent = grandTotal.toFixed(2);


    let totalItems = 0;

Object.values(cart).forEach(item => {
    totalItems += item.quantity;
});

cartCount.textContent = totalItems;
}


if (cartButton && cartPanel) {
    cartButton.addEventListener("click", () => {
        cartPanel.classList.toggle("active");
    });
}

if (closeCart && cartPanel) {
    closeCart.addEventListener("click", () => {
        cartPanel.classList.remove("active");
    });
}


