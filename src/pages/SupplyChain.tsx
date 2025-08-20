import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Truck, Users, BarChart } from 'lucide-react';
import { SupplyChainOverview } from '../components/supply-chain/SupplyChainOverview/index';
import { Procurement } from '../components/supply-chain/Procurement/index';
import { Inventory } from '../components/supply-chain/Inventory/index';
import { Vendors } from '../components/supply-chain/Vendors/index';
import { Logistics } from '../components/supply-chain/Logistics/index';

export function SupplyChain() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/supply-chain' ? 'overview' :
    location.pathname.includes('/procurement') ? 'procurement' :
    location.pathname.includes('/inventory') ? 'inventory' :
    location.pathname.includes('/vendors') ? 'vendors' :
    location.pathname.includes('/logistics') ? 'logistics' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/supply-chain', icon: BarChart },
    { id: 'procurement', name: 'Procurement', href: '/supply-chain/procurement', icon: ShoppingCart },
    { id: 'inventory', name: 'Inventory', href: '/supply-chain/inventory', icon: Package },
    { id: 'vendors', name: 'Vendors', href: '/supply-chain/vendors', icon: Users },
    { id: 'logistics', name: 'Logistics', href: '/supply-chain/logistics', icon: Truck },
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
        <Route path="/" element={<SupplyChainOverview />} />
        <Route path="/procurement" element={<Procurement />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/logistics" element={<Logistics />} />
      </Routes>
    </div>
  );
}