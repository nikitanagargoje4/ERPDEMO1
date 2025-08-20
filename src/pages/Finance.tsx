import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { DollarSign, TrendingUp, Users, FileText, PieChart } from 'lucide-react';

// Finance sub-pages
import { FinanceOverview } from '../components/finance/FinanceOverview';
import { Accounting } from '../components/finance/Accounting';
import { Budgeting } from '../components/finance/Budgeting';
import { Payroll } from '../components/finance/Payroll';
import { FinanceReports } from '../components/finance/FinanceReports';

export function Finance() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/finance' ? 'overview' :
    location.pathname.includes('/accounting') ? 'accounting' :
    location.pathname.includes('/budgeting') ? 'budgeting' :
    location.pathname.includes('/payroll') ? 'payroll' :
    location.pathname.includes('/reports') ? 'reports' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/finance', icon: DollarSign },
    { id: 'accounting', name: 'Accounting', href: '/finance/accounting', icon: FileText },
    { id: 'budgeting', name: 'Budgeting', href: '/finance/budgeting', icon: PieChart },
    { id: 'payroll', name: 'Payroll', href: '/finance/payroll', icon: Users },
    { id: 'reports', name: 'Reports', href: '/finance/reports', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.href}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<FinanceOverview />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<FinanceReports />} />
      </Routes>
    </div>
  );
}