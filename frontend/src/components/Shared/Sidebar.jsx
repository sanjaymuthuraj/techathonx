import { LayoutDashboard, Activity, User, Settings, LogOut } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen sticky top-0 border-r p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
        <span className="text-xl font-bold tracking-tight text-slate-800">HealthPulse</span>
      </div>
      <nav className="space-y-2 flex-1">
        <NavItem icon={LayoutDashboard} label="Dashboard" active />
        <NavItem icon={Activity} label="Recovery Plan" />
        <NavItem icon={User} label="My Doctor" />
        <NavItem icon={Settings} label="Settings" />
      </nav>
      <div className="pt-6 border-t">
        <NavItem icon={LogOut} label="Sign Out" />
      </div>
    </aside>
  );
}