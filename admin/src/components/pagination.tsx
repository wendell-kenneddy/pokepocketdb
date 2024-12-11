import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface PaginationProps {
  getNextPage: () => void;
  getPrevPage: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  page: number;
}

export function Pagination({
  getPrevPage,
  getNextPage,
  canGoBack,
  canGoForward,
  page,
}: PaginationProps) {
  return (
    <div className="bg-gray-900 border-t border-t-teal-400 py-1 px-4 rounded-b-md w-full flex items-center justify-between">
      <button
        className="disabled:cursor-not-allowed disabled:opacity-50"
        name="View previous 10 match results"
        onClick={getPrevPage}
        disabled={!canGoBack}
      >
        <FiArrowLeft size={16} className="text-teal-400" />
      </button>

      <span about="Current match results page">{page}</span>

      <button
        className="disabled:cursor-not-allowed disabled:opacity-50"
        name="View next 10 match results"
        onClick={getNextPage}
        disabled={!canGoForward}
      >
        <FiArrowRight size={16} className="text-teal-400" />
      </button>
    </div>
  );
}
