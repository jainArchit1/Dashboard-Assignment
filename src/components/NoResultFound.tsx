import { useNavigate } from "react-router-dom";

interface NoResultsFoundProps {
  setSearchedData: React.Dispatch<React.SetStateAction<any[] | null>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({
  setSearchedData,
  setSearchText,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center overflow-x-hidden">
      <div className="text-center p-12 rounded-lg shadow-2xl">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m2 6H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"
          />
        </svg>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          No Results Found
        </h1>
        <p className="mt-2 text-gray-600">
          We couldn't find any results for ".
        </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            setSearchText(""); // Example: Reset search text
            setSearchedData(null); // Example: Reset searched data
            navigate("/"); // Navigate to home or another page
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NoResultsFound;
