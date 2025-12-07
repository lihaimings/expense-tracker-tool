"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw } from "lucide-react";

interface FormData {
  [key: string]: string;
}

export default function ToolComponent() {
  const [formData, setFormData] = useState<FormData>({});
  const [result, setResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // TODO: Add your tool logic here
    // This is where you process the input and generate output
    setTimeout(() => {
      setResult("Result will appear here. Implement your tool logic in ToolComponent.tsx");
      setIsProcessing(false);
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleReset = () => {
    setFormData({});
    setResult("");
  };

  return (
    <div className="card p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Expense Tracker
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields */}
        
          <div>
            <label htmlFor="expense_date" className="block text-sm font-medium text-gray-700 mb-2">
              Expense Date (mm/dd/yyyy)
            </label>
            <input
              type="date"
              id="expense_date"
              name="expense_date"
              placeholder="Enter expense date"
              className="input"
              value={formData.expense_date || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Expense Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter expense amount"
              className="input"
              value={formData.amount || ''}
              onChange={handleChange}
            />
          </div>

        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isProcessing}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Process"
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>
      
      {/* Result */}
      {result && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Result</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
