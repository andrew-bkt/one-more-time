'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from "@/utils/supabase/client";
import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [router, setRouter] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const supabase = createClient();

  useEffect(() => {
    import('next/navigation').then((mod) => {
      setRouter(mod.useRouter());
    });

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  if (!user && router) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">File Management</h2>

      <div className="bg-card shadow-sm overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-foreground">Your Files</h3>
          <FileUpload onUploadComplete={handleRefresh} />
        </div>
        <div className="border-t border-border px-4 py-5 sm:px-6">
          <FileList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
