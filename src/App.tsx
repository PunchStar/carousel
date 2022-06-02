import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import { useParams } from "react-router-dom";

import Carousel from "./pages/Carousel"
const MainRoute = () => {
  let routes = useRoutes([
    { path: "/", element:  <Carousel />},
  ]);
  return routes;
};
const App = () => {
  return (
      <Router>
        <MainRoute />
      </Router>
  );
};

export default App;
