import React from 'react';
import { Sun, Leaf, Activity, Battery, TrendingUp, TrendingDown, Clock, CloudOff, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- Data Mock untuk Chart ---
const dailyProductionData = [
  { day: 'Sen', actual: 450, expected: 480 },
  { day: 'Sel', actual: 480, expected: 500 },
  { day: 'Rab', actual: 390, expected: 450 }, // Lower due to weather/performance issue
  { day: 'Kam', actual: 510, expected: 500 },
  { day: 'Jum', actual: 520, expected: 510 },
  { day: 'Sab', actual: 470, expected: 490 },
  { day: 'Min', actual: 420, expected: 450 },
];

const inverterPerformanceData = [
    { id: 'INV-001', model: 'A3000', currentPower: 12.5, status: 'Online', efficiency: 98.2 },
    { id: 'INV-002', model: 'A3000', currentPower: 12.3, status: 'Online', efficiency: 97.9 },
    { id: 'INV-003', model: 'B5000', currentPower: 15.1, status: 'Online', efficiency: 98.5 },
    { id: 'INV-004', model: 'B5000', currentPower: 0.0, status: 'Error', efficiency: 0.0 },
];

// --- Komponen Card Metrik (Diperbarui dengan styling modern) ---
const MetricCard = ({ title, value, unit, icon: Icon, colorClass, secondaryText, secondaryColorClass }) => (
    <div className="bg-white rounded-xl shadow-lg p-5 border transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="mt-1 flex items-baseline">
                    <span className={`text-3xl font-extrabold text-gray-900`}>{value}</span>
                    <span className="ml-2 text-md font-medium text-gray-500">{unit}</span>
                </div>
                {secondaryText && (
                    <p className={`text-sm flex items-center gap-1 mt-1 ${secondaryColorClass}`}>
                        {secondaryColorClass.includes('green') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {secondaryText}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')} ring-4 ${colorClass.replace('text-', 'ring-opacity-20 ring-')}`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
        </div>
    </div>
);

// --- Komponen Utama ---
const SolarPvPage = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('7 days');
    const [selectedInverter, setSelectedInverter] = React.useState('Semua Inverter');

    // Fungsi untuk mendapatkan warna status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Online':
                return 'text-green-600 bg-green-100';
            case 'Error':
                return 'text-red-600 bg-red-100';
            case 'Warning':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-500 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Sun className="w-8 h-8 text-yellow-500" />
                    Solar PV & Carbon Offset Monitoring
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Monitoring performa Pembangkit Listrik Tenaga Surya (PLTS) dan kontribusi offset karbon.
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
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-yellow-500 focus:border-yellow-500 transition-all shadow-inner"
                    >
                        <option value="7 days">7 hari terakhir</option>
                        <option value="30 days">30 hari terakhir</option>
                        <option value="Q1">Bulan Ini</option>
                        <option value="YTD">Tahun Ini</option>
                    </select>
                </div>
                <div className="w-full sm:w-auto">
                    <label htmlFor="inverter-select" className="block text-xs font-semibold text-gray-600 mb-1">Inverter</label>
                    <select
                        id="inverter-select"
                        value={selectedInverter}
                        onChange={(e) => setSelectedInverter(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-yellow-500 focus:border-yellow-500 transition-all shadow-inner"
                    >
                        <option>Semua Inverter</option>
                        <option>INV-001</option>
                        <option>INV-002</option>
                        <option>INV-003</option>
                        <option>INV-004</option>
                    </select>
                </div>
                <button
                    className="ml-auto flex items-center gap-1 bg-yellow-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-yellow-700 transition duration-150"
                >
                    <Clock className="w-4 h-4" />
                    Load Data
                </button>
            </div>

            {/* Metrik Utama */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Produksi PLTS"
                    value="3,240"
                    unit="kWh"
                    icon={Sun}
                    colorClass="text-yellow-600"
                    secondaryText="+12% vs bulan lalu"
                    secondaryColorClass="text-green-600"
                />
                <MetricCard
                    title="Offset Karbon"
                    value="15.2"
                    unit="tCO₂"
                    icon={Leaf}
                    colorClass="text-green-600"
                    secondaryText="Setara 700 pohon"
                    secondaryColorClass="text-blue-600"
                />
                <MetricCard
                    title="Daya Saat Ini"
                    value="40.2"
                    unit="kW"
                    icon={Zap}
                    colorClass="text-blue-600"
                    secondaryText="Produksi Maks. 50kW"
                    secondaryColorClass="text-gray-500"
                />
                <MetricCard
                    title="Rata-rata Harian"
                    value="462"
                    unit="kWh/day"
                    icon={Activity}
                    colorClass="text-orange-600"
                    secondaryText="-3.1% dari Ekspektasi"
                    secondaryColorClass="text-red-500"
                />
            </div>

            {/* GRID CHART DAN TABLE */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. Produksi Harian (Line Chart) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                        Produksi Energi Harian (kWh)
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Perbandingan antara produksi aktual vs target/ekspektasi.
                    </p>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyProductionData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="day" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" label={{ value: 'Produksi (kWh)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }} />
                                <Tooltip
                                    formatter={(value) => [`${value.toLocaleString()} kWh`]}
                                    labelFormatter={(label) => `Hari: ${label}`}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                <Line type="monotone" dataKey="actual" stroke="#f59e0b" strokeWidth={3} name="Aktual" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="expected" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={2} name="Ekspektasi" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Ringkasan Offset Karbon (Bar Chart) */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <Leaf className="w-6 h-6 text-green-600" />
                        Target Offset (tCO₂)
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Progress pencapaian target emisi CO₂ bulan ini.
                    </p>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[{ name: 'Target', value: 20, fill: '#34d399' }, { name: 'Aktual', value: 15.2, fill: '#10b981' }]}
                                layout="vertical"
                                barCategoryGap="20%"
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#6b7280" />
                                <Tooltip formatter={(value) => [`${value.toFixed(1)} tCO₂`]} />
                                <Bar dataKey="value" radius={[5, 5, 5, 5]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Performa Inverter (Table) */}
                <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <Battery className="w-6 h-6 text-amber-600" />
                        Detail Performa Inverter
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Daya output dan status operasional setiap inverter saat ini.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Inverter</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Daya Saat Ini (kW)</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Efisiensi (%)</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {inverterPerformanceData.map((inv) => (
                                    <tr key={inv.id} className={inv.status === 'Error' ? 'bg-red-50 hover:bg-red-100 transition-colors' : 'hover:bg-gray-50 transition-colors'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inv.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.model}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">{inv.currentPower.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{inv.efficiency.toFixed(1)}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(inv.status)}`}>
                                                {inv.status === 'Error' ? <CloudOff className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolarPvPage;