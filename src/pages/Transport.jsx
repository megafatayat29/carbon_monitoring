import React, { useState } from "react";
import { Car, Bus, Train, Video, Calculator, Leaf, TrendingDown, TrendingUp, Zap } from "lucide-react";

// --- Data Emisi (kg CO₂ per km) ---
const EMISSION = {
    car: 0.192,       // Mobil Pribadi (rata-rata bensin)
    motor: 0.072,     // Sepeda Motor
    bus: 0.045,       // Bus (Emisi dibagi per penumpang)
    train: 0.014,     // Kereta (Emisi dibagi per penumpang, dianggap efisien)
    electric_car: 0.015, // Mobil Listrik (Emisi dari pembangkit listrik, jika non-renewable)
    online: 0,        // Online Meeting (Dianggap nol untuk perbandingan langsung)
};

// --- Komponen Kartu Hasil Simulasi ---
const ResultCard = ({ title, value, unit, icon: Icon, colorClass, secondaryText, secondaryColorClass, spanClass }) => (
    <div className={`bg-white rounded-xl shadow-lg p-5 border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] flex justify-between items-center ${spanClass}`}>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="mt-1 flex items-baseline">
                <span className={`text-3xl font-extrabold ${colorClass}`}>{value}</span>
                {unit && <span className="ml-2 text-md font-medium text-gray-500">{unit}</span>}
            </div>
            {secondaryText && (
                <p className={`text-sm flex items-center gap-1 mt-1 ${secondaryColorClass}`}>
                    <Leaf className="w-4 h-4" />
                    {secondaryText}
                </p>
            )}
        </div>
        <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-')} bg-opacity-10 ring-4 ${colorClass.replace('text-', 'ring-opacity-20 ring-')}`}>
            <Icon className={`w-7 h-7 ${colorClass}`} />
        </div>
    </div>
);

const TransportSimulationPage = () => {
    const [distance, setDistance] = useState(15); // default 15 km

    // Fungsi perhitungan emisi
    const calculateEmission = (mode) => (distance * EMISSION[mode]).toFixed(3); // Tampilkan 3 angka di belakang koma

    // Perhitungan penghematan CO₂ (Mobil Pribadi vs Kereta)
    const carEmission = parseFloat(calculateEmission("car"));
    const trainEmission = parseFloat(calculateEmission("train"));
    const savings = (carEmission - trainEmission).toFixed(3);
    
    // Perhitungan penghematan terbesar (Mobil Pribadi vs Online)
    const greatestSavings = (carEmission - EMISSION.online).toFixed(3);

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
            {/* HEADER */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Calculator className="w-8 h-8 text-indigo-600" />
                    Transport & Meeting Simulation
                </h2>
                <p className="mt-1 text-lg text-gray-500">
                    Simulasikan emisi karbon dari berbagai moda transportasi dan opsi meeting.
                </p>
            </div>

            {/* INPUT SECTION */}
            <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
                <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    Jarak Perjalanan
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                    Masukkan jarak satu kali perjalanan pulang-pergi (km) yang akan disimulasikan.
                </p>

                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        min="1"
                        className="border border-gray-300 p-3 rounded-lg w-32 text-center text-xl font-semibold focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-inner"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value) > 0 ? Number(e.target.value) : 1)}
                    />
                    <span className="text-2xl font-semibold text-gray-700">km</span>
                </div>
            </div>

            {/* SIMULATION RESULTS CARDS */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Hasil Emisi CO₂ ({distance} km)
                </h3>
                
                {/* Transport Mode Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    
                    <ResultCard
                        title="Mobil Pribadi (Bensin)"
                        value={calculateEmission("car")}
                        unit="kg CO₂"
                        icon={Car}
                        colorClass="text-red-600"
                        secondaryText={`Emisi tertinggi`}
                        secondaryColorClass="text-red-600"
                    />
                    
                    <ResultCard
                        title="Motor Pribadi"
                        value={calculateEmission("motor")}
                        unit="kg CO₂"
                        icon={Car} // Menggunakan Car, tapi bisa diganti icon lain jika ada
                        colorClass="text-amber-500"
                        secondaryText={`Lebih rendah dari mobil`}
                        secondaryColorClass="text-amber-500"
                    />

                    <ResultCard
                        title="Mobil Listrik / EV"
                        value={calculateEmission("electric_car")}
                        unit="kg CO₂"
                        icon={Zap} 
                        colorClass="text-teal-500"
                        secondaryText={`Emisi pembangkit listrik`}
                        secondaryColorClass="text-teal-500"
                    />
                    
                    <ResultCard
                        title="Bus Umum"
                        value={calculateEmission("bus")}
                        unit="kg CO₂"
                        icon={Bus}
                        colorClass="text-blue-600"
                        secondaryText={`Commuting terbaik`}
                        secondaryColorClass="text-blue-600"
                    />
                    
                    <ResultCard
                        title="Kereta / MRT / LRT"
                        value={calculateEmission("train")}
                        unit="kg CO₂"
                        icon={Train}
                        colorClass="text-green-600"
                        secondaryText={`Emisi terendah`}
                        secondaryColorClass="text-green-600"
                    />

                </div>
            </div>
            
            {/* AI-LIKE RECOMMENDATION & Online Meeting */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                
                {/* Online Meeting Card - Menggunakan spanClass untuk layout */}
                <ResultCard
                    title="Online Meeting (Virtual)"
                    value={calculateEmission("online")}
                    unit="kg CO₂"
                    icon={Video}
                    colorClass="text-emerald-600"
                    secondaryText={`Zero direct emission`}
                    secondaryColorClass="text-emerald-600"
                    spanClass="lg:col-span-1"
                />
                
                {/* Rekomendasi Penghematan */}
                <div className="bg-white rounded-xl shadow-lg p-6 border lg:col-span-2">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                        <TrendingDown className="w-6 h-6 text-indigo-600" />
                        Rekomendasi Penghematan Emisi
                    </h3>

                    <p className="mt-4 text-gray-600">
                        Memilih <span className="font-bold text-green-600">Online Meeting</span> alih-alih menggunakan Mobil Pribadi sejauh {distance} km menghemat total:
                    </p>

                    <p className="text-4xl font-extrabold text-emerald-600 mt-2">
                        {greatestSavings} kg CO₂
                    </p>
                    
                    <p className="mt-4 text-gray-600 border-t pt-3">
                        Jika Anda beralih dari Mobil Pribadi ke <span className="font-bold text-blue-600">Kereta</span>, Anda masih bisa menghemat:
                    </p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">
                        {savings} kg CO₂
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default TransportSimulationPage;