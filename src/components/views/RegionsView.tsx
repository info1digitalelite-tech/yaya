import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Warehouse, 
  ThermometerSnowflake, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp,
  AlertTriangle,
  Building2,
  Cpu
} from 'lucide-react';
import { RegionHub } from '../../types';

interface RegionsViewProps {
  regions: RegionHub[];
}

export const RegionsView: React.FC<RegionsViewProps> = ({ regions }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('eg');

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
              الدول ومناطق التوزيع وسلسلة التبريد
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              شبكة المستودعات المركزية
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            مراقبة التغطية الجغرافية وأجهزة الاستشعار الذكية IoT لغرف التبريد الكبرى
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setSelectedCountry('eg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCountry === 'eg' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🇪🇬 مصر (التشغيل الكامل)
          </button>
          <button
            onClick={() => setSelectedCountry('sa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCountry === 'sa' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🇸🇦 السعودية (توسع Q3)
          </button>
          <button
            onClick={() => setSelectedCountry('ae')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCountry === 'ae' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🇦🇪 الإمارات (توسع Q4)
          </button>
        </div>
      </div>

      {/* Top Banner Alert / Status */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg">منظومة المراقبة الحرجة IoT Telemetry</h3>
            <p className="text-xs text-slate-300">
              كافة المستودعات المركزية وسيارات التوزيع مجهزة بمجسات حرارة ورطوبة مربوطة بالذكاء السحابي
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold">
            متوسط درجات الحرارة: 3.3°C
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold">
            المولدات الاحتياطية: جاهزة 100%
          </div>
        </div>
      </div>

      {/* Regional Nodes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {regions.map((hub) => (
          <div
            key={hub.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{hub.name}</h3>
                  <span className="text-[11px] text-slate-500">{hub.country}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ThermometerSnowflake className="w-4 h-4 text-emerald-600" />
                <span className="font-['Plus_Jakarta_Sans']">{hub.hubColdTemp}°C</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">مراكز التوزيع</span>
                <span className="text-base font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
                  {hub.distributionCentersCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">الصيدليات النشطة</span>
                <span className="text-base font-extrabold text-blue-700 font-['Plus_Jakarta_Sans']">
                  {hub.activePharmacies}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">طلبات يومية</span>
                <span className="text-base font-extrabold text-emerald-700 font-['Plus_Jakarta_Sans']">
                  {hub.dailyOrders}
                </span>
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>إشغال غرف التبريد المركزية</span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold">{hub.storageCapacityUsed}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    hub.storageCapacityUsed > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${hub.storageCapacityUsed}%` }}
                ></div>
              </div>
            </div>

            {/* Telemetry points */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> أجهزة الاستشعار تعمل بكفاءة
              </span>
              <span>الالتزام: {hub.complianceRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
