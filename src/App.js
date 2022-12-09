import "./App.css";
import Skeleton from "@mui/material/Skeleton";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Welcome = React.lazy(() => import("./components/Welcome"));
const Signup = React.lazy(() => import("./components/Signup"));
const Success = React.lazy(() => import("./components/Success"));

function App() {
  const routesData = [
    { path: "/", component: <Welcome /> },
    { path: "/signup", component: <Signup /> },
    { path: "/success", component: <Success /> }
  ];
  return (
    <div className="main">
      <Router>
        <Routes>
          {routesData.map((data, index) => {
            return (
              <Route
                key={index}
                path={data.path}
                element={
                  <Suspense
                    fallback={
                      <div className="content">
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={"30em"}
                        />
                      </div>
                    }
                  >
                    {data.component}
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
