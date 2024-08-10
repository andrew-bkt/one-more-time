'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import { createClient } from "@/utils/supabase/client";

export default function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserMenuOpen(false);
    router.push('/settings');
  };

  return (
    <div className="ml-3 relative" ref={menuRef}>
      <div>
        <button 
          className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          id="user-menu" 
          aria-haspopup="true"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <FiUser className="h-8 w-8 rounded-full" />
        </button>
      </div>
      {isUserMenuOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          <a href="/settings" onClick={handleSettingsClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <FiSettings className="inline-block mr-2" /> Settings
          </a>
          <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <FiLogOut className="inline-block mr-2" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
