import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Spinner from "../components/Spinner";

const Generator = lazy(() => import("./Generator"));
const Contributors = lazy(() => import("./Contributors"));
const NotFound = lazy(() => import("./NotFound"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/generator"
        element={
          <Suspense fallback={<Spinner />}>
            <Generator />
          </Suspense>
        }
      />
      <Route
        path="/contributors"
        element={
          <Suspense fallback={<Spinner />}>
            <Contributors />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
