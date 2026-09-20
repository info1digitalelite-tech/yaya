import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Building2, 
  Users, 
  Pill, 
  Globe2, 
  ShieldCheck, 
  Truck,
  Activity,
  ChevronLeft
} from 'lucide-react';
import { NavTab } from '../types';
import { ADMIN_USER } from '../data/mockData';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  ordersCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, ordersCount }) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'الرئيسية والعمليات',
      labelEn: 'Live Operations',
      icon: LayoutDashboard,
    },
    {
      id: 'orders' as NavTab,
      label: 'إدارة وتتبع الطلبات',
      labelEn: 'Orders Management',
      icon: Package,
      badge: ordersCount.toString(),
    },
    {
      id: 'pharmacies' as NavTab,
      label: 'الصيدليات والشركاء',
      labelEn: 'Pharmacies & Centers',
      icon: Building2,
    },
    {
      id: 'reps' as NavTab,
      label: 'المندوبين والمشرفين',
      labelEn: 'Field Reps & Supervisors',
      icon: Users,
    },
    {
      id: 'products' as NavTab,
      label: 'دليل المنتجات والأدوية',
      labelEn: 'Formulary & Products',
      icon: Pill,
    },
    {
      id: 'regions' as NavTab,
      label: 'المناطق وسلسلة التبريد',
      labelEn: 'Cold-Chain & Hubs',
      icon: Globe2,
    },
    {
      id: 'permissions' as NavTab,
      label: 'الأدوار والصلاحيات',
      labelEn: 'RBAC & Security',
      icon: ShieldCheck,
      highlight: true,
    },
  ];

  return (
    <aside id="app-sidebar" className="w-72 bg-slate-900 text-white flex flex-col shrink-0 border-l border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-black text-xl">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-['Cairo']">سيف لايف أوردر</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">B2B</span>
            </div>
            <p className="text-xs text-slate-400 tracking-wider font-['Plus_Jakarta_Sans'] font-medium">SafeLife Order Enterprise</p>
          </div>
        </div>

        {/* Cold-Chain Live Status Bar */}
        <div className="mt-4 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium text-[11px]">سلسلة التبريد المباشرة</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 font-['Plus_Jakarta_Sans']">3.4°C آمنة</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          الوحدات التشغيلية
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              id={`nav-btn-${item.id}`}
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-right transition-all group ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                <div>
                  <div className="text-sm font-semibold leading-snug">{item.label}</div>
                  <div className={`text-[10px] font-['Plus_Jakarta_Sans'] ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {item.labelEn}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans'] ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronLeft className={`w-4 h-4 transition-transform ${isActive ? 'text-white -translate-x-1' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & License */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={ADMIN_USER.avatar}
              alt={ADMIN_USER.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{ADMIN_USER.name}</p>
            <p className="text-[10px] text-emerald-400 truncate">{ADMIN_USER.role}</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span>اعتماد هيئة الدواء EDA #492</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3" /> متصل
          </span>
        </div>
      </div>
    </aside>
  );
};
