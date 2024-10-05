import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
