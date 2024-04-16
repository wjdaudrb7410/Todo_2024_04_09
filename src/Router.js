import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes";
import { FoF } from "./pages/pg404/FoF";
import { Register } from "./pages/Register/Register";
import { Todos } from "./pages/Todo/Todos";
import { Footer } from "./components/Footer";

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.FoF} element={<FoF />} />
        <Route path={routes.todo} element={<Todos />} />
      </Routes>
      <Footer></Footer>
    </HashRouter>
  );
};
