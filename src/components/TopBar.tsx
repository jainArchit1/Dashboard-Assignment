interface TopBarProps {
  cardDeleteHandler: () => void;
  selectedCount: number;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const TopBar: React.FC<TopBarProps> = ({
  cardDeleteHandler,
  selectedCount,
  setSearchText,
}) => {
  return (
    <div className="fixed top-0 z-30 w-screen">
      <div className="flex justify-center gap-6 items-center bg-slate-800 p-7">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter the employee id that you want to search"
          className="text-lg rounded-lg border border-gray-800 w-[400px] h-[30px] p-5"
        />
        <button className="bg-blue-500 text-white px-5 py-1 p-2 rounded-lg">
          Search
        </button>

        {selectedCount > 0 && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
            onClick={cardDeleteHandler}
          >
            Delete selected
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
