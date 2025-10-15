# WPP-Bot Documentation

## Project Summary

**WPP-Bot** is a comprehensive WhatsApp chatbot designed to streamline communication and ticket management for a university environment. The bot serves as an automated assistant that helps users create tickets and requests for different university departments through an intuitive conversational interface.

### Key Features

- **Multi-Department Support**: Handles requests for GTIC (IT Department), ASCON, Administrative Consultancy, and University Town Hall (Subprefeitura Universitária)
- **Conversational State Management**: Maintains conversation context and user progress through complex multi-step workflows
- **User Permission System**: Different access levels for students and other user types
- **Automated Ticket Creation**: Generates and sends tickets to appropriate departments via email or HTTP requests
- **Session Management**: Tracks active users with automatic session expiration (20 minutes)
- **Email Integration**: Sends ticket confirmations and notifications
- **Comprehensive Testing**: End-to-end tests for all major workflows


## Technologies Used

### Core Technologies

- **Node.js** - Runtime environment
- **TypeScript** - Primary programming language for type safety
- **WhatsApp Integration**: `@wppconnect-team/wppconnect` - WhatsApp Web API wrapper

### Supporting Libraries

- **Communication & Networking**:
  - `axios` - HTTP client for API requests
  - `nodemailer` - Email sending functionality
  - `form-data` - Form data handling

- **Utilities**:
  - `dotenv` - Environment variable management
  - `expiry-map` - Session management with automatic expiration
  - `sharp` - Image processing

- **Development & Testing**:
  - `jest` - Testing framework
  - `ts-jest` - TypeScript support for Jest
  - `ts-node` - TypeScript execution for development
  - `nodemon` - Development server with auto-reload
  - `prettier` - Code formatting

### Architecture Patterns

- **State Machine Pattern**: Conversation flows managed through state transitions
- **Controller Pattern**: Separate controllers for bot logic, chat flows, and ticket management
- **Service Layer**: Abstracted services for WhatsApp, email, and ticket handling
- **Domain-Driven Design**: Clear separation of business logic and domain models

## Project Structure

```
src/
├── index.ts                 # Application entry point
├── controllers/            # Business logic controllers
│   ├── bot-controller/     # Main bot orchestration
│   ├── chat-controller/    # Conversation flow management
│   └── ticket-controller/  # Ticket creation and routing
├── domain/                 # Domain models and business entities
│   ├── menu-options/       # Conversation menu definitions
│   └── index.ts           # Domain types and enums
├── helpers/               # Utility functions
│   ├── input-listeners/   # Input validation and routing
│   ├── messages/          # Message templates
│   └── user-permissions/  # Access control logic
├── services/              # External service integrations
│   ├── database/          # In-memory database
│   ├── email/             # Email service
│   ├── http/              # HTTP client
│   ├── tickets/           # Ticket service implementations
│   └── whatsapp-messages/ # WhatsApp integration
└── templates/             # Ticket confirmation templates
```

## How to Run This Project

### Prerequisites

- **Node.js** (v14 or higher)
- **pnpm** package manager
- **Chrome/Chromium** browser (required for WhatsApp Web integration)

### Environment Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd wpp-bot
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Email Configuration
   HOST=smtp.your-provider.com
   PORT=465
   EMAIL_SENDER=your-email@domain.com
   PASSWORD_EMAIL_SENDER=your-app-password

   # Ticket Destinations
   GTIC_TICKET_EMAIL=gtic@university.edu
   ASCON_TICKET_EMAIL=ascon@university.edu
   ASSESSORIA_ADM_TICKET_EMAIL=admin@university.edu
   UNIVERSITY_TOWN_HALL_URL=https://api.university.edu/tickets
   ```

### Running the Application

#### Development Mode
```bash
pnpm run dev
```
This starts the bot with TypeScript compilation and auto-reload.

#### Production Mode
```bash
# Build the project (if needed)
tsc

# Start the bot
pnpm start
```

### WhatsApp Setup Process

1. **Initial Startup**: When you first run the bot, it will:
   - Launch a Chrome browser instance
   - Navigate to WhatsApp Web
   - Display a QR code in the terminal

2. **QR Code Authentication**:
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Tap "Link a Device"
   - Scan the QR code displayed in the terminal

3. **Session Persistence**: 
   - The bot saves session data in `tokens/whatsbot/`
   - Subsequent runs will use the saved session
   - No need to scan QR code again unless session expires

### Testing

Run the comprehensive test suite:
```bash
pnpm test
```

The project includes extensive end-to-end tests covering:
- All department workflows (GTIC, ASCON, etc.)
- User permission scenarios
- Email and ticket creation processes
- State transition validation

### Bot Usage Flow

1. **User Initiation**: Users send any message to the bot's WhatsApp number
2. **Registration**: First-time users go through a registration process:
   - Full name
   - User type (Student/Other)
   - Location (Rio Tinto/Mamanguape)
   - Email address
3. **Department Selection**: Users choose which department they need help from
4. **Service Request**: Bot guides users through department-specific workflows
5. **Ticket Creation**: Bot collects all necessary information and creates tickets
6. **Confirmation**: Users receive ticket confirmation with details

### Session Management

- **Session Duration**: 20 minutes of inactivity
- **Auto-cleanup**: Expired sessions are automatically removed
- **State Persistence**: User progress is maintained during active sessions
- **Resume Capability**: Users can continue from where they left off

### Supported Commands

- **`voltar`**: Go back to the previous step
- **`sair`**: Exit the current conversation
- **Menu Options**: Numbered responses (1, 2, 3, etc.)
- **Free Text**: For fields requiring detailed information

### Monitoring and Logs

The bot provides console logging for:
- WhatsApp connection status
- Message processing
- Ticket creation events
- Error handling and debugging

### Troubleshooting

**Common Issues**:

1. **QR Code Not Appearing**: Ensure Chrome is installed and accessible
2. **Session Expired**: Delete `tokens/whatsbot/` folder and restart
3. **Email Not Sending**: Verify SMTP configuration in `.env`
4. **Department Not Responding**: Check ticket destination URLs/emails

**Debug Mode**: Set environment variable `DEBUG=true` for verbose logging.

## Deployment Considerations

- **Server Requirements**: Node.js server with Chrome/Chromium installed
- **Security**: Protect `.env` file and session tokens
- **Scaling**: Consider load balancing for high-volume usage
- **Monitoring**: Implement health checks and error tracking
- **Backup**: Regular backup of session tokens for continuity

This documentation provides a comprehensive overview of the WPP-Bot project, its architecture, and how to get it running in your environment.