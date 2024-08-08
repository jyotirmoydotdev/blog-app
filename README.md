# Blog-App
![](/public/banner.jpg)

> ⭐️ If this project receives 50 stars, I will develop a production-ready version!

## Overview

This is a fully functional blog application built with Next.js and MongoDB. The app includes a dashboard for managing posts and viewing a list of subscribers. The application is designed to be simple, efficient, and scalable, offering essential blogging functionalities.

## Features

- **Create, Read, Update, and Delete (CRUD) Blog Posts**: Authors can manage their blog posts via a secure dashboard.
- **Subscriber List Management**: View and manage your list of subscribers who sign up to receive blog updates.
- **Responsive Design**: The application is optimized for all screen sizes.
- **Authentication and Authorization**: Secure login for authors to manage content.

## Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS , Shadcn UI, Aceternity UI
- **Backend**: Node.js, Next.js API routes
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (version >= 14)
- MongoDB (self-hosted or MongoDB Atlas)

### Installation

1. Clone the repository:

    ```bash
    cd clone https://github.com/jyotirmoydotdev/blog-app.git
    cd blog-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Environment Variables:

    Create a .env.local file in the root of your project and add the following environment variables:
    ```env
    MONGOOSE=""
    BLOB_READ_WRITE_TOKEN=""
    AUTH_SECRET=""
    USERNAME=""
    PASSWORD=""
    ```

    - **MONGOOSE**: Your Mongoose URI for connecting to your MongoDB database.
    - **BLOB_READ_WRITE_TOKEN**: Your token for accessing and managing vercel blob storage.
    - **AUTH_SECRET**: Your secret key for authentication and token generation.
    - **USERNAME**: The username for authentication as admin.
    - **PASSWORD**: The password associated with the admin.

4. Run the development server:

    ```bash
    npm run dev
    ```

    Open http://localhost:3000 with your browser to see the app.

## Usage

1. Dashboard Access:
    - Navigate to `/admin` to access the admin dashboard.
    - Create, edit, or delete blog posts.
    - View and manage the list of subscribers.
    
2. Public Blog:
    - The main blog page displays a list of published posts.
    - Readers can view individual blog posts and subscribe to the mailing list.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or feedback, feel free to reach out at [@jyotirmoydotdev](https://x.com/jyotirmoydotdev)