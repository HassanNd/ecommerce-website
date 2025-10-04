import { BrowserRouter, Routes  , Route} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import NavBar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
