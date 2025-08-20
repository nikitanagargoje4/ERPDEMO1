import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { HeartHandshake, Users, DollarSign, Megaphone, HeadphonesIcon } from 'lucide-react';
import { CRMOverview } from '../components/crm/CRMOverview';
import { Customers } from '../components/crm/Customers';
import { Sales } from '../components/crm/Sales';
import { Marketing } from '../components/crm/Marketing';
import { Support } from '../components/crm/Support';

export function CustomerRelationship() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/crm' ? 'overview' :
    location.pathname.includes('/customers') ? 'customers' :
    location.pathname.includes('/sales') ? 'sales' :
    location.pathname.includes('/marketing') ? 'marketing' :
    location.pathname.includes('/support') ? 'support' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/crm', icon: HeartHandshake },
    { id: 'customers', name: 'Customers', href: '/crm/customers', icon: Users },
    { id: 'sales', name: 'Sales', href: '/crm/sales', icon: DollarSign },
    { id: 'marketing', name: 'Marketing', href: '/crm/marketing', icon: Megaphone },
    { id: 'support', name: 'Support', href: '/crm/support', icon: HeadphonesIcon },
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
        <Route path="/" element={<CRMOverview />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  );
}