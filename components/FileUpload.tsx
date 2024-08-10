import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FiUpload } from 'react-icons/fi';

interface FileUploadProps {
  onUploadComplete: () => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.');
      }

      const file = event.target.files[0];
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const filePath = `${user.id}/${file.name}`;

      let { error: uploadError } = await supabase.storage
        .from('user_files')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      alert('File uploaded successfully!');
      onUploadComplete();
    } catch (error) {
      alert('Error uploading file!');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        onChange={uploadFile}
        disabled={uploading}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FiUpload className="mr-2 -ml-1 h-5 w-5" />
        {uploading ? 'Uploading...' : 'Upload File'}
      </label>
    </div>
  );
}
