import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  ThermometerSnowflake, 
  Zap, 
  Leaf, 
  TrendingDown, 
  Target, 
  PieChart as PieChartIcon,
  Activity,
  Building
} from 'lucide-react';
import Papa from "papaparse";
import LayoutWrapper from "../components/LayoutWrapper";

// ==== copy juga helper & hooks dari App (loadCSV, useState, useEffect, useMemo, dll) ====
import { useEffect, useMemo, useState } from "react";

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

export default function DashboardPage({ energyData, baselineTargets }) {
  const aggregated = useMemo(() => {
    if (energyData.length === 0) return null;

    let totalKwh = 0;
    const floorKwh = {};
    const categoryKwh = {};
    const dailyKwh = {};

    energyData.forEach((row) => {
      const kwh = row.kwh || 0;
      const floor = row.floor;
      const category = row.category;

      totalKwh += kwh;

      floorKwh[floor] = (floorKwh[floor] || 0) + kwh;
      categoryKwh[category] = (categoryKwh[category] || 0) + kwh;

      const date = row.timestamp?.split(" ")[0];
      if (date) {
        dailyKwh[date] = (dailyKwh[date] || 0) + kwh;
      }
    });

    return { totalKwh, floorKwh, categoryKwh, dailyKwh };
  }, [energyData]);

  if (!aggregated || baselineTargets.length === 0) {
    return <div className="p-10 text-gray-500">Memuat data...</div>;
  }

  // KPI Calculations
  const totalCO2_kg = aggregated.totalKwh * EMISSION_FACTOR;
  const totalCO2_ton = totalCO2_kg / 1000;
  const netCO2_ton = Math.max(0, totalCO2_ton - PLTS_OFFSET_TON_PER_YEAR);

  // Chart Data Preparation
  const floorChartData = Object.entries(aggregated.floorKwh).map(
    ([floor, kwh]) => ({
      floor: `Lantai ${floor}`,
      consumption: kwh,
      emission: (kwh * EMISSION_FACTOR) / 1000,
    })
  ).sort((a, b) => parseInt(a.floor.replace('Lantai ', '')) - parseInt(b.floor.replace('Lantai ', '')));

  const categoryChartData = Object.entries(aggregated.categoryKwh).map(
    ([cat, kwh]) => ({
      name: cat,
      kwh,
      co2: (kwh * EMISSION_FACTOR) / 1000,
    })
  );

  // Get last 7 days of data, sorted by date
  const sortedDailyKwh = Object.entries(aggregated.dailyKwh)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));
    
  const dailyChartData = sortedDailyKwh
    .slice(-7)
    .map(([date, kwh]) => ({
      date: date.split("-").slice(1).join("/"),
      kwh,
      co2: (kwh * EMISSION_FACTOR) / 1000,
    }));

  // Target Calculations
  const baseline2023 = baselineTargets.find((t) => t.year === 2023);
  const target2025 = baselineTargets.find((t) => t.year === 2025);
  const baselineEmission_ton = (baseline2023.total_kwh * EMISSION_FACTOR) / 1000;
  const targetReduction_ton = baselineEmission_ton * (target2025.target_reduction_pct / 100);
  const targetEmission_ton = baselineEmission_ton - targetReduction_ton;
  
  // Calculate progress towards reduction target
  const currentReduction = baselineEmission_ton - netCO2_ton;
  const progress = Math.min(
    100,
    Math.max(0, (currentReduction / targetReduction_ton) * 100)
  );

  const COLORS = ["#0ea5e9", "#f97316", "#10b981", "#ef4444", "#8b5cf6"];

  const kpis = [
    {
      title: "Total Energi",
      value: `${aggregated.totalKwh.toFixed(1)} kWh`,
      change: "+2.1% (vs. previous month)",
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Emisi Kotor (Gross)",
      value: `${totalCO2_ton.toFixed(2)} tCO₂`,
      change: "+1.8% (vs. previous month)",
      icon: ThermometerSnowflake,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      title: "Offset PLTS",
      value: `${PLTS_OFFSET_TON_PER_YEAR} tCO₂`,
      change: "✓ Kapasitas Penuh",
      icon: Leaf,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      title: "Emisi Bersih (Net)",
      value: `${netCO2_ton.toFixed(2)} tCO₂`,
      change: progress > 0 ? `${progress.toFixed(1)}% Progress` : '0% Progress',
      icon: TrendingDown,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="w-full space-y-8 pb-12">
      {/* KPI Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const isPositiveChange = kpi.change.includes("✓") || kpi.change.includes("Progress");
          const isNegativeTrend = kpi.change.startsWith("+");

          return (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {kpi.title}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      isPositiveChange
                        ? "text-green-600"
                        : isNegativeTrend
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {kpi.change}
                  </p>
                </div>
                <div className={`${kpi.bg} p-4 rounded-full`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-white rounded-xl shadow-lg p-6 border">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-blue-800">
          <Target className="h-6 w-6" /> Target Reduksi Karbon 2025
        </h2>

        <div className="space-y-4">
          
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-600">Baseline (2023)</span>
              <span className="text-blue-600">{baselineEmission_ton.toFixed(1)} tCO₂</span>
            </div>
            <div className="mt-1 bg-blue-100 h-2 rounded-full">
              <div className="bg-blue-600 h-2 rounded-full w-full"></div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-600">Target Akhir (2025)</span>
              <span className="text-emerald-600">{targetEmission_ton.toFixed(1)} tCO₂</span>
            </div>
            <div className="mt-1 bg-emerald-100 h-2 rounded-full">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{
                  width: `${(targetEmission_ton /
                    baselineEmission_ton) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-600">Saat Ini (Maret 2025)</span>
              <span className="text-amber-600">{netCO2_ton.toFixed(1)} tCO₂</span>
            </div>
            <div className="mt-1 bg-amber-100 h-2 rounded-full">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{
                  width: `${(netCO2_ton /
                    baselineEmission_ton) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-green-50 shadow-inner">
            <div className="flex justify-between font-bold text-lg text-green-700">
              <span>Progress Pencapaian Target Reduksi</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="bg-gray-200 h-5 rounded-full mt-2">
              <div
                className="h-5 rounded-full bg-green-500 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Daily Line Chart */}
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Energi & Emisi Harian (7 Hari Terakhir)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" stroke="#3b82f6" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" label={{ value: 'tCO₂', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="kwh" name="Energy (kWh)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="co2" name="CO₂ (t)" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Floor Bar Chart */}
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-red-600" />
            Penggunaan Energi Berdasarkan Lantai
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={floorChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" label={{ value: 'Konsumsi (kWh)', position: 'bottom' }} />
                <YAxis type="category" dataKey="floor" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumption" name="Energi (kWh)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="emission" name="Emisi (tCO₂)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <PieChartIcon className="h-6 w-6 text-blue-800" />
            Distribusi Energi Berdasarkan Kategori
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    dataKey="kwh"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    innerRadius={60}
                    paddingAngle={3}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value.toFixed(1)} kWh`, 'Konsumsi Energi']}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend/Breakdown List */}
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-gray-700 border-b pb-2">Kontributor Utama Emisi</h4>
              {categoryChartData
                .sort((a, b) => b.kwh - a.kwh)
                .slice(0, 5)
                .map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3 shrink-0" 
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      ></div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">
                      {item.kwh.toFixed(0)} kWh <span className="text-sm text-gray-500 ml-1">({((item.kwh / aggregated.totalKwh) * 100).toFixed(1)}%)</span>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
