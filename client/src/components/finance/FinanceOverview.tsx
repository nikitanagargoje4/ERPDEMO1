import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 135000, expenses: 115000 },
  { month: 'Feb', revenue: 142000, expenses: 118000 },
  { month: 'Mar', revenue: 158000, expenses: 120000 },
  { month: 'Apr', revenue: 165000, expenses: 125000 },
  { month: 'May', revenue: 175000, expenses: 132000 },
  { month: 'Jun', revenue: 190000, expenses: 135000 },
  { month: 'Jul', revenue: 185000, expenses: 134000 },
  { month: 'Aug', revenue: 195000, expenses: 138000 },
  { month: 'Sep', revenue: 210000, expenses: 142000 },
  { month: 'Oct', revenue: 220000, expenses: 144000 },
  { month: 'Nov', revenue: 225000, expenses: 146000 },
  { month: 'Dec', revenue: 248000, expenses: 152000 },
];

const departmentExpenses = [
  { name: 'Sales', value: 450000 },
  { name: 'Marketing', value: 320000 },
  { name: 'Operations', value: 510000 },
  { name: 'R&D', value: 290000 },
  { name: 'HR', value: 190000 },
  { name: 'IT', value: 250000 },
];

export function FinanceOverview() {
  return (
    <div className="space-y-6">
      {/* Financial summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue (YTD)</p>
              <p className="text-2xl font-semibold mt-1">$2,248,000</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-600 text-sm font-medium">+12.4%</span>
            <span className="text-gray-500 text-sm ml-2">vs last year</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Expenses (YTD)</p>
              <p className="text-2xl font-semibold mt-1">$1,650,000</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-red-600 text-sm font-medium">+8.2%</span>
            <span className="text-gray-500 text-sm ml-2">vs last year</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Net Profit (YTD)</p>
              <p className="text-2xl font-semibold mt-1">$598,000</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-600 text-sm font-medium">+15.3%</span>
            <span className="text-gray-500 text-sm ml-2">vs last year</span>
          </div>
        </div>
      </div>

      {/* Financial charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Revenue vs Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#0052ff"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#ff4d4f"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Department Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentExpenses}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Expenses']} />
                <Bar dataKey="value" name="Expenses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Financial insights and recent transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Recent Transactions">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: 'Invoice #1089', date: 'Mar 14, 2025', amount: '$8,750.00', status: 'Paid' },
                    { id: 2, name: 'Supplier Payment', date: 'Mar 13, 2025', amount: '$12,650.00', status: 'Processing' },
                    { id: 3, name: 'Payroll', date: 'Mar 10, 2025', amount: '$45,250.00', status: 'Completed' },
                    { id: 4, name: 'Office Supplies', date: 'Mar 8, 2025', amount: '$1,250.00', status: 'Completed' },
                    { id: 5, name: 'Invoice #1088', date: 'Mar 5, 2025', amount: '$7,325.00', status: 'Paid' },
                  ].map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all transactions
              </a>
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="Financial Insights">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Cash Flow Positive</p>
                <p className="mt-1 text-sm text-gray-500">
                  Cash flow remains positive for the 8th consecutive month.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Budget Alert</p>
                <p className="mt-1 text-sm text-gray-500">
                  Marketing department is at 92% of allocated quarterly budget.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Revenue Growth</p>
                <p className="mt-1 text-sm text-gray-500">
                  Q1 revenue exceeded projections by 7.3%.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Investment Return</p>
                <p className="mt-1 text-sm text-gray-500">
                  R&D investments showing 15% ROI, exceeding 12% target.
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <button className="w-full btn btn-primary">
                Generate Financial Report
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}