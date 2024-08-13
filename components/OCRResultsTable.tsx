import React, { useState } from 'react';
import { FiFile, FiCalendar, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface OCRResult {
  id: number;
  user_id: string;
  file_name: string;
  ocr_text: string;
  structured_invoice: any; // Using 'any' as we don't know the exact structure
  created_at: string;
}

interface OCRResultsTableProps {
  results: OCRResult[];
}

const OCRResultsTable: React.FC<OCRResultsTableProps> = ({ results }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result) => (
            <React.Fragment key={result.id}>
              <tr>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleRowExpansion(result.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {expandedRows.includes(result.id) ? (
                      <FiChevronUp className="h-5 w-5" />
                    ) : (
                      <FiChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(result.id) && (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <h4 className="font-semibold">OCR Text:</h4>
                      <p className="whitespace-pre-wrap">{result.ocr_text}</p>
                      
                      <h4 className="font-semibold mt-4">Structured Invoice:</h4>
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(result.structured_invoice, null, 2)}
                      </pre>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OCRResultsTable;