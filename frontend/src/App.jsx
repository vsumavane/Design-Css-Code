import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Editor Page */}
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
