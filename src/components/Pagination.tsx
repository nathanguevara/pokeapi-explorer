import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            page === currentPage
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;