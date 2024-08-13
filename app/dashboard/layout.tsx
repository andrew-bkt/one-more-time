'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { FiHome, FiBarChart2, FiGrid, FiSettings, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import ThemeToggle from '@/components/ThemeToggle';  // Import ThemeToggle

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-card border-r border-border">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="w-auto h-8" src="/logo.svg" alt="Your Logo" />
            </div>
            <nav className="flex-1 mt-5 space-y-1">
              <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground">
                <FiHome className="mr-3 h-6 w-6" />
                Dashboard
              </Link>
              <Link href="/analytics" className="flex items-center px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground">
                <FiBarChart2 className="mr-3 h-6 w-6" />
                Analytics
              </Link>
              <Link href="/projects" className="flex items-center px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground">
                <FiGrid className="mr-3 h-6 w-6" />
                Projects
              </Link>
              <Link href="/settings" className="flex items-center px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground">
                <FiSettings className="mr-3 h-6 w-6" />
                Settings
              </Link>
              <button 
                onClick={handleSignOut}
                className="flex items-center w-full text-left px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FiLogOut className="mr-3 h-6 w-6" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-card shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-card-foreground">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle /> {/* Add ThemeToggle here */}
                <Link href="/settings" className="text-card-foreground hover:text-accent-foreground">
                  <FiSettings className="h-6 w-6" />
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-card-foreground hover:text-destructive-foreground"
                >
                  Sign Out
                </button>
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
