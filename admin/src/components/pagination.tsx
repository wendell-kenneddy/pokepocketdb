import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface PaginationProps {
  basePath: string;
  canGoBack: boolean;
  canGoForward: boolean;
  page: number;
}

export function Pagination({ basePath, canGoBack, canGoForward, page }: PaginationProps) {
  return (
    <div className="bg-gray-900 border-t border-t-teal-400 py-1 px-4 rounded-b-md w-full flex items-center justify-between">
      {canGoBack ? (
        <Link href={`${basePath}?page=${page - 1}`}>
          <FiArrowLeft size={16} className="text-teal-400" />
        </Link>
      ) : (
        <button
          className="cursor-not-allowed opacity-50"
          name="View previous 10 match results"
          disabled
        >
          <FiArrowLeft size={16} className="text-teal-400" />
        </button>
      )}

      <span about="Current match results page">{page}</span>

      {canGoForward ? (
        <Link href={`${basePath}?page=${page + 1}`}>
          <FiArrowRight size={16} className="text-teal-400" />
        </Link>
      ) : (
        <button
          className="cursor-not-allowed opacity-50"
          name="View next 10 match results"
          disabled
        >
          <FiArrowRight size={16} className="text-teal-400" />
        </button>
      )}
    </div>
  );
}
