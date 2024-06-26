import { useLocation } from "react-router-dom";

import EmployeeCard from "./components/Card";

import { useNavigate } from "react-router-dom";

const SingleCardPage = () => {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  console.log("single page ka data ", data);

  return (
    <div className=" m-3 flex flex-col gap-4">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="bg-red-600 text-white p-3 rounded-lg w-fit"
      >
        Move to Home{" "}
      </button>

      <div className="w-[360px] h-[400px]" key={data.id}>
        <EmployeeCard
          id={data.id}
          name={data.data_name}
          age={data.data_age}
          salary={data.data_salary}
          profileImage={data.profile_image}
        />
      </div>
    </div>
  );
};

export default SingleCardPage;
