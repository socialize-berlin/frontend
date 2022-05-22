import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Homepage } from "./pages/Homepage";
import { TermsConditions } from "./pages/TermsConditions";
import { SetNewPassword } from "./pages/SetNewPassword";
import { Impressum } from "./pages/Impressum";
import { ThanksForVoting } from "./modals/ThanksForVoting";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/reset-password/:uuid/" element={<SetNewPassword />} />
        </Routes>
        <ThanksForVoting />
      </Router>
    </div>
  );
}

export default App;
