// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { FiHome, FiSettings, FiUser, FiBarChart2, FiGrid } from 'react-icons/fi';


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="w-auto h-8" src="/logo.svg" alt="Your Logo" />
            </div>
            <nav className="flex-1 mt-5 space-y-1 bg-white">
              <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiHome className="mr-3 h-6 w-6" />
                Dashboard
              </Link>
              <Link href="/analytics" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiBarChart2 className="mr-3 h-6 w-6" />
                Analytics
              </Link>
              <Link href="/projects" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiGrid className="mr-3 h-6 w-6" />
                Projects
              </Link>
              <Link href="/settings" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiSettings className="mr-3 h-6 w-6" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div>
                    <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <FiUser className="h-8 w-8 rounded-full" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
