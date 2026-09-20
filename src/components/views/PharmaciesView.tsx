import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  CreditCard, 
  Star, 
  TrendingUp,
  FileCheck,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Pharmacy } from '../../types';

interface PharmaciesViewProps {
  pharmacies: Pharmacy[];
  onOpenNewPharmacy: () => void;
  onSelectPharmacyForOrder: (pharmacy: Pharmacy) => void;
  searchQuery: string;
}

export const PharmaciesView: React.FC<PharmaciesViewProps> = ({
  pharmacies,
  onOpenNewPharmacy,
  onSelectPharmacyForOrder,
  searchQuery,
}) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedGovFilter, setSelectedGovFilter] = useState<string>('all');
  const [selectedPharmacyForModal, setSelectedPharmacyForModal] = useState<Pharmacy | null>(null);

  const filteredPharmacies = useMemo(() => {
    return pharmacies.filter((ph) => {
      if (selectedTypeFilter !== 'all' && ph.type !== selectedTypeFilter) {
        return false;
      }
      if (selectedGovFilter !== 'all' && ph.governorate !== selectedGovFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = ph.name.toLowerCase().includes(q) || ph.branch.toLowerCase().includes(q);
        const matchLicense = ph.licenseNumber.toLowerCase().includes(q);
        const matchRep = ph.assignedRep.toLowerCase().includes(q);
        if (!matchName && !matchLicense && !matchRep) return false;
      }
      return true;
    });
  }, [pharmacies, selectedTypeFilter, selectedGovFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
              شبكة الصيدليات والمراكز الطبية الشريكة
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {pharmacies.length} منشأة معتمدة
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            إدارة السقوف الائتمانية، التراخيص الدوائية، والربط الميداني مع مناديب التوزيع
          </p>
        </div>

        <button
          id="add-pharmacy-btn"
          onClick={onOpenNewPharmacy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ تسجيل صيدلية / مركز شريك</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">إجمالي الصيدليات المعتمدة</span>
          <div className="mt-2 text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
            1,480 <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+14 هذا الشهر</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">تغطي 24 محافظة</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">سلاسل الصيدليات الكبرى</span>
          <div className="mt-2 text-2xl font-black text-blue-700 font-['Plus_Jakarta_Sans']">
            18 سلسلة <span className="text-xs font-normal text-slate-400 font-['Cairo']">(+420 فرع)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">العزبي، رشدي، سيف، الشفاء</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">نسبة التغطية الجغرافية</span>
          <div className="mt-2 text-2xl font-black text-purple-700 font-['Plus_Jakarta_Sans']">
            94.2%
          </div>
          <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: '94.2%' }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">مطابقة اشتراطات هيئة الدواء</span>
          <div className="mt-2 text-2xl font-black text-emerald-700 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            100% موثقة
          </div>
          <p className="text-[11px] text-slate-400 mt-1">تراخيص وسجلات سارية</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'كافة المنشآت' },
              { id: 'chain', label: 'سلاسل كبرى' },
              { id: 'independent', label: 'صيدليات مجتمعية' },
              { id: 'hospital', label: 'مستشفيات ومراكز' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTypeFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTypeFilter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">المحافظة:</span>
            <select
              value={selectedGovFilter}
              onChange={(e) => setSelectedGovFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-bold focus:outline-hidden"
            >
              <option value="all">كافة المحافظات</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">الصيدلية والفرع</th>
                <th className="py-3 px-4">النوع والترخيص</th>
                <th className="py-3 px-4">السقف الائتماني المستخدم</th>
                <th className="py-3 px-4">المندوب المخصص</th>
                <th className="py-3 px-4">إجمالي السحوبات</th>
                <th className="py-3 px-4 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPharmacies.map((ph) => {
                const creditPercent = Math.round((ph.creditUsed / ph.creditLimit) * 100);
                const isHighCredit = creditPercent > 80;

                return (
                  <tr key={ph.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Pharmacy Name & Address */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">{ph.name}</div>
                          <div className="text-[11px] text-slate-500">{ph.branch}</div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{ph.address}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* License & Type */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          ph.type === 'chain'
                            ? 'bg-purple-100 text-purple-800'
                            : ph.type === 'hospital'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {ph.type === 'chain' ? 'سلسلة معتمدة' : ph.type === 'hospital' ? 'مستشفى ومجمع طبي' : 'صيدلية مجتمعية'}
                        </span>
                        <div className="text-[10px] text-slate-400 font-['Plus_Jakarta_Sans'] font-medium">
                          {ph.licenseNumber}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                          <CheckCircle className="w-3 h-3" /> موثق EDA
                        </span>
                      </div>
                    </td>

                    {/* Credit Bar */}
                    <td className="py-3.5 px-4 w-44">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className={isHighCredit ? 'text-amber-600' : 'text-slate-700'}>
                          {ph.creditUsed.toLocaleString()} ج.م
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          من {ph.creditLimit.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                        <div
                          className={`h-full rounded-full ${
                            isHighCredit ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(creditPercent, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        متبقي ائتمان: {(ph.creditLimit - ph.creditUsed).toLocaleString()} ج.م
                      </span>
                    </td>

                    {/* Assigned Rep */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{ph.assignedRep}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">آخر توريد: {ph.lastOrderDate}</div>
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 px-4 font-['Plus_Jakarta_Sans']">
                      <div className="font-bold text-slate-900 text-sm">
                        {ph.totalVolume.toLocaleString()} ج.م
                      </div>
                      <div className="text-[10px] text-slate-400 font-['Cairo']">
                        {ph.ordersCount} طلب مكتمل
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onSelectPharmacyForOrder(ph)}
                          title="إنشاء طلب فوري لهذه الصيدلية"
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          + طلب
                        </button>
                        <button
                          onClick={() => setSelectedPharmacyForModal(ph)}
                          title="عرض ملف الصيدلية"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pharmacy Details Modal */}
      {selectedPharmacyForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  ملف المنشأة الشريكة
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedPharmacyForModal.name}</h3>
                <p className="text-xs text-slate-500">{selectedPharmacyForModal.branch}</p>
              </div>
              <button
                onClick={() => setSelectedPharmacyForModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">العنوان بالتفصيل:</span>
                  <span className="font-bold text-slate-800">{selectedPharmacyForModal.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الهاتف:</span>
                  <span className="font-bold font-['Plus_Jakarta_Sans'] text-slate-800" dir="ltr">{selectedPharmacyForModal.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الترخيص التجاري:</span>
                  <span className="font-bold font-['Plus_Jakarta_Sans'] text-slate-800">{selectedPharmacyForModal.licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">المندوب المخصص للمنطقة:</span>
                  <span className="font-bold text-emerald-700">{selectedPharmacyForModal.assignedRep}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>السقف الائتماني المعتمد:</span>
                  <span className="font-['Plus_Jakarta_Sans']">{selectedPharmacyForModal.creditLimit.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>المستخدم حالياً:</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-amber-700 font-bold">{selectedPharmacyForModal.creditUsed.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-emerald-200/60">
                  <span>الرصيد المتاح للطلب:</span>
                  <span className="font-['Plus_Jakarta_Sans']">{(selectedPharmacyForModal.creditLimit - selectedPharmacyForModal.creditUsed).toLocaleString()} ج.م</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedPharmacyForModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  const ph = selectedPharmacyForModal;
                  setSelectedPharmacyForModal(null);
                  onSelectPharmacyForOrder(ph);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              >
                إنشاء طلب توريد للصيدلية
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
