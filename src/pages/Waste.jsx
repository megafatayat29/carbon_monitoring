import React from "react";
import { Trash2, Recycle, Leaf, TrendingUp, TrendingDown, Factory, CheckCircle, Clock, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Data Mock untuk Chart ---
const wasteTrendData = [
    { month: 'Jan', total_waste: 180, recycled: 45, non_recycled: 135 },
    { month: 'Feb', total_waste: 175, recycled: 50, non_recycled: 125 },
    { month: 'Mar', total_waste: 160, recycled: 40, non_recycled: 120 },
    { month: 'Apr', total_waste: 155, recycled: 45, non_recycled: 110 },
    { month: 'May', total_waste: 150, recycled: 55, non_recycled: 95 },
    { month: 'Jun', total_waste: 145, recycled: 60, non_recycled: 85 },
];

// --- Data Mock untuk Detail Program ---
const initiativeDetails = [
    { initiative: 'Pemisahan Sampah Kantor', target: '90%', status: 'On Track', impact: '25% Recycled Ratio', color: 'text-green-600', icon: Clock },
    { initiative: 'Pengurangan Penggunaan Plastik Sekali Pakai', target: '80% Reduction', status: 'Completed', impact: '110 kg Plastik Dihindari', color: 'text-emerald-600', icon: CheckCircle },
    { initiative: 'Program Pengumpulan E-Waste', target: 'Twice Annually', status: 'In Progress', impact: 'Menunggu Vendor Pickup', color: 'text-blue-600', icon: Clock },
    { initiative: 'Pengelolaan Sampah Makanan (Food Waste)', target: '10% Reduction', status: 'Delayed', impact: 'Perlu Edukasi Lanjut', color: 'text-amber-500', icon: XCircle },
];

// --- Komponen Card Metrik ---
const MetricCard = ({ title, value, unit, icon: Icon, colorClass, secondaryText, secondaryColorClass }) => (
    <div className="bg-white rounded-xl shadow-lg p-5 border transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="mt-1 flex items-baseline">
                    <span className={`text-3xl font-extrabold text-gray-900`}>{value}</span>
                    {unit && <span className="ml-2 text-md font-medium text-gray-500">{unit}</span>}
                </div>
                {secondaryText && (
                    <p className={`text-sm flex items-center gap-1 mt-1 ${secondaryColorClass}`}>
                        {secondaryColorClass.includes('red') ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                        {secondaryText}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-')} bg-opacity-10 ring-4 ${colorClass.replace('text-', 'ring-opacity-20 ring-')}`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
        </div>
    </div>
);

const WastePage = () => {
    // Fungsi untuk mendapatkan label yang benar berdasarkan key data
    const getTooltipLabel = (name) => {
        switch (name) {
            case 'total_waste':
                return 'Total Sampah';
            case 'recycled':
                return 'Didaur Ulang';
            case 'non_recycled':
                return 'Tidak Didaur Ulang';
            default:
                return name;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* HEADER */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Trash2 className="w-8 h-8 text-red-600" />
                    Waste Management
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Dashboard untuk memantau volume dan efisiensi pengelolaan sampah kantor BAF Plaza.
                </p>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <MetricCard
                    title="Total Sampah (YTD)"
                    value="1,240"
                    unit="kg"
                    icon={Trash2}
                    colorClass="text-red-600"
                    secondaryText="-4% vs Tahun Lalu"
                    secondaryColorClass="text-green-600" // Menampilkan hijau karena penurunan sampah adalah positif
                />

                <MetricCard
                    title="Sampah Didaur Ulang"
                    value="310"
                    unit="kg"
                    icon={Recycle}
                    colorClass="text-green-600"
                    secondaryText="25% Recycled Ratio"
                    secondaryColorClass="text-green-600"
                />

                <MetricCard
                    title="Sampah Non-Daur Ulang"
                    value="720"
                    unit="kg"
                    icon={Factory}
                    colorClass="text-amber-500"
                    secondaryText="Target < 700 kg"
                    secondaryColorClass="text-red-500"
                />

                <MetricCard
                    title="Limbah B3 (Berbahaya)"
                    value="12"
                    unit="kg"
                    icon={XCircle}
                    colorClass="text-gray-900"
                    secondaryText="Terdata & Terkelola"
                    secondaryColorClass="text-blue-600"
                />
            </div>

            {/* CHART: Waste Trend */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Factory className="w-6 h-6 text-red-600" />
                    Tren Pengelolaan Sampah (kg/Bulan)
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Perbandingan antara volume sampah yang didaur ulang dan non-daur ulang.
                </p>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={wasteTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" label={{ value: 'Volume Sampah (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }} />
                            <Tooltip
                                // Formatter untuk membedakan label
                                formatter={(value, name) => [value.toLocaleString(), getTooltipLabel(name)]}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '10px' }} />
                            <Bar dataKey="recycled" fill="#10b981" name="Didaur Ulang" radius={[4, 4, 0, 0]} stackId="a" />
                            <Bar dataKey="non_recycled" fill="#ef4444" name="Tidak Didaur Ulang" radius={[4, 4, 0, 0]} stackId="a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* TABLE: Waste Reduction Initiatives */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-700" />
                    Inisiatif Pengurangan Sampah
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Status dan dampak dari program-program utama pengelolaan sampah.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program / Inisiatif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dampak Utama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {initiativeDetails.map((detail, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {detail.initiative}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                        {detail.target}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {detail.impact}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${detail.color.replace('text-', 'bg-')} bg-opacity-10 ${detail.color}`}>
                                            <detail.icon className="w-4 h-4" />
                                            {detail.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default WastePage;