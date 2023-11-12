// Filter products based on the search input and price range
function filterProducts() {
    const searchInput = document.getElementById("searchInput");
    const filterValue = searchInput.value.toLowerCase();
  
    const priceRange = document.getElementById("priceRange").value;
  
    const products = document.querySelectorAll(".product");
  
    products.forEach((product) => {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      const productDescription = product.querySelector(".description").textContent.toLowerCase();
      const productPrice = product.querySelector(".price").textContent;
      const price = parseFloat(productPrice.substring(1)); // Remove the $ sign and convert to number
  
      const matchSearch = productName.includes(filterValue) || productDescription.includes(filterValue);
      const matchPrice =
        priceRange === "all" ||
        (priceRange === "0-20" && price <= 20) ||
        (priceRange === "20-50" && price > 20 && price <= 50) ||
        (priceRange === "50+" && price > 50);
  
      if (matchSearch && matchPrice) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  const productsPerPage = 6; // Number of products to display per page
  let currentPage = 1; // Current page
  let products = []; // Array to store product elements
  
  // Wait for the DOM to load
  document.addEventListener("DOMContentLoaded", () => {
    products = Array.from(document.querySelectorAll(".product")); // Retrieve all product elements
  
    displayProducts();
    updatePageNumbers();
  });
  
  // Display products based on the current page
  function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
  
    products.forEach((product, index) => {
      if (index >= startIndex && index < endIndex) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
  
  // Update the page number listing
  function updatePageNumbers() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageNumbersContainer = document.querySelector(".page-numbers");
  
    let pageNumbersHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      pageNumbersHTML += `<span class="page-number ${currentPage === i ? "active" : ""}" onclick="goToPage(${i})">${i}</span>`;
    }
  
    pageNumbersContainer.innerHTML = pageNumbersHTML;
  }
  
  // Go to a specific page
  function goToPage(page) {
    currentPage = page;
    displayProducts();
    updatePageNumbers();
  }

  // Go to the previous page
function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      displayProducts();
      updatePageNumbers();
    }
  }
  
  // Go to the next page
  function goToNextPage() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts();
      updatePageNumbers();
    }
  }
  
// Initialize an empty cart array to store added products
let cart = [];

// Get the cart count and cart icon elements
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');

// Listen for click events on the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the product information
    const product = button.parentNode;
    const id = product.dataset.id;
    const name = product.querySelector('.product-name').textContent;
    const price = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      existingProduct.quantity++;
    } else {
      // If the product doesn't exist in the cart, add it
      cart.push({
        id: id,
        name: name,
        price: price,
        quantity: 1
      });
    }

    // Update the cart count and display
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
  });
});

// Update the cart icon with the current count
cartIcon.addEventListener('click', () => {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  alert(`You have ${count} item(s) in your cart, with a total price of $${total.toFixed(2)}.`);
});
