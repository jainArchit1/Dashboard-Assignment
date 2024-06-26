import { useEffect, useState } from "react";
import "./App.css";
import EmployeeCard from "./components/Card";
import TopBar from "./components/TopBar";
import NoResultsFound from "./components/NoResultFound";
import Loader from "./components/Loader";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: string;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
  profile_image?: string;
}

const Homepage = () => {
  const [allEmployeesData, setAllEmployeesData] = useState<Employee[] | null>(
    null
  );
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<string>>(
    new Set()
  );
  const [searchedData, setSearchedData] = useState<Employee[] | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees"
      );
      const data = await response.json();
      console.log("res", data);
      setAllEmployeesData(data.data); // Assuming data.data contains the list of employees
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const cardDeleteHandler = () => {
    const filteredData =
      allEmployeesData?.filter(
        (employee) => !selectedEmployeeIds.has(employee.id)
      ) ?? null;
    setAllEmployeesData(filteredData);
    setSelectedEmployeeIds(new Set());
  };

  const individualDeleteHandler = (id: string) => {
    const filteredData =
      allEmployeesData?.filter((employee) => employee.id !== id) ?? null;
    setAllEmployeesData(filteredData);
  };

  const toggleSelectEmployee = (id: string) => {
    const newSelectedEmployeeIds = new Set(selectedEmployeeIds);
    if (newSelectedEmployeeIds.has(id)) {
      newSelectedEmployeeIds.delete(id);
    } else {
      newSelectedEmployeeIds.add(id);
    }
    setSelectedEmployeeIds(newSelectedEmployeeIds);
  };

  const searchHandler = () => {
    if (searchText.length === 0) {
      setSearchedData(null);
    } else {
      const filteredData =
        allEmployeesData?.filter((employee) => employee.id == searchText) ?? [];
      console.log(searchText);
      console.log("check 1", filteredData);
      setSearchedData(filteredData);
    }
  };

  const clickHandler = (data: Employee) => {
    navigate(`/singlecartPage/${data.id}`, { state: data });
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    searchHandler();
  }, [searchText]);

  return (
    <div className="w-full min-h-screen justify-center items-center">
      <TopBar
        cardDeleteHandler={cardDeleteHandler}
        selectedCount={selectedEmployeeIds.size}
        setSearchText={setSearchText}
      />

      {allEmployeesData ? (
        <div className="flex flex-wrap gap-6 mt-36 justify-center items-center">
          {searchedData === null && searchText.length === 0 ? (
            allEmployeesData.map((employee) => (
              <div className="w-[360px] h-[400px]" key={employee.id}>
                <EmployeeCard
                  id={employee.id}
                  name={employee.employee_name}
                  age={employee.employee_age}
                  salary={employee.employee_salary}
                  profileImage={employee.profile_image}
                  isSelected={selectedEmployeeIds.has(employee.id)}
                  toggleSelectEmployee={toggleSelectEmployee}
                  individualDeleteHandler={individualDeleteHandler}
                  clickHandler={() => clickHandler(employee)}
                />
              </div>
            ))
          ) : searchedData !== null && searchedData.length > 0 ? (
            searchedData.map((employee) => (
              <div className="w-[360px] h-[400px]" key={employee.id}>
                <EmployeeCard
                  id={employee.id}
                  name={employee.employee_name}
                  age={employee.employee_age}
                  salary={employee.employee_salary}
                  profileImage={employee.profile_image}
                  isSelected={selectedEmployeeIds.has(employee.id)}
                  toggleSelectEmployee={toggleSelectEmployee}
                  individualDeleteHandler={individualDeleteHandler}
                  clickHandler={() => clickHandler(employee)}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-full justify-center items-center">
              <NoResultsFound
                setSearchedData={setSearchedData}
                setSearchText={setSearchText}
              />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Homepage;
