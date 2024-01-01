# Impax Backend

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/cepdnaclk/e19-3yp-impact-tracker.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd code/backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Configure Environment Variables

1. If not exists, create a `.env` file in the project root and add any necessary environment variables.

   ```env
   PORT=5000
   # Add other environment variables if needed
   ```

## Build and Run

1. **Build the TypeScript code:**

   ```bash
   npm run build
   ```

2. **Run the server:**

   ```bash
   npm start
   ```

   This will start the server at `http://localhost:5000` (or the port specified in your `.env` file).

## API Documentation

- Swagger documentation is available at `http://localhost:5000/api-docs` after starting the server.