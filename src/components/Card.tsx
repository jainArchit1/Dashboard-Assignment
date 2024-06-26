import { useState } from "react";

interface EmployeeCardProps {
  id: string;
  name: string;
  age: any;
  salary: any;
  profileImage?: string;
  isSelected?: boolean;
  toggleSelectEmployee?: (id: string) => void;
  individualDeleteHandler?: (id: string) => void;
  clickHandler?: () => void; // Add this prop
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  name,
  age,
  salary,
  profileImage,
  isSelected,
  toggleSelectEmployee,
  individualDeleteHandler,
  clickHandler,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="bg-cover bg-center h-56 p-4"
        style={{
          backgroundImage: `url(${
            profileImage || "https://via.placeholder.com/150"
          })`,
        }}
      >
        {(isHovered || isSelected) && (
          <div className="absolute top-4 left-4">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={isSelected}
              onChange={() => toggleSelectEmployee && toggleSelectEmployee(id)}
            />
          </div>
        )}
      </div>
      <div className="p-4" onClick={clickHandler}>
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
        <p className="text-sm text-gray-600">ID: {id}</p>
        <p className="text-lg text-gray-700 mt-2">Age: {age}</p>
        <p className="text-lg text-gray-700">Salary: ${salary}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          onClick={() => console.log(`Edit ${id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-lg"
          onClick={() => individualDeleteHandler && individualDeleteHandler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
