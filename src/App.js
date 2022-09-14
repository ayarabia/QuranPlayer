import "./App.scss";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ArabicSearch from "./pages/arabic-search";
import EnglishSearch from "./pages/english-search";
function App() {
  return (
    <Container dir="rtl">
      {/* <Home></Home> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ARsearch" element={<ArabicSearch />} />
        <Route path="ENsearch" element={<EnglishSearch />} />
      </Routes>
    </Container>
  );
}
export default App;
