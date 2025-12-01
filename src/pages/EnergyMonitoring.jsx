import React from 'react';
import { Activity, Building, Zap, TrendingUp, DollarSign, RefreshCw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Data Mock untuk Chart
const floorConsumptionData = [
  { floor: 'Lantai 1', kWh: 2800 },
  { floor: 'Lantai 2', kWh: 2500 },
  { floor: 'Lantai 3', kWh: 2200 },
  { floor: 'Lantai 4', kWh: 1900 },
  { floor: 'Lantai 5', kWh: 1500 },
  { floor: 'Lantai 6', kWh: 1300 },
  { floor: 'Lantai 7', kWh: 900 },
  { floor: 'Lantai 8', kWh: 700 },
];

const dailyLoadProfileData = [
  { time: '00:00', load: 150 },
  { time: '03:00', load: 120 },
  { time: '06:00', load: 300 },
  { time: '09:00', load: 650 },
  { time: '12:00', load: 800 },
  { time: '15:00', load: 720 },
  { time: '18:00', load: 450 },
  { time: '21:00', load: 250 },
  { time: '23:59', load: 180 },
];

const loadCategoryData = [
    { name: 'AC', value: 4500, color: '#3b82f6' },
    { name: 'Lighting', value: 2100, color: '#f59e0b' },
    { name: 'IT', value: 1500, color: '#10b981' },
    { name: 'Elevator', value: 900, color: '#ef4444' },
    { name: 'Other', value: 1000, color: '#6366f1' },
];
const COLORS = loadCategoryData.map(d => d.color);

// Komponen Card Metrik
const MetricCard = ({ title, value, unit, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-xl shadow-lg p-5 border transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="mt-1 flex items-baseline">
                    <span className={`text-3xl font-extrabold ${colorClass}`}>{value}</span>
                    <span className="ml-2 text-md font-medium text-gray-500">{unit}</span>
                </div>
            </div>
            <div className={`p-3 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')} ring-4 ${colorClass.replace('text-', 'ring-opacity-20 ring-')}`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
        </div>
    </div>
);


const EnergyMonitoringPage = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('7 days');
    const [selectedFloor, setSelectedFloor] = React.useState('Semua Lantai');
    const [selectedCategory, setSelectedCategory] = React.useState('Semua');

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
                    Energy Monitoring Dashboard
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Analisis mendalam penggunaan energi gedung dan peluang efisiensi.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg p-5 mt-6 border flex flex-wrap gap-4 items-end">
                <div className="w-full sm:w-auto">
                    <label htmlFor="period-select" className="block text-xs font-semibold text-gray-600 mb-1">Periode</label>
                    <select
                        id="period-select"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                    >
                        <option value="7 days">7 hari terakhir</option>
                        <option value="30 days">30 hari terakhir</option>
                        <option value="Q1">Q1 2025</option>
                        <option value="YTD">Year-to-Date</option>
                    </select>
                </div>
                <div className="w-full sm:w-auto">
                    <label htmlFor="floor-select" className="block text-xs font-semibold text-gray-600 mb-1">Lantai</label>
                    <select
                        id="floor-select"
                        value={selectedFloor}
                        onChange={(e) => setSelectedFloor(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                    >
                        <option>Semua Lantai</option>
                        {Array.from({ length: 8 }, (_, i) => <option key={i}>Lantai {i + 1}</option>)}
                    </select>
                </div>
                <div className="w-full sm:w-auto">
                    <label htmlFor="category-select" className="block text-xs font-semibold text-gray-600 mb-1">Kategori Beban</label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                    >
                        <option>Semua</option>
                        <option>AC</option>
                        <option>Lighting</option>
                        <option>IT</option>
                        <option>Elevator</option>
                        <option>Other</option>
                    </select>
                </div>
                <button
                    className="ml-auto flex items-center gap-1 bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition duration-150"
                >
                    <RefreshCw className="w-4 h-4" />
                    Apply Filter
                </button>
            </div>

            {/* Metrik Utama */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Konsumsi"
                    value="12.8"
                    unit="MWh"
                    icon={Zap}
                    colorClass="text-blue-600"
                />
                <MetricCard
                    title="Biaya Est. Periode Ini"
                    value="Rp 21.5 Jt"
                    unit=""
                    icon={DollarSign}
                    colorClass="text-green-600"
                />
                <MetricCard
                    title="Pola Penggunaan"
                    value="+4.2%"
                    unit="vs. Periode Lalu"
                    icon={TrendingUp}
                    colorClass="text-red-500"
                />
                <MetricCard
                    title="Rata-rata Harian"
                    value="1.83"
                    unit="MWh/day"
                    icon={Activity}
                    colorClass="text-yellow-600"
                />
            </div>

            {/* Grid Chart Detail */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Konsumsi Energi per Lantai (Bar Chart) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <Building className="w-6 h-6 text-indigo-600" />
                        Konsumsi Energi per Lantai (kWh)
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Tampilkan perbandingan konsumsi di setiap lantai. Lantai {floorConsumptionData.find(d => d.floor === 'Lantai 1')?.kWh} kWh adalah yang tertinggi.
                    </p>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={floorConsumptionData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="floor" stroke="#6b7280" angle={-15} textAnchor="end" height={50} style={{ fontSize: '12px' }} />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    formatter={(value) => [`${value.toLocaleString()} kWh`, 'Konsumsi']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="kWh" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Distribusi Beban per Kategori (Pie Chart) */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-green-600" />
                        Distribusi Beban (Total: 10 MWh)
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Persentase konsumsi berdasarkan kategori beban utama.
                    </p>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <Pie
                                    data={loadCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                >
                                    {loadCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [`${value.toLocaleString()} kWh`, props.payload.name]}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Profil Beban Harian (Line Chart) */}
                <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-pink-600" />
                        Profil Beban Harian (kWh vs Jam)
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Menggambarkan pola penggunaan energi dalam 24 jam terakhir. Puncak beban terjadi pada jam 12:00.
                    </p>
                    <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyLoadProfileData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="time" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" label={{ value: 'Daya (kW)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }} />
                                <Tooltip
                                    formatter={(value) => [`${value.toLocaleString()} kW`, 'Daya']}
                                    labelFormatter={(label) => `Waktu: ${label}`}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                <Line
                                    type="monotone"
                                    dataKey="load"
                                    stroke="#8884d8"
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                    name="Daya (kW)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Untuk memastikan Recharts berfungsi dengan benar dalam satu file,
// kita akan mengekspor komponen utama sebagai App.
export default EnergyMonitoringPage;