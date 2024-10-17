import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Admin from "./component/Admin";
import Form from "./component/Form";

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav> */}

        <Routes>
          {" "}
          {/* Wrap Routes here */}
          <Route path="/" element={<Form />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
