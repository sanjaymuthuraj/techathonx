export default function VitalCard({ title, value, unit, icon: Icon, status }) {
  const statusColors = {
    Stable: "text-emerald-600 bg-emerald-50 border-emerald-100",
    Warning: "text-amber-600 bg-amber-50 border-amber-100",
    Critical: "text-rose-600 bg-rose-50 border-rose-100 animate-pulse",
  };

  return (
    <div className={`p-6 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${statusColors[status]}`}>
          <Icon size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-4xl font-bold text-slate-800">{value}</h2>
          <span className="text-slate-400 font-medium">{unit}</span>
        </div>
      </div>
    </div>
  );
}