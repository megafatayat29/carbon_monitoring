import React, { useState, useMemo } from 'react';
import { CheckCircle, Clock, AlertTriangle, Leaf, Target, Calendar, BarChart3, Filter, XCircle } from 'lucide-react';

// --- Data Mock untuk Action Plan ---
const initialActionPlans = [
    { id: 1, program: 'Implementasi PLTS Rooftop 50kW', status: 'Completed', timeline: '2023 Q4', impact: 15.2, progress: 100, cost: 'Low', category: 'Energy' },
    { id: 2, program: 'Digitalisasi Monitoring Energi', status: 'On Track', timeline: '2024 Q2', impact: 7.0, progress: 85, cost: 'Medium', category: 'Efficiency' },
    { id: 3, program: 'Program Paperless (Digitalisasi Dokumen)', status: 'Completed', timeline: '2023 Q3', impact: 1.8, progress: 100, cost: 'Very Low', category: 'Waste' },
    { id: 4, program: 'Penggantian AC ke Inverter & IoT', status: 'Delayed', timeline: '2025 Q1', impact: 11.0, progress: 20, cost: 'High', category: 'Energy' },
    { id: 5, program: 'Audit dan Penggantian Lampu ke LED', status: 'Blocked', timeline: '2024 Q4', impact: 3.5, progress: 10, cost: 'Medium', category: 'Efficiency' },
    { id: 6, program: 'Edukasi Pengelolaan Sampah & Daur Ulang', status: 'On Track', timeline: '2024 Q3', impact: 60, progress: 60, cost: 'Very Low', category: 'Waste' },
    { id: 7, program: 'Pemakaian Air Hujan (Rainwater Harvesting)', status: 'Planned', timeline: '2026 Q1', impact: 3.0, progress: 0, cost: 'Medium', category: 'Water' },
];

// --- Komponen Status Badge ---
const StatusBadge = ({ status }) => {
    let icon, color;
    switch (status) {
        case 'Completed':
            icon = <CheckCircle className="w-4 h-4" />;
            color = 'bg-green-100 text-green-800';
            break;
        case 'On Track':
            icon = <Clock className="w-4 h-4" />;
            color = 'bg-blue-100 text-blue-800';
            break;
        case 'Delayed':
            icon = <AlertTriangle className="w-4 h-4" />;
            color = 'bg-amber-100 text-amber-800';
            break;
        case 'Blocked':
            icon = <XCircle className="w-4 h-4" />;
            color = 'bg-red-100 text-red-800';
            break;
        case 'Planned':
            icon = <Calendar className="w-4 h-4" />;
            color = 'bg-gray-100 text-gray-800';
            break;
        default:
            icon = null;
            color = 'bg-gray-100 text-gray-800';
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
            {icon}
            {status}
        </span>
    );
};

// --- Komponen Card Metrik ---
const MetricCard = ({ title, value, unit, icon: Icon, colorClass, description }) => (
    <div className="bg-white rounded-xl shadow-lg p-5 border transition-all duration-300 hover:shadow-xl">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className="mt-1 flex items-baseline">
                    <span className={`text-3xl font-extrabold text-gray-900`}>{value}</span>
                    {unit && <span className="ml-2 text-md font-medium text-gray-500">{unit}</span>}
                </div>
                {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
            </div>
            <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-')} bg-opacity-10 ring-4 ${colorClass.replace('text-', 'ring-opacity-20 ring-')}`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
        </div>
    </div>
);


// --- Komponen Utama ---
const ActionPlanPage = () => {
    const [filterStatus, setFilterStatus] = useState('All');

    // Total metrics calculation
    const totalPrograms = initialActionPlans.length;
    const totalPotentialImpact = initialActionPlans.reduce((sum, plan) => sum + plan.impact, 0);
    const completedPrograms = initialActionPlans.filter(p => p.status === 'Completed').length;
    const overallProgress = Math.round((completedPrograms / totalPrograms) * 100);

    const filteredPlans = useMemo(() => {
        if (filterStatus === 'All') return initialActionPlans;
        return initialActionPlans.filter(plan => plan.status === filterStatus);
    }, [filterStatus]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Target className="w-8 h-8 text-indigo-600" />
                    Carbon Action Plan
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Daftar inisiatif strategis untuk mengurangi emisi dan status implementasinya.
                </p>
            </div>

            {/* KPI SUMMARY */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Inisiatif"
                    value={totalPrograms}
                    unit="Program"
                    icon={BarChart3}
                    colorClass="text-indigo-600"
                    description="Total program yang terdaftar."
                />
                <MetricCard
                    title="Potensi Pengurangan"
                    value={totalPotentialImpact.toFixed(1)}
                    unit="tCO₂"
                    icon={Leaf}
                    colorClass="text-green-600"
                    description="Dampak kumulatif jika semua selesai."
                />
                 <MetricCard
                    title="Inisiatif Selesai"
                    value={completedPrograms}
                    unit="Program"
                    icon={CheckCircle}
                    colorClass="text-teal-600"
                    description="Program yang sudah rampung 100%."
                />
                <div className="bg-white rounded-xl shadow-lg p-5 border">
                    <p className="text-sm font-medium text-gray-500">Progress Keseluruhan</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{overallProgress}%</h3>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                        <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
                    </div>
                    <p className="text-xs mt-2 text-gray-500">Berdasarkan jumlah program yang selesai.</p>
                </div>
            </div>

            {/* FILTERING AND TABLE LIST */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border">
                <div className="flex justify-between items-center mb-5 border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-gray-600" />
                        Daftar Action Plan ({filteredPlans.length} / {totalPrograms})
                    </h3>
                    
                    {/* Filter Dropdown */}
                    <div className="flex items-center gap-2 text-sm">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <label htmlFor="status-filter" className="font-semibold text-gray-700">Filter Status:</label>
                        <select
                            id="status-filter"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="All">Semua Status</option>
                            <option value="Completed">Completed</option>
                            <option value="On Track">On Track</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Planned">Planned</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program / Inisiatif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Potensi Dampak (tCO₂)</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPlans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {plan.program}
                                        <div className="text-xs text-gray-400 mt-0.5">Category: {plan.category} | Cost: {plan.cost}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={plan.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.timeline}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-800">{plan.impact.toFixed(1)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex flex-col items-center">
                                            <p className="text-xs font-semibold mb-1 text-gray-700">{plan.progress}%</p>
                                            <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className="bg-indigo-400 h-1.5 rounded-full"
                                                    style={{ width: `${plan.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPlans.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-base">
                                        Tidak ada Action Plan dengan status "{filterStatus}".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ActionPlanPage;