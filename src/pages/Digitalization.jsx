import React from "react";
import { FileText, FileDigit, Leaf, TrendingUp, TrendingDown, Layers, BarChart3, Clock, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Data Mock untuk Chart ---
const documentGrowthData = [
    { month: 'Jan', paper_docs: 5000, digital_docs: 30000 },
    { month: 'Feb', paper_docs: 4800, digital_docs: 32000 },
    { month: 'Mar', paper_docs: 4000, digital_docs: 35000 },
    { month: 'Apr', paper_docs: 3500, digital_docs: 38000 },
    { month: 'May', paper_docs: 3000, digital_docs: 42000 },
    { month: 'Jun', paper_docs: 2500, digital_docs: 46000 },
];

// --- Data Mock untuk Detail Program ---
const programDetails = [
    { program: 'Digital Approval Workflow', progress: '90%', status: 'On Track', impact: '+12% Paperless', color: 'text-blue-600', icon: Clock },
    { program: 'E-Contract & Tanda Tangan Digital', progress: '100%', status: 'Completed', impact: '-1.2 tCO₂', color: 'text-green-600', icon: CheckCircle },
    { program: 'Customer Digital Onboarding (Mobile App)', progress: '30%', status: 'Delayed', impact: '~3% Improvement', color: 'text-amber-500', icon: TrendingDown },
    { program: 'Integrasi Cloud Storage', progress: '100%', status: 'Completed', impact: 'Penyimpanan aman', color: 'text-green-600', icon: CheckCircle },
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


const DigitalizationPage = () => {
    // Fungsi untuk mendapatkan label yang benar berdasarkan key data
    const getTooltipLabel = (name) => {
        switch (name) {
            case 'digital_docs':
                return 'Dokumen Digital';
            case 'paper_docs':
                return 'Dokumen Kertas';
            default:
                return name;
        }
    };

    return (
        // Mengganti LayoutWrapper dengan div yang styling-nya sesuai konteks dashboard
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* HEADER */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <FileDigit className="w-8 h-8 text-indigo-600" />
                    Digitalization & Paperless
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Monitoring proses digitalisasi dokumen dan pengurangan penggunaan kertas sebagai inisiatif ramah lingkungan.
                </p>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <MetricCard
                    title="Total Dokumen Digital"
                    value="42,000"
                    unit="Dokumen"
                    icon={FileDigit}
                    colorClass="text-indigo-600"
                    secondaryText="+18% YoY"
                    secondaryColorClass="text-green-600"
                />

                <MetricCard
                    title="Kertas Dihemat (YTD)"
                    value="420,300"
                    unit="Lembar"
                    icon={FileText}
                    colorClass="text-red-500" // Warna merah karena pengurangan (sebuah pencapaian positif)
                    secondaryText="Target 500K Lembar"
                    secondaryColorClass="text-gray-500"
                />

                <MetricCard
                    title="Dampak Offset Karbon"
                    value="6.8"
                    unit="tCO₂"
                    icon={Leaf}
                    colorClass="text-green-600"
                    secondaryText="Setara ~52 Pohon"
                    secondaryColorClass="text-emerald-600"
                />

                <MetricCard
                    title="Program Selesai"
                    value="75"
                    unit="%"
                    icon={Layers}
                    colorClass="text-blue-600"
                    secondaryText="3 dari 4 program utama"
                    secondaryColorClass="text-green-600"
                />
            </div>

            {/* CHART: Digital Document Growth & Paper Reduction */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    Tren Dokumen Digital vs. Kertas
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Perbandingan jumlah dokumen fisik dan digital per bulan.
                </p>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={documentGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" tickFormatter={(value) => `${value / 1000}K`} label={{ value: 'Jumlah Dokumen', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }} />
                            <Tooltip
                                // Memperbaiki formatter untuk membedakan label
                                formatter={(value, name) => [value.toLocaleString(), getTooltipLabel(name)]}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '10px' }} />
                            <Bar dataKey="digital_docs" fill="#4f46e5" name="Dokumen Digital" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="paper_docs" fill="#f87171" name="Dokumen Kertas" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* TABLE: Digitalization Program Detail */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-gray-600" />
                    Detail Program Digitalisasi
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Status implementasi inisiatif utama yang mendorong pengurangan kertas.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program / Inisiatif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dampak Utama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {programDetails.map((detail, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {detail.program}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                        {detail.progress}
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

export default DigitalizationPage;