import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  MapPin, 
  Phone, 
  ThermometerSnowflake, 
  Battery, 
  Star, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  Send,
  Radio,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MedicalRep } from '../../types';

interface MedicalRepsViewProps {
  reps: MedicalRep[];
  onAssignOrderToRep: (rep: MedicalRep) => void;
  searchQuery: string;
}

export const MedicalRepsView: React.FC<MedicalRepsViewProps> = ({
  reps,
  onAssignOrderToRep,
  searchQuery,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRep, setSelectedRep] = useState<MedicalRep | null>(null);

  const filteredReps = reps.filter((rep) => {
    if (filterStatus !== 'all' && rep.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = rep.name.toLowerCase().includes(q) || rep.code.toLowerCase().includes(q);
      const matchRegion = rep.region.toLowerCase().includes(q);
      if (!matchName && !matchRegion) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
              إدارة المندوبين والمشرفين الميدانيين
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {reps.length} مندوب مرخص
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            التتبع المباشر لحركة أسطول التوزيع المبرد والامتثال لاشتراطات نقل الأدوية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>بث GPS & IoT مباشر متصل</span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">مناديب في الميدان الآن</span>
          <div className="mt-2 text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans'] flex items-center justify-between">
            <span>28 <span className="text-xs font-normal text-slate-400 font-['Cairo']">مندوب</span></span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">92.8%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">شحنات قيد التوصيل اللحظي</span>
          <div className="mt-2 text-2xl font-black text-blue-700 font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
            <Truck className="w-5 h-5 text-blue-600" />
            62 شحنة
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">الالتزام بنطاق التبريد 2-8°C</span>
          <div className="mt-2 text-2xl font-black text-emerald-700 font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
            <ThermometerSnowflake className="w-5 h-5 text-emerald-600" />
            99.6% آمن
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">متوسط تقييم الصيدليات</span>
          <div className="mt-2 text-2xl font-black text-amber-600 font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            4.93 / 5.0
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          كافة المندوبين ({reps.length})
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'active' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          متاحون ونشطون ({reps.filter((r) => r.status === 'active').length})
        </button>
        <button
          onClick={() => setFilterStatus('break')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'break' ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          في استراحة مؤقتة ({reps.filter((r) => r.status === 'break').length})
        </button>
      </div>

      {/* Medical Reps Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReps.map((rep) => {
          const isColdSafe = rep.vehicleTemp <= 8.0;

          return (
            <div
              key={rep.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header with Avatar and Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={rep.avatar}
                        alt={rep.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                        referrerPolicy="no-referrer"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                        rep.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-slate-900 text-base">{rep.name}</h3>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 font-['Plus_Jakarta_Sans']">
                          {rep.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{rep.title}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    rep.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {rep.status === 'active' ? 'نشط بالميدان' : 'استراحة'}
                  </span>
                </div>

                {/* Region & Vehicle Details */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{rep.region}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>{rep.vehicleType}</span>
                    </div>

                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded font-['Plus_Jakarta_Sans'] font-bold text-xs ${
                      isColdSafe ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      <span>{rep.vehicleTemp}°C</span>
                    </div>
                  </div>

                  {/* Telemetry snippet */}
                  <div className="text-[11px] text-slate-500 bg-slate-50/80 p-2 rounded-lg flex items-center justify-between">
                    <span className="truncate">الموقع: {rep.lastLocation}</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-slate-600 font-semibold shrink-0 ml-1">
                      {rep.batteryLevel}% 🔋
                    </span>
                  </div>
                </div>

                {/* Performance numbers */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">شحنات اليوم</span>
                    <span className="text-sm font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">{rep.completedDeliveries}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">قيد التوصيل</span>
                    <span className="text-sm font-extrabold text-blue-700 font-['Plus_Jakarta_Sans']">{rep.activeOrders}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">التقييم</span>
                    <span className="text-sm font-extrabold text-amber-600 font-['Plus_Jakarta_Sans'] flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {rep.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => alert(`الاتصال بالمندوب: ${rep.name} على الرقم ${rep.phone}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>اتصال مباشر</span>
                </button>
                <button
                  onClick={() => onAssignOrderToRep(rep)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إسناد شحنة</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
