# Full-Stack Blog App

This is a Full-Stack Blog App project developed using Next.js and Prisma. The application allows users to create posts and add comments to them. Users can register using Google, and only registered users can create posts and leave comments.

## Features

- **Create Posts**: Registered users can create new posts.
- **Add Comments**: Users can leave comments on existing posts.
- **Google Authentication**: Users can quickly register and log in using their Google account.
- **Restricted Access**: Unregistered users cannot create posts or add comments.

## Technologies

- [Next.js](https://nextjs.org/) - A React framework for building server-rendered and static applications.
- [Prisma](https://www.prisma.io/) - An ORM for working with databases.
- [NextAuth.js](https://next-auth.js.org/) - A library for user authentication.
- [Axios](https://axios-http.com/) - A library for making HTTP requests.
- [date-fns](https://date-fns.org/) - A library for date manipulation.
- [React](https://reactjs.org/) - A library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [TypeScript](https://www.typescriptlang.org/) - A programming language that extends JavaScript.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/6Glow/Full-Stack_Blog-App.git
    cd blogs-app
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory and add the necessary environment variables:
      ```env
      DATABASE_URL=your-database-url
      GOOGLE_CLIENT_ID=your-google-client-id
      GOOGLE_CLIENT_SECRET=your-google-client-secret
      ```
    - Replace `your-database-url`, `your-google-client-id`, and `your-google-client-secret` with the appropriate values.

4. **Run the development server:**
    ```sh
    npm run dev
    ```

5. **Prisma setup:**
    - Run Prisma migrations to set up the database schema:
      ```sh
      npx prisma migrate dev
      ```
    - Generate Prisma client:
      ```sh
      npx prisma generate
      ```
    - If needed, sync your Prisma schema with the database without migrations:
      ```sh
      npx prisma db push
      ```
    - To open Prisma Studio for visual editing of the database:
      ```sh
      npx prisma studio
      ```

## Usage

- **Starting the app:**
    ```sh
    npm run dev
    ```
- Open your browser and navigate to `http://localhost:3000`.
  
<!------
## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots

![Screenshot of the app](link-to-your-screenshot.png)
----->
