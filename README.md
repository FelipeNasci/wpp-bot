<div align="center">
   
   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
   ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
   ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
   ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
   
</div>

# WPP-Bot 🤖

A sophisticated WhatsApp chatbot designed for university environments, providing automated ticket management and routing across multiple departments through conversational interfaces.

## 🚀 Quick Overview

WPP-Bot is a **TypeScript-based WhatsApp bot** that streamlines communication between university users and various departments (GTIC, ASCON, Administrative Consultancy, University Town Hall). It features:

- **Conversational State Management** - Multi-step workflows with navigation support
- **Multi-Department Integration** - Handles tickets for IT, administrative, and maintenance services  
- **Smart Permission System** - Role-based access control for different user types
- **Session Management** - Automatic cleanup with 20-minute TTL
- **Comprehensive Testing** - Full E2E test coverage for all workflows

## 🛠️ Tech Stack

- **Runtime**: Node.js + TypeScript
- **WhatsApp Integration**: `@wppconnect-team/wppconnect`
- **Architecture**: State Machine Pattern + Domain-Driven Design
- **Testing**: Jest with comprehensive E2E tests
- **Communication**: Email (SMTP) + HTTP APIs

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [📖 **About**](./docs/about.md) | Comprehensive project overview, features, and setup guide |
| [🏗️ **Project Architecture**](./docs/project-architecture.md) | Detailed system architecture, patterns, and component design |
| [📊 **Architecture Diagrams**](./docs/architecture.md) | Visual diagrams including use cases and C4 models |

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your SMTP and API configurations
   ```

3. **Run in development**:
   ```bash
   pnpm run dev
   ```

4. **Scan QR code** with WhatsApp to connect the bot

## 🧪 Testing

```bash
# Run full test suite
pnpm test

# Test specific department
pnpm test -- --testPathPattern=gtic
```

## 📁 Project Structure

```
src/
├── controllers/     # Bot, Chat, and Ticket controllers
├── domain/         # Business logic and menu definitions  
├── services/       # WhatsApp, Email, and Ticket services
├── helpers/        # Utilities, permissions, and message templates
└── templates/      # Ticket confirmation templates
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests and ensure they pass
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

For detailed information about setup, architecture, and usage, please refer to the [documentation](./docs/) directory.
