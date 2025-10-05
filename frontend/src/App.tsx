import { BrowserRouter, Routes  , Route} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import NavBar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
