import React from 'react';
import { FiFile, FiCalendar, FiUser } from 'react-icons/fi';

interface OCRResult {
  id: number;
  user_id: string;
  file_name: string;
  ocr_text: string;
  created_at: string;
}

interface OCRResultsTableProps {
  results: OCRResult[];
}

const OCRResultsTable: React.FC<OCRResultsTableProps> = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OCR Text</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result) => (
            <tr key={result.id}>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-900">{result.ocr_text}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FiFile className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-900">{result.file_name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FiUser className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">{result.user_id}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FiCalendar className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(result.created_at).toLocaleString()}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OCRResultsTable;
