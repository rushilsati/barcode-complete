import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScanProvider from "./Context/ScanContext";
import ScannedCodePage from "./pages/ScannedCodePage/ScannedCodePage";
import AllTimeScannedCodePage from "./pages/AllTimeScannedCodePage/AllTimeScannedCodePage";

const App = () => {
  return (
    <div>
      <ScanProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ScannedCodePage />} />
            <Route path="/" element={<AllTimeScannedCodePage />} />
          </Routes>
        </Router>
      </ScanProvider>
    </div>
  );
};

export default App;
