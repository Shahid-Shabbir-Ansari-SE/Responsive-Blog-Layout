import "./App.css";
import Navbar from "./components/navbar";
import Carousel from "./components/hero";
import Footer from "./components/footer";
import Loadmore from "./components/loadmore";

function App() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Loadmore />
      <Footer />
    </div>
  );
}

export default App;
