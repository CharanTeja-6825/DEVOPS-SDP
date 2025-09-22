import React from 'react';
import { Link } from 'react-router-dom';

const features = [
	{
		icon: '📊',
		title: 'Budget Overview',
		description: 'Get a clear summary of your income, expenses, and remaining budget. Stay on track and avoid overspending with real-time insights.'
	},
	{
		icon: '💵',
		title: 'Add Income',
		description: 'Easily add and track multiple income sources, including salary, freelance, investments, and more.'
	},
	{
		icon: '💸',
		title: 'Track Expenses',
		description: 'Categorize and monitor your spending. Visualize expenses by category and identify areas to save.'
	},
	{
		icon: '🎯',
		title: 'Savings Goals',
		description: 'Set financial targets, track your progress, and celebrate milestones as you reach your savings goals.'
	},
	{
		icon: '📈',
		title: 'Expense Breakdown',
		description: 'Visualize your spending patterns with modern charts and detailed category analysis.'
	},
	{
		icon: '📋',
		title: 'Recent Transactions',
		description: 'Review your latest financial activity and manage transactions with ease.'
	}
];

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900 flex flex-col items-center justify-center px-4 py-12">
			<div className="max-w-3xl w-full text-center mb-16 animate-slideInUp">
				<div className="flex items-center justify-center mb-6">
					<div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
						<span className="text-4xl">💰</span>
					</div>
				</div>
				<h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">BudgetPlanner</h1>
				<p className="text-xl text-blue-200 mb-6 font-medium">Your modern, secure, and beautiful personal finance dashboard</p>
				<Link to="/register" className="inline-block bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-emerald-600 hover:to-blue-700 transform hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-xl">
					Get Started
				</Link>
			</div>

			<div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-slideInUp">
				{features.map((feature, idx) => (
					<div key={feature.title} className="glass rounded-2xl p-8 shadow-2xl border border-white/20 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300">
						<div className={`w-14 h-14 mb-4 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg`}>
							<span className="text-3xl">{feature.icon}</span>
						</div>
						<h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
						<p className="text-blue-200 text-sm mb-2">{feature.description}</p>
					</div>
				))}
			</div>

			<div className="max-w-2xl w-full text-center animate-slideInUp">
				<h2 className="text-2xl font-bold text-white mb-4">Why BudgetPlanner?</h2>
				<ul className="text-blue-200 text-md space-y-2 mb-8">
					<li>🌟 Beautiful, modern UI with glassmorphism and gradients</li>
					<li>🔒 Secure and private: your data is protected</li>
					<li>⚡ Fast, responsive, and easy to use</li>
					<li>📱 Works great on desktop and mobile</li>
				</ul>
				<Link to="/login" className="inline-block bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-emerald-700 transform hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-xl">
					Already have an account? Log In
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
