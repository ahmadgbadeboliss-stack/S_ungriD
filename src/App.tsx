import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./contexts/ToastContext";
import AboutPage from "./pages/about";
import ImpactPage from "./pages/impact";
import FeaturesPage from "./pages/features";
import HomePage from "./pages/home";
import WalletLoginPage from "./pages/walletlogin";
import DashboardPage from "./pages/dashboard";
import MarketplacePage from "./pages/marketplace";


// Main App Component
function App() {
  return (
    // <ToastProvider>
    //   <Router>
    //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    //       <Navigation />
    //       <Routes>
    //         <Route path="/" element={<HomePage />} />
    //         <Route path="/about" element={<AboutPage />} />
    //         <Route path="/features" element={<FeaturesPage />} />
    //         <Route path="/marketplace" element={
    //           // <ProtectedRoute>
    //             <MarketplacePage />
    //           // {/* </ProtectedRoute> */}
    //         } />
    //         <Route path="/impact" element={<ImpactPage />} />
    //         <Route path="/wallet-login" element={<WalletLoginPage />} />
    //         <Route path="/dashboard" element={
    //           // <ProtectedRoute>
    //             <DashboardPage />
    //           //</ProtectedRoute>
    //         } />
    //       </Routes>
    //       <Footer />
    //     </div>
    //   </Router>
    // </ToastProvider>

    <Router>
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/wallet-login" element={<WalletLoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
