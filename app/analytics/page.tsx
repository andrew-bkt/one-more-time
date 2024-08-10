'use client'

import { useEffect, useState } from 'react'
import { createClient } from "@/utils/supabase/client"
import OCRResultsTable from '@/components/OCRResultsTable'

interface OCRResult {
  id: number
  user_id: string
  file_name: string
  ocr_text: string
  created_at: string
}

export default function Analytics() {
  const [results, setResults] = useState<OCRResult[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchOCRResults()
  }, [])

  async function fetchOCRResults() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('ocr_results')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResults(data || [])
    } catch (error) {
      console.error('Error fetching OCR results:', error)
      alert('Failed to fetch OCR results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">OCR Analytics</h2>
      
      {loading ? (
        <p className="text-center py-4">Loading OCR results...</p>
      ) : results.length === 0 ? (
        <p className="text-center py-4">No OCR results found.</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <OCRResultsTable results={results} />
        </div>
      )}
    </div>
  )
}
