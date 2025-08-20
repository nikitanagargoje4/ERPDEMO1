import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FolderKanban, ListTodo, Calendar, Users, BarChart } from 'lucide-react';
import { ProjectOverview } from '../components/projects/ProjectOverview/index';
import { ActiveProjects } from '../components/projects/ActiveProjects/index';
import { ProjectTasks } from '../components/projects/ProjectTasks/index';
import { ProjectResources } from '../components/projects/ProjectResources/index';
import { ProjectCalendar } from '../components/projects/ProjectCalendar/index';

export function ProjectManagement() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/projects' ? 'overview' :
    location.pathname.includes('/active') ? 'active' :
    location.pathname.includes('/tasks') ? 'tasks' :
    location.pathname.includes('/resources') ? 'resources' :
    location.pathname.includes('/calendar') ? 'calendar' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/projects', icon: BarChart },
    { id: 'active', name: 'Active Projects', href: '/projects/active', icon: FolderKanban },
    { id: 'tasks', name: 'Tasks', href: '/projects/tasks', icon: ListTodo },
    { id: 'resources', name: 'Resources', href: '/projects/resources', icon: Users },
    { id: 'calendar', name: 'Calendar', href: '/projects/calendar', icon: Calendar },
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
        <Route path="/" element={<ProjectOverview />} />
        <Route path="/active" element={<ActiveProjects />} />
        <Route path="/tasks" element={<ProjectTasks />} />
        <Route path="/resources" element={<ProjectResources />} />
        <Route path="/calendar" element={<ProjectCalendar />} />
      </Routes>
    </div>
  );
}