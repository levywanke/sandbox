# E-Com



## Table of Contents

- [Installation](#installation)
- [Database Structure](#database-structure)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [License](#license)



## Installation

To get started, you need to have Node.js, PostgreSQL, and npm installed on your machine.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/e-com.git
   cd e-com
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up PostgreSQL Database**:
   - Make sure PostgreSQL is installed and running.
   - Create a database named `commerce`.
   - Run the provided SQL script (`ecom_schema.sql`) to set up the necessary tables.
   
   ```sql
   CREATE DATABASE commerce;
   \c commerce
 
   ```

4. **Configure Database Credentials**:
   In the `main.js` file, ensure the database credentials are correctly configured to match your PostgreSQL setup:
   ```javascript
   const pool = new Pool({
       user: 'postgres',
       host: 'localhost',
       database: 'commerce',
       password: 'yourpassword',
       port: 5432,
   });
   ```

5. **Start the Server**:
   ```bash
   npm start
   ```

6. **Access the Application**:
   Open your browser and go to `http://localhost:3000`.

---

## Database Structure

The PostgreSQL database consists of the following tables:

- `users`: Stores user information such as usernames, emails, passwords, and roles.
- `products`: Holds product details like name, description, price, stock, and category.
- `categories`: Defines product categories for better product filtering.
- `orders`: Captures user orders including shipping and payment details.
- `order_items`: Manages items in a specific order.
- `payments`: Handles payment information for orders.
- `shopping_carts`: Temporary cart data for users before checkout.
- `cart_items`: Products added to the shopping cart.
- `reviews`: Stores user reviews and ratings for products.
- `shipping`: Manages order shipping details.
- `discounts`: Stores discount/coupon information.
- `inventory`: Tracks stock levels for products.
- `wishlists` and `wishlist_items`: Manages users' wishlists and items.
- `admins`: Stores admin users' details and their roles.

Refer to the SQL schema for the exact table structure and relationships.

---

## Features

### User Features
- **User Authentication**: Registration, login, and user session handling.
- **Product Search & Filtering**: Search for products based on keywords and filter them by categories.
- **Shopping Cart**: Add products to the cart, view the cart, and remove items.
- **Checkout Process**: User completes an order with payment and shipping details.
- **Product Reviews**: Submit reviews and ratings for products.
- **Order Management**: View past orders and track shipping details.
- **Wishlists**: Add products to wishlists for later purchase.

### Admin Features
- **Product Management**: Add, edit, and remove products.
- **Category Management**: Manage product categories.
- **Order Management**: View and update order statuses.
- **User Management**: Manage customer accounts.

---

## Usage

### Running the Server

```bash
npm start
```

This will run the server at `http://localhost:3000`.

### Frontend Functionality

1. **Homepage**: Displays a list of products pulled from the database.
2. **Product Details Page**: Shows detailed information about a product and related products.
3. **Search**: Provides a search bar for finding products by name or category.
4. **Cart**: Manage the items added to the cart and proceed to checkout.
5. **Checkout**: Fill in shipping details and choose a payment method for the order.

---

## API Endpoints

### Authentication

- **POST** `/api/register`: Register a new user.
- **POST** `/api/login`: Authenticate a user.

### Products

- **GET** `/api/products`: Fetch all products.
- **GET** `/api/products/:productId`: Get details of a specific product.
- **GET** `/api/products?search=keyword`: Search for products.
- **GET** `/api/products/:productId/related`: Get related products.
  
### Cart

- **POST** `/api/cart`: Add product to cart.
- **GET** `/api/cart`: Get current user's cart.
- **DELETE** `/api/cart/:cartItemId`: Remove item from cart.

### Orders

- **POST** `/api/orders`: Create a new order.
- **GET** `/api/orders`: Get all orders for the current user.

### Reviews

- **POST** `/api/reviews`: Submit a review for a product.
- **GET** `/api/products/:productId/reviews`: Fetch reviews for a product.



## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

