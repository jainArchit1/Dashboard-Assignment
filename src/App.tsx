import { Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import SingleCardPage from "./SingleCardPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/singlecartPage/:id" element={<SingleCardPage />} />

        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
