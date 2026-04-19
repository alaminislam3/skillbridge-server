Skillbridge Server 

Backend server built with Express, TypeScript, Prisma, and PostgreSQL.

📦 Tech Stack
Node.js
Express.js
TypeScript
Prisma ORM
PostgreSQL
JWT Authentication
Zod (Validation)
⚙️ Installation Guide
1️⃣ Clone the repository
git clone <your-repo-url>
cd my-new-project
2️⃣ Install dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file in the root directory:

PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
4️⃣ Setup Prisma

Run the following commands:

npx prisma generate
npx prisma migrate dev

5️⃣ Run the server (Development)
npm run dev

Server will run at:

http://localhost:5000
6️⃣ Build the project
npm run build
7️⃣ Run in Production
npm start

🌱 Seed Admin User

To create a default admin user:

npm run seed:Admin
📁 Project Structure
src/
 ├── app/
 ├── config/
 ├── controllers/
 ├── services/
 ├── middlewares/
 ├── routes/
 ├── script/
 ├── server.ts
🧪 Lint & Format
Run ESLint
npm run lint
Fix ESLint issues
npm run lint:fix
Format code with Prettier
npm run format
🔐 Authentication
JWT-based authentication
Password hashing using bcrypt
📌 Notes
Make sure PostgreSQL is running
Keep .env file private (already in .gitignore)
Run migrations before starting the server