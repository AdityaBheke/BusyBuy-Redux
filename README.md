# Busy-Buy

Busy-Buy is a feature-rich e-commerce web application built using React, Redux Toolkit and Firebase. It provides users with a seamless shopping experience, including product filtering, order management, cart management and user authentication.

## Live Demo

[🔗 Live Preview](https://adityab-busybuy-redux.netlify.app/)

## Features

### 1. Home Page (`/`)
- **Product Display**: All products are fetched from Firebase and displayed on the homepage.
- **Search Functionality**: A search bar allows users to filter products in real-time based on input.
- **Advanced Filtering**:
  - A floating filter container is displayed when the filter button is clicked.
  - Users can filter products by:
    - Price range using a range slider.
    - Categories using checkboxes.

### 2. Orders Page (`/orders`)
- Displays all orders placed by the user.
- Orders are sorted with the newest order displayed at the top.

### 3. Cart Page (`/cart`)
- Displays all items in the user's cart.
- **Quantity Adjustment**:
  - Users can increase or decrease the quantity of items in the cart.
  - The grand total updates dynamically based on the cart contents.
- **Place Order**:
  - Clicking "Purchase" places the order, empties the cart, and redirects the user to the `/orders` page to view their order history.

### 4. Signup Page (`/signup`)
- A dedicated page for new users to create an account.

### 5. Signin Page (`/signin`)
- Allows existing users to log into their accounts.

## Technologies Used
- **React**: For building the user interface.
- **react-router-dom**: For handling page navigation.
- **Redux Toolkit**: For state management.
- **Firebase**: 
  - Firestore for real-time database and order storage.
  - Firebase Authentication for user sign-in and sign-up.
- **CSS**: For styling components.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaBheke/BusyBuy-Redux.git
   cd BusyBuy-Redux
2. Install dependecies:
    ```bash
    npm install
3. Start the development server
    ```bash
    npm start
## Usage

- Visit `/` to browse products, search, and apply filters.
- Navigate to `/orders` to view your order history.
- Add items to your cart, modify quantities, and place orders on `/cart`.
- Use `/signup` to create a new account and `/signin` to log in.


