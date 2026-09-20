import React, { useState } from 'react';
import { X, Pill, ThermometerSnowflake } from 'lucide-react';
import { Product } from '../../types';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  if (!isOpen) return null;

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('مضادات حيوية');
  const [dosage, setDosage] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState(50);
  const [retailPrice, setRetailPrice] = useState(65);
  const [stockUnits, setStockUnits] = useState(1000);
  const [requiresColdChain, setRequiresColdChain] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      code: `DRG-${Math.floor(1000 + Math.random() * 9000)}`,
      nameAr,
      nameEn: nameEn || nameAr,
      category,
      dosage: dosage || 'أقراص علاجية فموية',
      manufacturer: manufacturer || 'الشركة المصرية للصناعات الدوائية',
      wholesalePrice: Number(wholesalePrice),
      retailPrice: Number(retailPrice),
      stockUnits: Number(stockUnits),
      minStockAlert: 200,
      requiresColdChain,
      tempRange: requiresColdChain ? '2°C - 8°C' : '15°C - 25°C',
      batchNumber: `BN-${Math.floor(10000 + Math.random() * 90000)}-EG`,
      expiryDate: '2027-12',
      edaCode: `EDA-REG-${Math.floor(10000 + Math.random() * 90000)}`,
      isAvailable: true,
      image: requiresColdChain
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSyaIiE6sfMFbt0lpDBgy1HcLW4qTTM4LAnh7ba3bC8_De9p1RN5pcXp2XqDjpYWiUC6tVZOQtsIODFryvlMdrGnT_1qWgQ59l0SU-rQrXD3UjBaw5nWmDHrE2GV8S5X1HyFBntz6OxNhOOeqwWuTZ6EE_5KKVysOOq1BE8KBuEdQz9zg-sgRJWfBCnshMvzu5LO5yRy0it2QRlIayb8pQT4HQvKq0Pf9hHh_C_sfoLN-Brnnr59jU'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkaQ4kTtjbWy2_zEJiU3s1rdkBRBC9WhENJqmfnZGfI6_is2dUjfJVasVyqu_JoFId_5rWEltE8gbmTzT7PJi-HQb5bKGd3SVKAivXpZm9QJXl7SZifPZm82HQV5GP7Dgi7bttu15yj7EUo9EwnlBa0qoOF-7xIF_4a6jp-FaTJnPvHNsSnYwdHbRcmk8VRN-6aX3G9apThzJ3ItmGaCUNK_npzbsFNNiBl6GwiyGGlqVBTIpwh6hC',
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-['Cairo']">
              إضافة مستحضر دوائي جديد
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              تسجيل الصنف في دليل التوريد B2B وتحديد سعر الجملة والتبريد
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">الاسم بالعربية:</label>
              <input
                type="text"
                required
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: سيتال 500 مجم"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">الاسم بالإنجليزية:</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="مثال: Cetal 500mg Tablets"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold font-['Plus_Jakarta_Sans']"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">التصنيف الدوائي:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="مضادات حيوية">مضادات حيوية</option>
                <option value="مضادات التجلط وسلسلة التبريد">مضادات التجلط وسلسلة التبريد</option>
                <option value="أدوية القلب والضغط">أدوية القلب والضغط</option>
                <option value="الجهاز الهضمي وقرحة المعدة">الجهاز الهضمي</option>
                <option value="مسكنات وخافض للحرارة">مسكنات وخافض للحرارة</option>
                <option value="محاليل وريدية ومستلزمات">محاليل وريدية ومستلزمات</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">الشركة المصنعة:</label>
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                placeholder="مثال: إيبيكو للأدوية"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">سعر الجملة (ج.م):</label>
              <input
                type="number"
                step="0.5"
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold font-['Plus_Jakarta_Sans']"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">سعر الجمهور:</label>
              <input
                type="number"
                step="0.5"
                value={retailPrice}
                onChange={(e) => setRetailPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold font-['Plus_Jakarta_Sans']"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">الرصيد الافتتاحي:</label>
              <input
                type="number"
                value={stockUnits}
                onChange={(e) => setStockUnits(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold font-['Plus_Jakarta_Sans']"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl cursor-pointer select-none">
            <input
              type="checkbox"
              checked={requiresColdChain}
              onChange={(e) => setRequiresColdChain(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <ThermometerSnowflake className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-emerald-900">
              يتطلب حفظ وتوزيع في سلسلة تبريد حرجة (2°C - 8°C)
            </span>
          </label>

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
              إدراج الصنف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
