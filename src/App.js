import "./App.css";
import Skeleton from "@mui/material/Skeleton";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Welcome = React.lazy(() => import("./components/Welcome"));
const Signup = React.lazy(() => import("./components/Signup"));
const Success = React.lazy(() => import("./components/Success"));

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
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
                <Welcome />
              </Suspense>
            }
          />
          <Route
            path="/signup"
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
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/success"
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
                <Success />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
