# API Routes Documentation

## Base URL

```
http://localhost:3333
```

## Existing Routes

### Registers

- `GET /registers/category/:category_id` - List registers by category
- `GET /registers/:id` - Get register details

### Categories

- `GET /categories` - List all categories

### Coupons (Needs update from market_id to register_id)

- `PATCH /coupons/:market_id` - Update coupons

## Needed Routes

### Registers

- `POST /registers` - Create new register
- `PUT /registers/:id` - Update register
- `DELETE /registers/:id` - Delete register
- `GET /registers` - List all registers
- `GET /registers/nearby` - List registers near user's location
- `GET /registers/user/:userId` - List registers by user

### Users

- `POST /users` - Register new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `DELETE /users` - Delete user account

### Authentication

- `POST /auth/refresh` - Refresh authentication token
- `POST /auth/logout` - User logout

### Photos

- `POST /registers/:registerId/photos` - Upload photo
- `GET /registers/:registerId/photos` - List photos
- `DELETE /registers/:registerId/photos/:photoId` - Delete photo

## Notes

- All routes that require authentication should include a Bearer token in the Authorization header
- Routes that handle file uploads (like photos) should use multipart/form-data
- All responses should be in JSON format
- Error responses should follow a consistent format:
  ```json
  {
    "error": {
      "code": "ERROR_CODE",
      "message": "Error description"
    }
  }
  ```
