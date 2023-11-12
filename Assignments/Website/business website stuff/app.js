// JavaScript functionality
var products = [];
var currentPage = 0;
var productsPerPage = 30;
var cartItems = [];
var cartTotal = 0;

function addToCart(productName, price) {
    var existingItem = cartItems.find(item => item.name === productName);
    
    if (existingItem) {
        // Item already exists in the cart, increase quantity
        existingItem.quantity++;
    } else {
        // Item does not exist in the cart, add it
        cartItems.push({ name: productName, price: price, quantity: 1 });
    }
    
    cartTotal += price;

    var cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${cartItems[i].name}</span>
            <span>Quantity: ${cartItems[i].quantity}</span>
            <span>$${(cartItems[i].price * cartItems[i].quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${i})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    }

    var cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.innerText = cartTotal.toFixed(2);
}

function removeFromCart(index, removeAll) {
    var removedItem = cartItems[index];
    
    if (removeAll) {
        // Remove all items of the selected type
        cartTotal -= removedItem.price * removedItem.quantity;
        cartItems = cartItems.filter(item => item.name !== removedItem.name);
    } else {
        // Remove a single item of the selected type
        removedItem.quantity--;
        cartTotal -= removedItem.price;
        
        if (removedItem.quantity === 0) {
            // If the quantity reaches zero, remove the item from the cart
            cartItems.splice(index, 1);
        }
    }

    var cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${cartItems[i].name}</span>
            <span>Quantity: ${cartItems[i].quantity}</span>
            <span>$${(cartItems[i].price * cartItems[i].quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${i}, false)">Remove</button>
            <button onclick="removeFromCart(${i}, true)">Remove All</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    }

    var cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.innerText = cartTotal.toFixed(2);
}

var cartItemsContainer = document.getElementById("cart-items");
cartItemsContainer.innerHTML = "";

for (var i = 0; i < cartItems.length; i++) {
    var cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <span>${cartItems[i].name}</span>
        <span>Quantity: ${cartItems[i].quantity}</span>
        <span>$${(cartItems[i].price * cartItems[i].quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${i}, false)">Remove</button>
        <button onclick="removeFromCart(${i}, true)">Remove All</button>
    `;
    cartItemsContainer.appendChild(cartItem);
}

var cartTotalElement = document.getElementById("cart-total");
cartTotalElement.innerText = cartTotal.toFixed(2);

function showProducts() {
    var productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    var startIndex = currentPage * productsPerPage;
    var endIndex = startIndex + productsPerPage;

    for (var i = startIndex; i < endIndex && i < products.length; i++) {
        var product = products[i];
        var productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        showProducts();
    }
}

function nextPage() {
    var totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        showProducts
        ();
    }
}

// Sample products data
products = [
    { name: "Product 1", image: "product1.jpg", description: "Description of Product 1", price: 10.99 },
    { name: "Product 2", image: "product2.jpg", description: "Description of Product 2", price: 15.99 },
    // Add more products here
];

// Show the initial set of products
showProducts();
