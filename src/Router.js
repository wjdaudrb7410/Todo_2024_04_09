import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes";
import { FoF } from "./pages/pg404/FoF";
import { Register } from "./pages/Register/Register";

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.FoF} element={<FoF />} />
      </Routes>
    </HashRouter>
  );
};
