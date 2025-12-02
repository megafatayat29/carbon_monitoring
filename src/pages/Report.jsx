import React, { useState } from "react";
import { FileText, Download, CheckCircle, BarChart2, Leaf, Building2, Users, PieChart, Info, X, TrendingDown, TrendingUp } from "lucide-react";

// --- Data Mock untuk Summary ---
const summaryData = [
    { title: "Total Emisi (Scope 2)", value: "28.5 tCO₂", icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
    { title: "Pengurangan Tahun Ini", value: "-12.4%", icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
    { title: "Offset PLTS", value: "15.2 tCO₂", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Rasio Kehadiran Training", value: "98.5%", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
];

// --- Data Mock untuk Struktur Laporan ---
const structure = [
    {
        title: "Environment (E)",
        icon: Leaf,
        color: "text-emerald-700",
        items: [
            "Scope 2 Carbon Emission Summary (GHG Protocol)",
            "Energy Consumption Breakdown (AC, Lighting, IT)",
            "Renewable Energy Offset (PLTS Solar)",
            "Water & Waste Management Performance",
            "Paperless & Digitalization Impact",
        ]
    },
    {
        title: "Social (S)",
        icon: Users,
        color: "text-indigo-700",
        items: [
            "Employee Training & Engagement Metrics",
            "Health & Safety Compliance (K3)",
            "Customer Digital Experience & Accessibility",
            "Corporate Social Responsibility (CSR) Initiatives",
        ]
    },
    {
        title: "Governance (G)",
        icon: CheckCircle,
        color: "text-amber-700",
        items: [
            "Regulatory Compliance (OJK, GRI, ISO)",
            "Sustainability Policy & Risk Management",
            "Ethical Operations & Anti-Corruption Measures",
            "Data Privacy & Cybersecurity Policy",
        ]
    },
];

const ReportPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGeneratePdf = () => {
        setIsModalOpen(true);
    };

    const SummaryCard = ({ data }) => (
        <div className="bg-white rounded-xl shadow-lg border p-6 flex items-center justify-between transition-shadow duration-300 hover:shadow-xl">
            <div>
                <p className="text-sm text-gray-500 font-medium">{data.title}</p>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{data.value}</h2>
            </div>
            <div className={`p-3 rounded-full ${data.bg}`}>
                <data.icon className={`w-7 h-7 ${data.color}`} />
            </div>
        </div>
    );

    const InfoModal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                    <div className="flex justify-between items-start border-b pb-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Info className="w-6 h-6 text-blue-600" />
                            PDF Generator Info
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Fungsi *Generate Report (PDF)* belum diimplementasikan. 
                        Untuk versi produksi, fitur ini akan terintegrasi dengan layanan backend untuk menyusun dokumen sesuai standar GRI dan OJK.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* Modal for Info */}
            <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* HEADER */}
            <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-lg border">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        Reporting Center
                    </h2>
                    <p className="mt-1 text-lg text-gray-500">
                        Menyusun laporan berdasarkan data real-time, sesuai standar OJK, GRI, & ISO 14064.
                    </p>
                </div>

                <button
                    onClick={handleGeneratePdf}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-semibold"
                >
                    <Download className="w-5 h-5" />
                    Generate Report (PDF)
                </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} data={data} />
                ))}
            </div>

            {/* SECTIONS: Structure & Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 border mt-8">
                <h3 className="font-extrabold text-2xl flex items-center gap-3 mb-6 text-gray-800">
                    <BarChart2 className="w-6 h-6 text-indigo-600" />
                    Struktur Laporan & Metrik Utama
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {structure.map((section, index) => (
                        <div key={index} className="border-l-4 border-gray-100 pl-4 py-2">
                            <h4 className="font-bold flex items-center gap-2 text-xl mb-3">
                                <section.icon className={`w-6 h-6 ${section.color}`} />
                                <span className={section.color}>{section.title}</span>
                            </h4>
                            <ul className="text-gray-700 mt-2 space-y-2 ml-2">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start text-base">
                                        <CheckCircle className={`w-4 h-4 mt-1 mr-2 ${section.color.replace('-700', '-500')}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* NOTES & GUIDANCE */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800 border-b pb-2 mb-4">
                    <Info className="w-5 h-5 text-indigo-600" />
                    Kepatuhan & Metodologi
                </h3>

                <p className="text-gray-700 leading-relaxed">
                    Laporan ini secara otomatis mengacu pada pedoman Otoritas Jasa Keuangan (OJK) - 
                    <b className="text-indigo-600"> SEOJK 16/2021</b> dan kerangka kerja 
                    <b className="text-indigo-600"> GRI Standards 2021</b>.
                </p>

                <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                    <li>Semua perhitungan emisi dilakukan sesuai <b className="font-bold">GHG Protocol Scope 2</b> (Energy Indirect).</li>
                    <li>Output PLTS dihitung sebagai <b className="font-bold">renewable energy offset</b> untuk mengurangi emisi bersih.</li>
                    <li>Data Sosial & Tata Kelola diambil dari modul HR & Compliance.</li>
                </ul>
            </div>
        </div>
    );
}

export default ReportPage;
