# Ecommerce_AlpineJS
This project is an ecommerce platform evolved from an authentication system using JSON Web Tokens (JWT). It demonstrates a secure authentication system with [ExpressJS](https://expressjs.com), [PostgreSQL](https://www.postgresql.org), [nodemailer](https://nodemailer.com) (for sending mails), [Cloudinary](https://cloudinary.com/pricing) (for image management) on the backend, containerized with [Docker](https://www.docker.com). The frontend is built with [React](https://react.dev/), [React Query](https://tanstack.com/query/latest), [TailwindCSS](https://tailwindcss.com), and [Vite](https://vitejs.dev) for fast development and optimized builds.

Includes:
<ul>
  <li>Register, login, logout, profile, account verification, password reset</li>
  <li>Send emails (using Gmail API) for account verification and password reset</li>
  <li>Product management with full CRUD operations (Admin access only)</li>
</ul>

## Database diagram
The web's database is [here](https://dbdiagram.io/d/ECommerce-686600daf413ba350809670b)

## Features of web
<ul>
  <li>
    Sign up and email verification
  </li>
  <p align="center">
    <img width="214" height="217" alt="image" src="https://github.com/user-attachments/assets/4ebec6e3-530a-4575-9fde-062c6e49d13e" />
    <img style="width: 50%; height: 50%;" alt="verify_email" src="https://github.com/user-attachments/assets/b8f2417f-b64e-45f7-aa0e-7096b57d91b6" />
  <p align="center">
  <li>
    After registration and verification, the account will be created with an automatically generated default avatar combining the first letters of the          user's first and last name (displayed in the top-right corner).
  </li>
  <p align="center">
    <img style="width: 50%; height: 50%;" src="https://github.com/user-attachments/assets/219519ea-6196-4e51-91bd-5245e105a676" />
  </p>
  <li><em>Add product by category</em></li>
  <div align="center">
    <img src="https://github.com/user-attachments/assets/d13ad958-c592-4f30-8926-e5003972c316" alt="Application Demo Screencast" width="600">
  </div>
  <li> Add multiple delivery addresses</li>
  <p align="center">
    <img style="width: 50%; height: 50%;" alt="image" src="https://github.com/user-attachments/assets/2173dce2-e399-4732-895f-04ce10d637e9" />
  </p>
  <li>User avatar upload and management</li>
  <p align="center">
    <img style="width: 50%; height: 50%;" alt="image" src="https://github.com/user-attachments/assets/9b1490cd-cf20-473b-855a-012f147d975d" />
  </p>
</ul>


