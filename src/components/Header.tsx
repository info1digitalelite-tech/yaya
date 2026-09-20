import React from 'react';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  RefreshCw, 
  ShieldCheck, 
  ThermometerSnowflake,
  Clock
} from 'lucide-react';
import { ADMIN_USER } from '../data/mockData';

interface HeaderProps {
  onOpenNewOrder: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewOrder,
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <header id="app-header" className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Search Input */}
      <div className="flex-1 max-w-lg relative">
        <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          id="global-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث برقم الطلب، الصيدلية، اسم الدواء أو المندوب..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-11 pl-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
        />
      </div>

      {/* Telemetry Chips & Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Cold-Chain Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
          <ThermometerSnowflake className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>تتبع التبريد: <strong className="font-['Plus_Jakarta_Sans'] font-bold">3.4°C</strong> (مطابق لمعايير WHO GDP)</span>
        </div>

        {/* EDA Security Certified Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>هيئة الدواء المصرية</span>
        </div>

        {/* Refresh Sync Button */}
        <button
          id="sync-refresh-btn"
          onClick={onRefresh}
          title="تحديث البيانات المباشرة"
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>
        </div>

        {/* Create New Order Button */}
        <button
          id="header-create-order-btn"
          onClick={onOpenNewOrder}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>طلب توريد جديد</span>
        </button>
      </div>
    </header>
  );
};
