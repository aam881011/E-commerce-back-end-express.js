<div align="center">

# 🛒 E-Commerce API

### Advanced & Complete E-Commerce System

[![Node.js](https://img.shields.io/badge/Node.js-18.15.0-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_7.5.1-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-orange?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blue?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

<p align="center">
  <strong>🔐 RESTful API | 🚀 Production Ready | 📱 Scalable Architecture</strong>
</p>

[📖 Documentation](#documentation) • [🚀 Features](#features) • [⚡ Quick Start](#quick-start) • [📡 API](#api-endpoints)

</div>

---

## 🌟 Overview

**E-Commerce API** is an advanced and comprehensive solution providing all necessary features to build a professional e-commerce platform. Built with the latest technologies and best practices in backend development.

### ✨ What Makes This Project Stand Out

- 🏗️ **Advanced Software Architecture** - Clean Architecture & MVC Pattern
- 🔒 **High-Level Security** - JWT, bcrypt, validation, error handling
- 📊 **Complete Database System** - MongoDB with Mongoose ODM
- 💳 **Integrated Payment Gateway** - Stripe Payment Integration
- ☁️ **Smart Media Management** - Cloudinary + Multer
- 📝 **Complete API Documentation** - RESTful endpoints
- 🧪 **Advanced Error Handling** - Global Error Handling
- 🎯 **Flexible Permission System** - Role-based Access Control (RBAC)

---

## 🛠️ Technologies Used

### Core Stack
| Technology | Purpose |
|---------|----------|
| **Node.js** | JavaScript Runtime Environment |
| **Express.js** | Web Server Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | ODM for MongoDB |

### Authentication & Security
| Technology | Purpose |
|---------|----------|
| **JWT** | JSON Web Tokens for Authentication |
| **bcrypt** | Password Hashing |
| **Joi** | Data Validation |
| **CORS** | Cross-Origin Resource Sharing |

### Media & Storage
| Technology | Purpose |
|---------|----------|
| **Cloudinary** | Image Storage & Optimization |
| **Multer** | File Upload Middleware |
| **UUID** | Unique Identifier Generation |

### Payment & Utilities
| Technology | Purpose |
|---------|----------|
| **Stripe** | Payment Gateway |
| **QRCode** | QR Code Generation |
| **Slugify** | Clean URL Slugs |
| **Morgan** | HTTP Request Logger |

---

## 📦 Modules & Features

### 🔐 Authentication & Users
- ✅ User Registration with Password Hashing
- ✅ Login with JWT Token Generation
- ✅ Protected Routes with Middleware
- ✅ Multi-Role Permission System (User, Admin)
- ✅ Profile & Address Management

### 🏷️ Category Management
- ✅ Create/Update/Delete Categories
- ✅ Sub-category Support
- ✅ Product-Category Association
- ✅ SEO-Friendly Slug URLs

### 🏢 Brand Management
- ✅ Complete Brand System
- ✅ Brand-Product Association
- ✅ Logo Image Upload

### 📦 Product Management
- ✅ Full CRUD for Products
- ✅ Review & Rating System
- ✅ Inventory & Price Management
- ✅ Multiple Product Attributes
- ✅ Advanced Search & Filtering

### 🛒 Shopping Cart
- ✅ Add/Remove Products from Cart
- ✅ Calculate Total & Discounts
- ✅ Coupon Integration

### ❤️ Wishlist
- ✅ Save Favorite Products
- ✅ Move Products from Wishlist to Cart

### 🎟️ Coupon System
- ✅ Create Discount Coupons
- ✅ Percentage/Fixed Amount Discounts
- ✅ Coupon Expiry Dates
- ✅ Coupon Usage System

### 📍 Address Management
- ✅ Multiple Addresses per User
- ✅ Default Address Selection
- ✅ Shipping & Delivery Management

### 📦 Order System
- ✅ Create New Orders
- ✅ Track Order Status
- ✅ Stripe Payment Integration
- ✅ QR Code for Orders
- ✅ Calculate Discounts & Taxes

### ☁️ Media Management
- ✅ Multiple Product Images
- ✅ Automatic Image Optimization
- ✅ Cloudinary Integration

---

## 🏗️ Project Structure

```
E-commerce-back-end-express.js/
│
├── 📁 databases/
│   ├── 📁 models/          # Mongoose Models
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   └── ...
│   └── dbConnection.js      # MongoDB Connection
│
├── 📁 src/
│   ├── 📁 modules/          # All Feature Modules
│   │   ├── auth/            # Authentication
│   │   ├── user/            # User Management
│   │   ├── category/        # Categories
│   │   ├── subcategory/     # Sub-categories
│   │   ├── brand/           # Brands
│   │   ├── product/         # Products
│   │   ├── review/          # Reviews
│   │   ├── cart/            # Shopping Cart
│   │   ├── wishList/        # Wishlist
│   │   ├── coupon/          # Coupons
│   │   ├── address/         # Addresses
│   │   ├── order/           # Orders
│   │   └── bootstrap.js     # Route Bootstrap
│   │
│   ├── 📁 services/         # Business Services
│   │   └── multer/          # File Upload Service
│   │
│   ├── 📁 middleware/       # Custom Middleware
│   └── 📁 utils/            # Utilities
│       ├── App.Error.js     # Error Class
│       └── catchError.js    # Async Error Handler
│
├── 📁 uploads/              # Local Uploads
├── 📄 index.js             # Application Entry
├── 📄 package.json
└── 📄 .env                 # Environment Variables
```

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.15.0
MongoDB >= 5.0
```

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd back-end-route

# 2. Install Dependencies
npm install

# 3. Setup Environment Variables
# Create .env file and add:
PORT=3004
DB_CONNECTION=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=90d

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Config
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# 4. Run the server
npm start
```

### 🌐 Access the API
```
http://localhost:3004
```

---

## 📡 API Endpoints

### 🔐 Authentication
```
POST   /api/v1/auth/signup          # User Registration
POST   /api/v1/auth/login           # User Login
```

### 👤 Users
```
GET    /api/v1/users                # List Users (Admin)
GET    /api/v1/users/:id             # Get User Profile
PUT    /api/v1/users/:id             # Update User
DELETE /api/v1/users/:id             # Delete User
```

### 🏷️ Categories
```
GET    /api/v1/categories            # Get All Categories
POST   /api/v1/categories            # Create Category (Admin)
GET    /api/v1/categories/:id         # Get Single Category
PUT    /api/v1/categories/:id         # Update Category (Admin)
DELETE /api/v1/categories/:id         # Delete Category (Admin)
```

### 🏢 Brands
```
GET    /api/v1/brands                # Get All Brands
POST   /api/v1/brands                # Create Brand (Admin)
GET    /api/v1/brands/:id            # Get Single Brand
PUT    /api/v1/brands/:id            # Update Brand (Admin)
DELETE /api/v1/brands/:id            # Delete Brand (Admin)
```

### 📦 Products
```
GET    /api/v1/products              # Get All Products
POST   /api/v1/products              # Create Product (Admin)
GET    /api/v1/products/:id          # Get Single Product
PUT    /api/v1/products/:id           # Update Product (Admin)
DELETE /api/v1/products/:id           # Delete Product (Admin)
```

### ⭐ Reviews
```
POST   /api/v1/reviews                # Add Review
GET    /api/v1/reviews                # Get All Reviews
PUT    /api/v1/reviews/:id            # Update Review
DELETE /api/v1/reviews/:id            # Delete Review
```

### 🛒 Cart
```
POST   /api/v1/carts                 # Add to Cart
GET    /api/v1/carts                 # Get Cart
PUT    /api/v1/carts/:itemId         # Update Quantity
DELETE /api/v1/carts/:itemId         # Remove from Cart
```

### ❤️ Wishlist
```
POST   /api/v1/wishlist              # Add to Wishlist
GET    /api/v1/wishlist              # Get Wishlist
DELETE /api/v1/wishlist/:productId   # Remove from Wishlist
```

### 🎟️ Coupons
```
GET    /api/v1/coupons               # Get All Coupons
POST   /api/v1/coupons               # Create Coupon (Admin)
PUT    /api/v1/coupons/:id            # Update Coupon (Admin)
DELETE /api/v1/coupons/:id            # Delete Coupon (Admin)
```

### 📍 Address
```
POST   /api/v1/address                # Add Address
GET    /api/v1/address                # Get User Addresses
DELETE /api/v1/address/:id             # Delete Address
```

### 📦 Orders
```
POST   /api/v1/orders                 # Create Order
GET    /api/v1/orders                 # Get User Orders
GET    /api/v1/orders/:id             # Get Order Details
PUT    /api/v1/orders/:id/pay         # Pay Order (Stripe)
```

---

## 🔒 Security & Protection

### Implemented Security Features

| Feature | Implementation |
|---------|---------------|
| 🔐 **Password Hashing** | bcrypt with 12 salt rounds |
| 🎫 **JWT Authentication** | Secure tokens with Expiration |
| 🛡️ **Input Validation** | Joi Validation on all inputs |
| 🚫 **Rate Limiting** | Protection from repeated attacks |
| 🔒 **CORS Protection** | Cross-Origin Resource Management |
| 📝 **Error Handling** | Centralized error handling without data leakage |
| 🗑️ **NoSQL Injection** | Mongoose Schema Validation |

---

## 📊 Database Schema

### Collections Relationships

```
Users ||--o{ Reviews : writes
Users ||--o{ Orders : places
Users ||--o{ Cart : has
Users ||--o{ Wishlist : has
Users ||--o{ Address : has

Categories ||--o{ Subcategories : contains
Categories ||--o{ Products : categorizes

Subcategories ||--o{ Products : categorizes

Brands ||--o{ Products : manufactures

Products ||--o{ Reviews : receives
Products ||--o{ CartItems : included_in
Products ||--o{ OrderItems : ordered_in

Coupons ||--o{ Orders : applied_to
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# With coverage
npm run test:coverage
```

---

## 🚢 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3004
CMD ["node", "index.js"]
```

### Required Environment Variables
```env
NODE_ENV=production
PORT=3004
DB_CONNECTION=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRES_IN=90d
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 📈 Future Enhancements

- [ ] 🔔 Push Notifications System
- [ ] 📧 Email Service Integration
- [ ] 🔍 Advanced Search with Elasticsearch
- [ ] 📊 Analytics Dashboard
- [ ] 🌍 Multi-language Support
- [ ] 📱 Mobile App APIs
- [ ] 🤖 AI Product Recommendations
- [ ] 💬 Real-time Chat Support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](LICENSE)

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ by [Your Name]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](your-linkedin)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](your-github)

</div>

---

<div align="center">

### 🌟 Star this repository if you find it helpful!

</div>
