import { useVitals } from '../hooks/useVitals';
import VitalCard from '../components/Dashboard/VitalCard';
import { Heart, Wind, Calendar, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { hr, spo2, status } = useVitals();

  return (
    <main className="p-10 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, John</h1>
          <p className="text-slate-500 mt-1 font-medium">Post-Discharge Day 4 • Cardiac Surgery</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          <span className="text-sm font-bold text-slate-700">March 4, 2026</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VitalCard title="Heart Rate" value={hr} unit="bpm" icon={Heart} status={status} />
        <VitalCard title="Oxygen Level" value={spo2} unit="%" icon={Wind} status={spo2 < 94 ? 'Warning' : 'Stable'} />
        
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
          <div className="flex justify-between items-start mb-6">
            <CheckCircle2 size={28} />
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full uppercase">On Track</span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Daily Progress</p>
          <h2 className="text-3xl font-bold">85% Recovery</h2>
          <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-white h-full w-[85%]"></div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">Next Medication</h3>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="bg-white p-3 rounded-lg text-blue-600 font-bold text-xl shadow-sm">08:00</div>
            <div>
              <p className="font-bold text-slate-800">Aspirin 75mg</p>
              <p className="text-slate-500 text-sm italic">Take with food</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}