document.addEventListener("DOMContentLoaded", function () {

    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");
    const closeCart = document.getElementById("close-cart");
    const cartOverlay = document.getElementById("cart-overlay");

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const cartCountElement = document.querySelector(".cart-count");

    const clearCartButton = document.getElementById("clear-cart");


    // Get cart from localStorage
    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];


    // =========================
    // OPEN CART
    // =========================

    if (cartButton && cart && cartOverlay) {

        cartButton.addEventListener("click", function () {

            cart.classList.add("active");
            cartOverlay.classList.add("active");

        });

    }


    // =========================
    // CLOSE CART
    // =========================

    function closeCartFunction() {

        if (cart) {
            cart.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

    }


    if (closeCart) {
        closeCart.addEventListener(
            "click",
            closeCartFunction
        );
    }


    if (cartOverlay) {
        cartOverlay.addEventListener(
            "click",
            closeCartFunction
        );
    }

    // =========================
    // PRODUCTS
    // =========================

    const products = document.querySelectorAll(".gather");


    products.forEach(function (product) {

        const plusButton = product.querySelector(".plus");
        const minusButton = product.querySelector(".minus");
        const quantityNumber = product.querySelector(".quantity-number");

        const nameElement = product.querySelector(".details h3");
        const priceElement = product.querySelector(".details p");


        if (!plusButton || !minusButton) {
            return;
        }


        const productName = nameElement.textContent.trim();

        const productPrice = parseFloat(
            priceElement.textContent.replace("$", "")
        );


        // =========================
        // PLUS
        // =========================

        plusButton.addEventListener("click", function () {

            let quantity = parseInt(quantityNumber.textContent);

            quantity++;

            quantityNumber.textContent = quantity;


            addToCart(
                productName,
                productPrice,
                quantity
            );

        });


        // =========================
        // MINUS
        // =========================

        minusButton.addEventListener("click", function () {

            let quantity = parseInt(quantityNumber.textContent);

            if (quantity > 0) {

                quantity--;

                quantityNumber.textContent = quantity;

                updateCartQuantity(
                    productName,
                    quantity
                );

            }

        });

    });


    // =========================
    // ADD TO CART
    // =========================

    function addToCart(name, price, quantity) {

        const existingItem = cartItems.find(
            item => item.name === name
        );


        if (existingItem) {

            existingItem.quantity = quantity;

        } else {

            cartItems.push({
                name: name,
                price: price,
                quantity: quantity
            });

        }


        updateCart();

    }


    // =========================
    // UPDATE QUANTITY
    // =========================

    function updateCartQuantity(name, quantity) {

        const item = cartItems.find(
            item => item.name === name
        );


        if (!item) {
            return;
        }


        if (quantity <= 0) {

            cartItems = cartItems.filter(
                item => item.name !== name
            );

        } else {

            item.quantity = quantity;

        }


        updateCart();

    }


    // =========================
    // UPDATE CART UI
    // =========================

    function updateCart() {

        cartItemsContainer.innerHTML = "";


        // Empty Cart

        if (cartItems.length === 0) {

            cartItemsContainer.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty
                </p>
            `;

        }


        let total = 0;
        let totalQuantity = 0;


        // Cart Items

        cartItems.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;

            totalQuantity += item.quantity;


            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");


            cartItem.innerHTML = `

    <div class="cart-item-info">

        <h3>${item.name}</h3>

        <p>
            $${item.price.toFixed(2)}
            ×
            ${item.quantity}
        </p>

    </div>

    <div class="cart-item-actions">

        <span class="cart-item-price">
            $${itemTotal.toFixed(2)}
        </span>

        <button class="delete-item" data-name="${item.name}">
            <i class="fa-solid fa-trash"></i>
        </button>

    </div>

`;
            cartItemsContainer.appendChild(cartItem);

            const deleteButton =
    cartItem.querySelector(".delete-item");

deleteButton.addEventListener("click", function () {

    const itemName = this.dataset.name;

    // حذف المنتج من السلة
    cartItems = cartItems.filter(
        item => item.name !== itemName
    );

    // تحديث كمية المنتج في Menu
    products.forEach(function (product) {

        const nameElement =
            product.querySelector(".details h3");

        const quantityNumber =
            product.querySelector(".quantity-number");

        if (
            nameElement &&
            nameElement.textContent.trim() === itemName
        ) {

            quantityNumber.textContent = "0";

        }

    });

    // تحديث السلة
    updateCart();

});

        });


        // Total

        cartTotalElement.textContent =
            `$${total.toFixed(2)}`;


        // Cart Count

        cartCountElement.textContent =
            totalQuantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    }


    // =========================
    // CLEAR CART
    // =========================

    clearCartButton.addEventListener("click", function () {

        cartItems = [];


        // Reset quantities on menu

        products.forEach(function (product) {

            const quantityNumber =
                product.querySelector(".quantity-number");

            if (quantityNumber) {

                quantityNumber.textContent = "0";

            }

        });


        updateCart();

    });
    updateCart();

});
