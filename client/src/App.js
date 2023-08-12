import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import Links from "./Components/Links"
import Preview from "./Components/Preview"


function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/links" element={<Links />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;