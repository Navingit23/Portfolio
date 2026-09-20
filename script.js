const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Men's T-Shirt",
        category: "Fashion",
        price: 699,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },

    {
        id: 4,
        name: "Women's Handbag",
        category: "Accessories",
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "Shoes",
        price: 1899,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 6,
        name: "Sunglasses",
        category: "Accessories",
        price: 599,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },

    {
        id: 7,
        name: "Smartphone",
        category: "Electronics",
        price: 15999,
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },

    {
        id: 8,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1799,
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    }

];




let cart =
    JSON.parse(localStorage.getItem("cart")) || [];




let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];




function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML =
            "<h3>No products found</h3>";

        return;
    }

    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img src="${product.image}"
                 alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <p class="price">
                ₹${product.price}
            </p>

            <div class="product-buttons">

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

                <button
                    class="wishlist"
                    onclick="addToWishlist(${product.id})">

                    ❤️

                </button>

            </div>

        `;

        container.appendChild(card);

    });
}




function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    const existingProduct =
        cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(product.name + " added to cart!");
}




function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}




function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById(
        "cartCount"
    ).textContent = count;
}




function showCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "block";

    displayCart();
}



function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById(
            "cartTotal"
        ).textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>
                <strong>${item.name}</strong>

                <p>₹${item.price}</p>
            </div>

            <div class="quantity">

                <button
                    onclick="changeQuantity(
                        ${item.id}, -1
                    )">

                    -

                </button>

                ${item.quantity}

                <button
                    onclick="changeQuantity(
                        ${item.id}, 1
                    )">

                    +

                </button>

            </div>

            <button
                class="remove"
                onclick="removeFromCart(${item.id})">

                Remove

            </button>

        `;

        cartItems.appendChild(div);

    });

    document.getElementById(
        "cartTotal"
    ).textContent = total;
}




function changeQuantity(id, change) {

    const item =
        cart.find(product => product.id === id);

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== id
            );
    }

    saveCart();

    updateCartCount();

    displayCart();
}



function removeFromCart(id) {

    cart =
        cart.filter(
            product => product.id !== id
        );

    saveCart();

    updateCartCount();

    displayCart();
}




function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";
}




function addToWishlist(id) {

    const product =
        products.find(item => item.id === id);

    const exists =
        wishlist.some(item => item.id === id);

    if (!exists) {

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlistCount();

        alert(
            product.name +
            " added to wishlist!"
        );

    } else {

        alert(
            "Product already in wishlist."
        );
    }
}




function updateWishlistCount() {

    document.getElementById(
        "wishlistCount"
    ).textContent = wishlist.length;
}



function showWishlist() {

    document.getElementById(
        "wishlistModal"
    ).style.display = "block";

    const container =
        document.getElementById("wishlistItems");

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML =
            "<p>Your wishlist is empty.</p>";

        return;
    }

    wishlist.forEach(product => {

        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        ₹${product.price}
                    </p>

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        `;
    });
}




function closeWishlist() {

    document.getElementById(
        "wishlistModal"
    ).style.display = "none";
}




document.getElementById(
    "searchInput"
).addEventListener(
    "input",
    function () {

        const searchValue =
            this.value.toLowerCase();

        const filteredProducts =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(searchValue)
            );

        displayProducts(filteredProducts);

    }
);




function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

    } else {

        const filtered =
            products.filter(
                product =>
                    product.category === category
            );

        displayProducts(filtered);
    }
}




function scrollToProducts() {

    document.getElementById(
        "productsSection"
    ).scrollIntoView({
        behavior: "smooth"
    });
}




function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    closeCart();

    document.getElementById(
        "checkoutModal"
    ).style.display = "block";
}



function closeCheckout() {

    document.getElementById(
        "checkoutModal"
    ).style.display = "none";
}




function placeOrder(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "customerName"
        ).value;

    alert(
        "Thank you " +
        name +
        "! Your order has been placed successfully."
    );

    cart = [];

    saveCart();

    updateCartCount();

    closeCheckout();

    event.target.reset();
}




displayProducts(products);

updateCartCount();

updateWishlistCount();