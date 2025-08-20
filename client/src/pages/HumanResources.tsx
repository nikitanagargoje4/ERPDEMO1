import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, UserPlus, Award, BookOpen, LineChart } from 'lucide-react';

// Import HR sub-pages
import { HROverview } from '../components/hr/HROverview';
import { Employees } from '../components/hr/Employees';
import { Recruitment } from '../components/hr/Recruitment';
import { Training } from '../components/hr/Training';
import { Performance } from '../components/hr/Performance';

export function HumanResources() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/human-resources' ? 'overview' :
    location.pathname.includes('/employees') ? 'employees' :
    location.pathname.includes('/recruitment') ? 'recruitment' :
    location.pathname.includes('/training') ? 'training' :
    location.pathname.includes('/performance') ? 'performance' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/human-resources', icon: Users },
    { id: 'employees', name: 'Employees', href: '/human-resources/employees', icon: Users },
    { id: 'recruitment', name: 'Recruitment', href: '/human-resources/recruitment', icon: UserPlus },
    { id: 'training', name: 'Training', href: '/human-resources/training', icon: BookOpen },
    { id: 'performance', name: 'Performance', href: '/human-resources/performance', icon: LineChart },
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
        <Route path="/" element={<HROverview />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/training" element={<Training />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </div>
  );
}