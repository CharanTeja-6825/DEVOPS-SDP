# Budget Planner

A comprehensive React-based budget planning application with simple authentication and routing that helps users organize and manage their finances effectively.

## Features

- **Simple Authentication**: Basic login and registration system
- **Dashboard Navigation**: Clean interface with tabbed navigation
- **Income Management**: Add and track multiple income sources with different frequencies
- **Expense Tracking**: Categorize and monitor expenses with detailed breakdowns
- **Savings Goals**: Set and track progress toward financial goals
- **Visual Analytics**: Progress bars and category breakdown for spending patterns
- **Budget Alerts**: Warnings when spending exceeds income
- **Real-time Calculations**: Automatic budget calculations and remaining balance tracking

## Application Flow

1. **Authentication**: Users start at the login page
2. **Registration**: New users can create accounts easily
3. **Dashboard**: Authenticated users access the main budget planner interface
4. **Navigation**: Simple tab-based navigation between features

## Technologies Used

- **React 18** with JSX and simple state management
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **Context API** for global state management (Budget & Auth)
- **PostCSS** for CSS processing
- **Simple Client-Side Routing** (no external router dependencies)

## Getting Started

### Prerequisites

- Node.js (version 20.19+ or 22.12+)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── BudgetSummary.jsx    # Overall budget overview
│   ├── ExpenseForm.jsx      # Add new expenses
│   ├── IncomeForm.jsx       # Add new income sources
│   ├── SavingsGoals.jsx     # Manage savings goals
│   └── TransactionList.jsx  # List all transactions
├── context/
│   ├── AuthContext.jsx      # Authentication state management
│   └── BudgetContext.jsx    # Budget data state management
├── pages/
│   ├── Dashboard.jsx        # Main budget planner interface
│   ├── Login.jsx           # User login page
│   └── Register.jsx        # User registration page
├── App.jsx                  # Main app with simple routing
├── index.css               # Tailwind CSS imports
└── main.jsx                # Application entry point
```

## How to Use

### 1. Authentication
- Start at the login page
- Enter any email and password to login (simple demo authentication)
- Or click "Register here" to create a new account
- Fill in name, email, and password to register

### 2. Dashboard
Once logged in, you'll see the main dashboard with:
- **Dashboard Tab**: Overview of your budget and quick actions
- **Income Tab**: Add income sources and view income history
- **Expenses Tab**: Add expenses and categorize spending
- **Savings Tab**: Create and track savings goals

### 3. Budget Management
- **Add Income**: Specify source, amount, and frequency
- **Track Expenses**: Categorize spending with dates
- **Set Goals**: Create savings targets with deadlines
- **Monitor Progress**: View real-time budget calculations

## Features in Detail

### Global Context Management
The app uses React Context API for state management, providing:
- Centralized data storage
- Easy state sharing between components
- Efficient updates and re-renders

### Responsive Design
Built with Tailwind CSS for:
- Mobile-first responsive design
- Clean, modern UI components
- Consistent color schemes and spacing

### Financial Calculations
Automatic calculations for:
- Total income and expenses
- Remaining budget
- Expense percentages by category
- Savings goal progress

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
