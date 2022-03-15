import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

import Home from "./routes/Home"
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import UpdatePage from "./routes/UpdatePage"


function App() {
  return (
    <RestaurantsContextProvider>
      {/* container class will give page side margins */}
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>

  );
}

export default App;
