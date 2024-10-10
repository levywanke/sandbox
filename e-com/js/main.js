async function loadUserInfo() {
    try {
        const response = await fetch('http://localhost:3000/api/user');  // Adjust your endpoint
        const user = await response.json();
        document.getElementById('user-phone').textContent = user.phone;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-address').textContent = user.address;
    } catch (error) {
        console.error("Failed to load user info:", error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/categories');  // Adjust your endpoint
        const categories = await response.json();
        const categorySelect = document.getElementById('category-select');
        const footerCategories = document.getElementById('footer-categories');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.product_name;
            categorySelect.appendChild(option);

            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${category.product_name}</a>`;
            footerCategories.appendChild(li);
        });
    } catch (error) {
        console.error("Failed to load categories:", error);
    }
}

async function loadCart() {
    try {
        const response = await fetch('http://localhost:3000/api/cart');  // Adjust your endpoint
        const cartItems = await response.json();

        const cartList = document.getElementById('cart-list');
        const cartQty = document.getElementById('cart-qty');
        const cartSummary = document.getElementById('cart-summary');
        cartList.innerHTML = '';

        let totalQty = 0;
        let totalPrice = 0;

        cartItems.forEach(item => {
            totalQty += item.quantity;
            totalPrice += item.quantity * item.price;

            const cartItem = document.createElement('div');
            cartItem.className = "product-widget";
            cartItem.innerHTML = `
                <div class="product-img">
                    <img src="${item.image_url}" alt="${item.product_name}">
                </div>
                <div class="product-body">
                    <h3 class="product-name"><a href="#">${item.product_name}</a></h3>
                    <h4 class="product-price"><span class="qty">${item.quantity}x</span>$${item.price}</h4>
                </div>
                <button class="delete"><i class="fa fa-close"></i></button>
            `;
            cartList.appendChild(cartItem);
        });

        cartQty.textContent = totalQty;
        cartSummary.innerHTML = `
            <small>${totalQty} Item(s) selected</small>
            <h5>SUBTOTAL: $${totalPrice.toFixed(2)}</h5>
        `;
    } catch (error) {
        console.error("Failed to load cart:", error);
    }
}

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');  // Adjust your endpoint
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product';
            productItem.innerHTML = `
                <div class="product-img">
                    <img src="${product.image_url}" alt="${product.name}">
                </div>
                <div class="product-body">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name"><a href="#">${product.product_name}</a></h3>
                    <h4 class="product-price">$${product.price}</h4>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error("Failed to load products:", error);
    }
}

async function searchProducts() {
    const searchQuery = document.getElementById('search-input').value;
    const categoryId = document.getElementById('category-select').value;
    const endpoint = `http://localhost:3000/api/products?search=${searchQuery}&category=${categoryId}`;
    
    try {
        const response = await fetch(endpoint);  // Adjust your endpoint
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product';
            productItem.innerHTML = `
                <div class="product-img">
                    <img src="${product.image_url}" alt="${product.product_name}">
                </div>
                <div class="product-body">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name"><a href="#">${product.product_name}</a></h3>
                    <h4 class="product-price">$${product.price}</h4>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error("Failed to search products:", error);
    }
}

// Load everything when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadUserInfo();
    loadCategories();
    loadCart();
    loadProducts();
});