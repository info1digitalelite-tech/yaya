import React, { useState } from 'react';
import { X, Building2, ShieldCheck } from 'lucide-react';
import { Pharmacy, MedicalRep } from '../../types';

interface NewPharmacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reps: MedicalRep[];
  onAddPharmacy: (newPharmacy: Pharmacy) => void;
}

export const NewPharmacyModal: React.FC<NewPharmacyModalProps> = ({
  isOpen,
  onClose,
  reps,
  onAddPharmacy,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [address, setAddress] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<Pharmacy['type']>('independent');
  const [creditLimit, setCreditLimit] = useState(150000);
  const [assignedRep, setAssignedRep] = useState(reps[0]?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPh: Pharmacy = {
      id: `ph-${Date.now()}`,
      name,
      type,
      branch: branch || 'الفرع الرئيسي',
      address: address || 'القاهرة، جمهورية مصر العربية',
      governorate,
      phone: phone || '+20 2 2000 0000',
      licenseNumber: `PHA-EG-${Math.floor(1000 + Math.random() * 9000)}`,
      edaStatus: 'verified',
      ordersCount: 0,
      totalVolume: 0,
      creditLimit: Number(creditLimit),
      creditUsed: 0,
      rating: 5.0,
      assignedRep: assignedRep || reps[0]?.name,
      lastOrderDate: 'منشأة جديدة',
    };

    onAddPharmacy(newPh);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-['Cairo']">
              تسجيل صيدلية / مركز طبي جديد
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              إدراج منشأة معتمدة وتحديد السقف الائتماني والمندوب المسؤول
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">اسم الصيدلية / المؤسسة الطبية:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: صيدلية الأمل التخصصية"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نوع المنشأة:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="independent">صيدلية مجتمعية مستقلة</option>
                <option value="chain">سلسلة صيدليات معتمدة</option>
                <option value="hospital">مستشفى أو مركز تخصصي</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">المحافظة:</label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="القاهرة">القاهرة</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الإسكندرية">الإسكندرية</option>
                <option value="الدلتا">الدلتا والقناة</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">اسم الفرع والعنوان:</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="مثال: فرع النزهة الجديدة - شارع جوزيف تيتو"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">السقف الائتماني (ج.م):</label>
              <input
                type="number"
                value={creditLimit}
                onChange={(e) => setCreditLimit(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-['Plus_Jakarta_Sans'] font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">المندوب المخصص:</label>
              <select
                value={assignedRep}
                onChange={(e) => setAssignedRep(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
              >
                {reps.map((r) => (
                  <option key={r.id} value={`${r.name} (${r.code})`}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
            >
              تسجيل المنشأة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
