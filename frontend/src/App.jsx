import Sidebar from './components/Shared/Sidebar';
import Dashboard from './pages/Dashboard';
import ChatWindow from './components/Chat/ChatWindow';

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 relative">
        <Dashboard />
        <ChatWindow />
      </div>
    </div>
  );
}