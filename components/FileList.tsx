import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FiFile, FiTrash2, FiCpu, FiEye } from 'react-icons/fi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function FileList() {
  const [files, setFiles] = useState<any[]>([]);
  const [processing, setProcessing] = useState<{ [key: string]: boolean }>({});
  const [processedFiles, setProcessedFiles] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchFiles();
    fetchProcessedFiles();
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

  async function fetchProcessedFiles() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from('ocr_results')
      .select('file_name')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching processed files:', error);
    } else {
      const processedSet = new Set(data?.map(item => item.file_name));
      setProcessedFiles(processedSet);
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
  const viewProcessedFile = async (fileName: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from('ocr_results')
      .select('*')
      .eq('user_id', user.id)
      .eq('file_name', fileName)
      .single();

    if (error) {
      console.error('Error fetching processed file data:', error);
    } else {
      setSelectedFile(data);
    }
  };

  const StructuredDataDisplay = ({ data }: { data: any }) => {
    if (!data || !data.structured_invoice) return <p>No data available</p>;
    const invoice = data.structured_invoice;

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Vendor</h3>
          <p>Name: {invoice.vendor?.name || 'N/A'}</p>
          <p>Address: {invoice.vendor?.address || 'N/A'}</p>
          <p>Phone: {invoice.vendor?.phone || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-semibold">Invoice Details</h3>
          <p>Number: {invoice.invoice?.number || 'N/A'}</p>
          <p>Date: {invoice.invoice?.date || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-semibold">Items</h3>
          {invoice.items && invoice.items.length > 0 ? (
            <ul className="list-disc pl-5">
              {invoice.items.map((item: any, index: number) => (
                <li key={index}>{item.name} - Quantity: {item.quantity || 'N/A'}, Price: {item.price || 'N/A'}</li>
              ))}
            </ul>
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {files.length === 0 ? (
        <p className="text-center py-4 text-muted-foreground">No files uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {files.map((file) => (
            <li key={file.name} className="py-3 flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                <FiFile className="flex-shrink-0 h-5 w-5 text-muted-foreground mr-3" />
                <span className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </span>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                {processedFiles.has(file.name) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => viewProcessedFile(file.name)}
                        className="mr-2 p-1 rounded-full text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                      >
                        <FiEye className="h-5 w-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{file.name}</DialogTitle>
                      </DialogHeader>
                      <StructuredDataDisplay data={selectedFile} />
                    </DialogContent>
                  </Dialog>
                )}
                <button
                  onClick={() => processFile(file.name)}
                  disabled={processing[file.name]}
                  className="mr-2 p-1 rounded-full text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                >
                  <FiCpu className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteFile(file.name)}
                  className="p-1 rounded-full text-muted-foreground hover:text-destructive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
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