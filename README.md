# Full-Stack Blog Application

A modern, feature-rich blogging platform built with Next.js 14, TypeScript, Prisma, and PostgreSQL. This application allows users to create, read, and interact with blog posts through a clean and intuitive interface.

## Features

- 🔐 **Authentication** - Secure Google OAuth authentication
- ✍️ **Blog Posts** - Create and read blog posts
- 💬 **Comments** - Interactive commenting system on blog posts
- ❤️ **Likes** - Real-time like/unlike functionality for posts
- 🎨 **Modern UI** - Clean and responsive design with Tailwind CSS
- 🔒 **Database** - Persistent storage with PostgreSQL
- 🚀 **Performance** - Server-side rendering with Next.js 14

## Tech Stack

- **Frontend:**
  - Next.js 14.2.5
  - React 18
  - TypeScript
  - Tailwind CSS

- **Backend:**
  - Prisma ORM
  - PostgreSQL
  - Next.js API Routes

- **Authentication:**
  - NextAuth.js v4
  - Prisma Adapter
  - Google OAuth

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Google OAuth credentials

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your_postgresql_connection_string"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/6Glow/Full-Stack_Blog-App.git
cd blog-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
blogs-app/
│
├── prisma/                         # Database configuration
│   └── schema.prisma                # Prisma database schema with data models
│
├── public/                          # Static public files (images, favicon, etc.)
│
├── src/
│   ├── app/                         # Next.js routing logic
│   │   ├── api/                     # API endpoints
│   │   │   ├── auth/                # Authentication routes
│   │   │   │   └── [...nextauth]/   # Dynamic route for NextAuth
│   │   │   │       └── route.ts     # Authentication configuration
│   │   │   ├── posts/               # Endpoints for post operations
│   │   │   │   └── route.ts         # Post creation logic
│   │   │   └── comments/            # Endpoints for comments
│   │   │       └── route.ts         # Comment addition logic
│   │   ├── blogs/                   # Blog pages
│   │   │   ├── [id]/                # Dynamic route for individual post
│   │   │   │   └── page.tsx         # Post detail view page
│   │   │   └── page.tsx             # Blog list page
│   │   ├── layout.tsx               # Root application layout
│   │   └── page.tsx                 # Home page (post creation)
│   │
│   ├── components/                  # Reusable React components
│   │   ├── buttonLogout.tsx         # Logout button component
│   │   ├── comments.tsx             # Comments display component
│   │   ├── formComment.tsx          # Comment form component
│   │   ├── fromNemPost.tsx          # New post form component
│   │   ├── header.tsx               # Site header component
│   │   └── provider.tsx             # Session provider
│   │
│   ├── data/                        # Static/mock data
│   │   └── posts.ts                 # Temporary posts array
│   │
│   ├── lib/                         # Utility functions and configurations
│   │   ├── auth.ts                  # Authentication settings
│   │   ├── db.ts                    # Prisma singleton instance
│   │   └── session.ts               # Current session utility
│   │
│   ├── types/                       # TypeScript types
│   │   └── blog.ts                  # Blog-related types
│   │
│   └── app/
│       └── globals.css              # Global styles
│
├── .env                             # Environment variables file
├── .gitignore                       # Git ignore configuration
├── next.config.js                   # Next.js configuration
├── package.json                     # Project dependencies and scripts
├── README.md                        # Project documentation
├── tailwind.config.js               # Tailwind CSS configuration
└── tsconfig.json                    # TypeScript configuration
```

## Features in Detail

### Authentication
- Google OAuth integration
- Protected routes and API endpoints
- Persistent sessions

### Blog Posts
- Create new blog posts with title and content
- View all blog posts
- Individual blog post pages
- Author information display

### Comments
- Add comments to blog posts
- View all comments on a post

<!---
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
--->
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM

