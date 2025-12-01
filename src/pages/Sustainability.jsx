import React from "react";
import { Lightbulb, TrendingUp, TrendingDown, Leaf, Gauge, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";

// --- Data Mock untuk Insight Cards ---
const insightsData = [
    {
        id: 1,
        title: "Peringatan Beban Puncak",
        icon: Gauge,
        color: "text-blue-600",
        summary: "Beban puncak energi terjadi pada pukul 14.00–16.00. Penyesuaian suhu AC di jam ini berpotensi menurunkan emisi hingga 3–5%.",
        detail: "AC, Lantai 5 & 6",
    },
    {
        id: 2,
        title: "Kategori dengan Kenaikan Terbesar",
        icon: TrendingUp,
        color: "text-red-600",
        summary: "Konsumsi kategori Lighting naik 8% dibandingkan bulan lalu. Penggantian lampu TL menjadi LED dapat menurunkan penggunaan hingga 12%.",
        detail: "Lighting, Lantai 1-7",
    },
    {
        id: 3,
        title: "Peluang Efisiensi Terbaik",
        icon: Leaf,
        color: "text-green-600",
        summary: "Lantai 7 menunjukkan efisiensi tertinggi (Energy Use Index terendah). Praktik operasional di lantai ini bisa dijadikan standar untuk area lain.",
        detail: "Operational, Lantai 7",
    },
    {
        id: 4,
        title: "Perlu Tindakan Segera",
        icon: AlertTriangle,
        color: "text-amber-500",
        summary: "Sistem pendingin (Chiller) di Lantai 3 menunjukkan penurunan Coefficient of Performance (COP). Disarankan menjadwalkan maintenance segera.",
        detail: "Maintenance, Lantai 3",
    },
];

// --- Komponen Card Insight ---
const InsightCard = ({ insight }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-indigo-100">
        <div className="flex items-center gap-3 mb-3">
            <insight.icon className={`w-6 h-6 ${insight.color}`} />
            <h3 className="text-lg font-bold text-gray-800">{insight.title}</h3>
        </div>
        <p className="text-gray-700 mt-2 leading-relaxed">
            {insight.summary}
        </p>
        <p className="text-sm text-gray-500 mt-3 border-t pt-2">
            Sumber Data: <span className="font-semibold">{insight.detail}</span>
        </p>
    </div>
);

// --- Komponen Utama ---
const SustainabilityInsightPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* HEADER */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Lightbulb className="w-8 h-8 text-yellow-600" />
                    Sustainability Insight
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Analisis dan rekomendasi otomatis berbasis data energi dan emisi.
                </p>
            </div>

            {/* AI STYLE EXECUTIVE SUMMARY */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8 ring-2 ring-amber-100">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                    <h3 className="text-xl font-extrabold text-gray-800">Executive Summary (Q3 2024)</h3>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                    Kinerja Q3 menunjukkan tren yang stabil. Meskipun ada peningkatan konsumsi energi sebesar 
                    <span className="font-extrabold text-blue-600"> +2.1% (MoM)</span>, 
                    terutama dari <span className="font-bold">IT Equipment</span>, total emisi bersih berhasil di-offset. 
                    <br/><br/>
                    Kontribusi <span className="font-bold text-emerald-600">Pembangkit Listrik Tenaga Surya (PLTS)</span> menyediakan offset tahunan signifikan sebesar 
                    <span className="font-extrabold text-emerald-600"> 15.2 tCO₂</span>, membantu BAF Plaza mempertahankan target Carbon Neutrality. Fokus ke depan adalah pada efisiensi sistem AC dan Lighting.
                </p>
            </div>

            {/* INSIGHT CARDS GRID */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Key Insights & Alerts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {insightsData.map(insight => (
                        <InsightCard key={insight.id} insight={insight} />
                    ))}
                </div>
            </div>

            {/* AI RECOMMENDATION SECTION */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                    AI-Generated Recommendation & Action Plan
                </h3>

                <ul className="mt-4 space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                        <div>
                            <span className="font-bold">Rekomendasi Operasional:</span> Implementasi sensor kehadiran (presence sensor) di 80% ruang meeting utama untuk otomatisasi penerangan dan AC.
                            <p className="text-sm text-gray-500 mt-0.5">Potensi Hemat: 4.5% dari konsumsi Lighting/AC bulanan.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                        <div>
                            <span className="font-bold">Rekomendasi Maintenance:</span> Jadwalkan maintenance AC di Lantai 3 (unit Chiller C) untuk mengembalikan efisiensi COP ke level optimal (Target 4.0).
                            <p className="text-sm text-gray-500 mt-0.5">Timeline: Selesai Q4, Priority: High.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                        <div>
                            <span className="font-bold">Rekomendasi SDM:</span> Lakukan training kesadaran energi (Energy Awareness Training) untuk staf baru setiap triwulan untuk menekan *phantom load*.
                            <p className="text-sm text-gray-500 mt-0.5">Mitigasi: Penggunaan daya siaga (standby power) non-esensial.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SustainabilityInsightPage;