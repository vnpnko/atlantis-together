import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/support" element={<About />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
