import React, { useState, useEffect, useMemo } from "react";
import { 
  Building, 
  Calendar,
  Zap, 
  Leaf, 
  Target, 
  PieChart as PieChartIcon,
  Lightbulb,
  FileText,
  Recycle,
  Car,
  TrendingUp,
} from 'lucide-react';
import Papa from "papaparse"; // Untuk parsing CSV
import DashboardPage from "./pages/Dashboard"
import EnergyMonitoringPage from "./pages/EnergyMonitoring"
import SolarPvPage from "./pages/SolarPV"
import ActionPlanPage from "./pages/ActionPlan"
import DigitalizationPage from "./pages/Digitalization"
import WastePage from "./pages/Waste"
import TransportSimulationPage from "./pages/Transport"
import SustainabilityInsightPage from "./pages/Sustainability"
import ReportPage from "./pages/Report"
// ---------- helper load CSV ----------
const loadCSV = async (path) => {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
};

const EMISSION_FACTOR = 0.85;
const PLTS_OFFSET_TON_PER_YEAR = 15.2;

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [energyData, setEnergyData] = useState([]);
  const [baselineTargets, setBaselineTargets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const energy = await loadCSV("/carbon_monitoring/data/energy_reading_full_month.csv");
        const baseline = await loadCSV("/carbon_monitoring/data/baseline_target.csv");
        setEnergyData(energy);
        setBaselineTargets(baseline);
      } catch (error) {
        console.error("Gagal memuat data CSV:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const navItems = [
    { id: "dashboard", title: "Dashboard", icon: PieChartIcon },
    { id: "energy", title: "Energy Monitoring", icon: Zap },
    { id: "solar", title: "Solar PV & Offset", icon: Leaf },
    { id: "action-plan", title: "Carbon Action Plan", icon: Target },
    { id: "digitalization", title: "Digitalization & Paperless", icon: Lightbulb },
    { id: "waste", title: "Waste Management", icon: Recycle },
    { id: "transport", title: "Transportation", icon: Car },
    { id: "insight", title: "Sustainability Insight", icon: TrendingUp },
    { id: "report", title: "Report", icon: FileText },
  ];

  const renderContent = () => {
    if (isLoading) {
      return <div className="p-10 text-xl font-medium text-gray-500">Memuat data dan sistem...</div>;
    }
    
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage energyData={energyData} baselineTargets={baselineTargets} />;
      case "energy":
        return <EnergyMonitoringPage title="Energy Monitoring" icon={Zap} />;
      case "solar":
        return <SolarPvPage title="Solar PV & Offset" icon={Leaf} />;
      case "action-plan":
        return <ActionPlanPage title="Carbon Action Plan" icon={Target} />;
      case "digitalization":
        return <DigitalizationPage title="Digitalization & Paperless" icon={Lightbulb} />;
      case "waste":
        return <WastePage title="Waste Management" icon={Recycle} />;
      case "transport":
        return <TransportSimulationPage title="Transportation" icon={Car} />;
      case "insight":
        return <SustainabilityInsightPage title="Sustainability Insight" icon={TrendingUp} />;
      case "report":
        return <ReportPage title="Report" icon={FileText} />;
      default:
        return <MockPage title="404 - Page Not Found" icon={FileText} />;
    }
  };

  return (
    // FIX: Added 'w-screen' to ensure the outermost container fills the screen width.
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* SIDEBAR */}
      <aside className="bg-white border-r w-full md:w-64 p-4 flex-shrink-0">
        <div className="px-3 py-4 border-b">
          <div className="flex items-center gap-2">
            <Building className="w-7 h-7 text-blue-600" />
            <div>
              <p className="text-sm font-bold text-gray-800">BAF Plaza</p>
              <p className="text-xs text-gray-500">Carbon System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.title}
              </a>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t text-xs text-gray-400">
          © 2025 BAF
        </div>
      </aside>

      {/* KANAN: HEADER + CONTENT */}
      {/* FIX: Added min-w-0 and overflow-x-hidden to prevent horizontal scroll/overflow issues in flex layout */}
      <div className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
        {/* HEADER */}
        <header className="bg-white w-full shadow-lg mb-8 flex-shrink-0">
          <div className="w-full flex justify-between items-center px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                <Building className="h-7 w-7 text-blue-600" />
                BAF Plaza Carbon Tracker
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Calendar className="h-4 w-4" />
                {navItems.find(item => item.id === currentPage)?.title}
              </p>
            </div>
          </div>
        </header>

        {/* CONTENT (untuk di-export PDF) */}
        <main
          id="dashboard-content"
          className="px-4 md:px-6 lg:px-8 max-w-7xl w-full mx-auto flex-grow"
        >
          {renderContent()}
        </main>
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-12 pb-8 w-full flex-shrink-0">
          <p>© 2025 PT Bussan Auto Finance — Carbon Dashboard v1.1 (Layout Fix)</p>
          <p className="mt-1">
            Data sourced from IoT sub-metering system • GHG Protocol Scope 2 compliant
          </p>
        </div>
      </div>
    </div>
  );
}