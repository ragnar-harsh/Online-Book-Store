
# Online BookStore

## Overview
Online BookStore is a web application designed using Angular for the frontend and ASP.NET Core Web API for the backend. It provides a secure platform for users to browse, purchase, and manage books online with proper authentication and database integration using PostgreSQL.

## Features
- **User Authentication & Authorization**
  - Secure user registration and login.
  - Role-based access control (Admin, Customer, Seller).
  - JWT-based authentication for secure communication.
  
- **Book Management**
  - View and browse books by categories and authors.
  - Add books to cart and checkout securely.
  - Admin panel to manage books, categories, and orders.
  
- **Order & Payment System**
  - Place orders and track order history.
  - Secure payment gateway integration.
  - Order status notifications.
  
- **Database Integration**
  - PostgreSQL for secure and structured data storage.
  - Stores user data, books, transactions, and order history.
  
- **Security Measures**
  - CSRF protection and data encryption.
  - Secure API endpoints with authentication and authorization.
  
## Technologies Used
- **Frontend:** Angular
- **Backend:** ASP.NET Core Web API
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Payment Integration:** Stripe/PayPal (configurable)

## Installation & Setup
### Frontend (Angular)
1. **Clone the Angular repository**
   ```sh
   git clone https://github.com/your-username/Online-BookStore-Angular.git
   cd Online-BookStore-Angular
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the application**
   ```sh
   ng serve
   ```
   Access the application at `http://localhost:4200/`.

### Backend (ASP.NET Core Web API)
1. **Clone the API repository**
   ```sh
   git clone https://github.com/your-username/Online-BookStore-API.git
   cd Online-BookStore-API
   ```
2. **Restore dependencies**
   ```sh
   dotnet restore
   ```
3. **Update database** (Ensure PostgreSQL is configured)
   ```sh
   dotnet ef database update
   ```
4. **Run the API server**
   ```sh
   dotnet run
   ```
   API available at `http://localhost:5000/`.

## Usage
- Users can register and log in to browse books.
- Admin can manage books, categories, and orders.
- Customers can add books to cart and make secure purchases.
- Orders are processed and tracked via the user dashboard.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the MIT License.

---
Made with ❤️ using Angular & ASP.NET Core.

