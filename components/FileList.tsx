import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FiFile, FiTrash2, FiCpu } from 'react-icons/fi';

export default function FileList() {
  const [files, setFiles] = useState<any[]>([]);
  const [processing, setProcessing] = useState<{ [key: string]: boolean }>({});
  const supabase = createClient();

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.storage
      .from('user_files')
      .list(user.id, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error fetching files:', error);
    } else {
      console.log('Fetched files:', data);
      setFiles(data || []);
    }
  }

  const deleteFile = async (fileName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const filePath = `${user.id}/${fileName}`;
      const { error } = await supabase.storage
        .from('user_files')
        .remove([filePath]);

      if (error) throw error;

      alert('File deleted successfully!');
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Error deleting file: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const processFile = async (fileName: string) => {
    try {
      setProcessing(prev => ({ ...prev, [fileName]: true }));
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const filePath = `${user.id}/${fileName}`;
      
      // Get a temporary URL for the file
      const { data, error } = await supabase.storage
        .from('user_files')
        .createSignedUrl(filePath, 60); // URL valid for 60 seconds

      if (error) throw error;
      if (!data) throw new Error('Failed to create signed URL');

      const signedUrl = data.signedUrl;

      // Make API call to FastAPI service
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_url: signedUrl,
          file_name: fileName,
          user_id: user.id,
          bucket_name: 'user_files', // Assuming this is your bucket name
        }),
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const result = await response.json();
      console.log('Processing result:', result);
      alert('File processed successfully!');
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setProcessing(prev => ({ ...prev, [fileName]: false }));
    }
  };

  return (
    <div className="mt-4">
      {files.length === 0 ? (
        <p className="text-center py-4 text-gray-500">No files uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {files.map((file) => (
            <li key={file.name} className="py-3 flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                <FiFile className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </span>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => processFile(file.name)}
                  disabled={processing[file.name]}
                  className="mr-2 p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiCpu className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteFile(file.name)}
                  className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
