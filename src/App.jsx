import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminmembershowlist from "./Pages/Adminmembershowlist.jsx";
import Adminmember from "./Pages/Adminmember.jsx"
import Adminupdatemember from "./Pages/Adminupdatemember.jsx";
import Adminaddcourse from "./Pages/Adminaddcourse.jsx";
import Admincourselist from "./Pages/Admincouselist.jsx";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/vv" element={<Adminmember />} />
          <Route path="/vvc" element={<Adminmembershowlist />} />
        <Route path="/updatemember/:id" element={<Adminupdatemember />} />
           <Route path="/yrty" element={<Adminaddcourse />} /> 
             <Route path="/" element={<Admincourselist />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;