// MAIN E-COMMERCE LOGIC FILE

// ==========================
// Authentication & User Session Handling
// ==========================
const token = localStorage.getItem('auth_token');

function checkAuth() {
    if (!token) {
        window.location.href = '/login';
    }
}

// ==========================
// Cart Management
// ==========================
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.product_id === product.product_id);
    if (existingProduct) {
        existingProduct.quantity += 1;  // Increment the quantity
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(productId) {
    const updatedCart = cart.filter(item => item.product_id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountEl = document.getElementById('total-amount');
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.product_name} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.product_id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalAmount += item.price * item.quantity;
    });

    totalAmountEl.textContent = `Total: $${totalAmount.toFixed(2)}`;
}

// ==========================
// Product Search and Filtering
// ==========================
async function searchProducts(query) {
    const response = await fetch(`/api/products?search=${query}`);
    const products = await response.json();
    displayProducts(products);
}

async function filterProducts(filters) {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/products?${query}`);
    const products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-list');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.product_name}">
            <h3>${product.product_name}</h3>
            <p>$${product.price}</p>
            <button onclick="viewProductDetails(${product.product_id})">View Details</button>
            <button onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// ==========================
// Dynamic Product Page Loading
// ==========================
async function viewProductDetails(productId) {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();
    const productDetailsContainer = document.getElementById('product-details');

    productDetailsContainer.innerHTML = `
        <h1>${product.product_name}</h1>
        <img src="${product.image_url}" alt="${product.product_name}">
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
        <h3>Related Products</h3>
        <div id="related-products"></div>
    `;

    loadRelatedProducts(productId);
}

async function loadRelatedProducts(productId) {
    const response = await fetch(`/api/products/${productId}/related`);
    const relatedProducts = await response.json();
    const relatedProductsContainer = document.getElementById('related-products');
    relatedProductsContainer.innerHTML = '';

    relatedProducts.forEach(product => {
        const relatedProductElement = document.createElement('div');
        relatedProductElement.classList.add('related-product-item');
        relatedProductElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.product_name}">
            <h4>${product.product_name}</h4>
            <p>$${product.price}</p>
            <button onclick="viewProductDetails(${product.product_id})">View</button>
        `;
        relatedProductsContainer.appendChild(relatedProductElement);
    });
}

// ==========================
// User Profile & Orders Management
// ==========================
async function loadUserProfile() {
    const response = await fetch('/api/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const user = await response.json();
    document.getElementById('user-name').textContent = user.full_name;
    document.getElementById('user-email').textContent = user.email;
    loadUserOrders();
}

async function loadUserOrders() {
    const response = await fetch('/api/user/orders', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const orders = await response.json();
    const ordersContainer = document.getElementById('user-orders');
    ordersContainer.innerHTML = '';

    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
            <h4>Order #${order.order_id}</h4>
            <p>Status: ${order.order_status}</p>
            <p>Total: $${order.total_amount}</p>
            <button onclick="viewOrderDetails(${order.order_id})">View Details</button>
        `;
        ordersContainer.appendChild(orderElement);
    });
}

async function viewOrderDetails(orderId) {
    const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const order = await response.json();
    const orderDetailsContainer = document.getElementById('order-details');

    orderDetailsContainer.innerHTML = `
        <h2>Order #${order.order_id}</h2>
        <p>Order Status: ${order.order_status}</p>
        <p>Total Amount: $${order.total_amount}</p>
        <h3>Order Items</h3>
        <ul>
            ${order.items.map(item => `
                <li>${item.product_name} x ${item.quantity} - $${item.unit_price}</li>
            `).join('')}
        </ul>
    `;
}

// ==========================
// Product Reviews and Ratings
// ==========================
async function submitReview(productId, rating, reviewText) {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
            product_id: productId,
            rating,
            review_text: reviewText
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        loadProductReviews(productId);
    } else {
        alert('Failed to submit review');
    }
}

async function loadProductReviews(productId) {
    const response = await fetch(`/api/products/${productId}/reviews`);
    const reviews = await response.json();
    const reviewsContainer = document.getElementById('product-reviews');
    reviewsContainer.innerHTML = '';

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        reviewElement.innerHTML = `
            <p><strong>${review.user_name}</strong>: ${review.rating} stars</p>
            <p>${review.review_text}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

// ==========================
// Payment & Checkout Process
// ==========================
async function checkout() {
    const paymentDetails = {
        cart,
        shippingAddress: document.getElementById('shipping-address').value,
        paymentMethod: document.getElementById('payment-method').value
    };

    const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify(paymentDetails),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert('Checkout successful!');
        localStorage.removeItem('cart'); // Clear cart after successful checkout
        window.location.href = '/orders';
    } else {
        alert('Checkout failed');
    }
}

// ==========================
// Global Search and Navigation
// ==========================
document.getElementById('search-bar').addEventListener('input', (e) => {
    searchProducts(e.target.value);
});

