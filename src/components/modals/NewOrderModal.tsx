import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ThermometerSnowflake, 
  Truck, 
  Building2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Pharmacy, MedicalRep, Product, Order, OrderItem } from '../../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacies: Pharmacy[];
  reps: MedicalRep[];
  products: Product[];
  initialPharmacy?: Pharmacy | null;
  initialProduct?: Product | null;
  onCreateOrder: (newOrder: Order) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  pharmacies,
  reps,
  products,
  initialPharmacy,
  initialProduct,
  onCreateOrder,
}) => {
  if (!isOpen) return null;

  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string>(
    initialPharmacy?.id || pharmacies[0]?.id || ''
  );
  const [selectedRepId, setSelectedRepId] = useState<string>(reps[0]?.id || '');
  
  // Selected order items
  const [orderItems, setOrderItems] = useState<Array<{ product: Product; quantity: number }>>(() => {
    if (initialProduct) {
      return [{ product: initialProduct, quantity: 20 }];
    }
    return [
      { product: products[0], quantity: 50 },
      { product: products[1], quantity: 30 },
    ];
  });

  const selectedPharmacy = pharmacies.find((p) => p.id === selectedPharmacyId) || pharmacies[0];
  const selectedRep = reps.find((r) => r.id === selectedRepId) || reps[0];

  const hasColdChain = orderItems.some((item) => item.product.requiresColdChain);

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.product.wholesalePrice * item.quantity,
    0
  );

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as Array<{ product: Product; quantity: number }>
    );
  };

  const handleAddProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    if (orderItems.some((i) => i.product.id === productId)) {
      handleUpdateQuantity(productId, 10);
    } else {
      setOrderItems((prev) => [...prev, { product: prod, quantity: 10 }]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setOrderItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      alert('الرجاء إضافة صنف واحد على الأقل للطلب');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SLO-${randomNum}`,
      pharmacyName: selectedPharmacy.name,
      pharmacyBranch: selectedPharmacy.branch,
      repName: selectedRep.name,
      repCode: selectedRep.code,
      repAvatar: selectedRep.avatar,
      itemsCount: orderItems.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: totalAmount,
      orderTime: 'الآن (مباشر)',
      deliveryEstimate: 'خلال 45 دقيقة',
      status: 'preparing',
      coldChainRequired: hasColdChain,
      currentTemp: hasColdChain ? 3.4 : undefined,
      slaStatus: 'on_track',
      region: selectedPharmacy.governorate,
      items: orderItems.map((i) => ({
        id: i.product.id,
        name: i.product.nameAr,
        nameEn: i.product.nameEn,
        quantity: i.quantity,
        unitPrice: i.product.wholesalePrice,
        image: i.product.image,
      })),
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-['Cairo']">
              إنشاء أمر توريد دوائي جديد B2B
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              توجيه فوري للمستودع المركزي وإسناد لمندوب التوزيع وسلسلة التبريد
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Pharmacy Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">الصيدلية / المركز الطبي المستلم:</label>
            <select
              value={selectedPharmacyId}
              onChange={(e) => setSelectedPharmacyId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              {pharmacies.map((ph) => (
                <option key={ph.id} value={ph.id}>
                  {ph.name} - {ph.branch} ({ph.governorate})
                </option>
              ))}
            </select>
          </div>

          {/* Medical Rep Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">مندوب التوزيع الميداني والسيارة:</label>
            <select
              value={selectedRepId}
              onChange={(e) => setSelectedRepId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              {reps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name} ({rep.code}) - {rep.region} - مركبة: {rep.vehicleType}
                </option>
              ))}
            </select>
          </div>

          {/* Items Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700">الأصناف الدوائية المضافة:</label>
              <span className="text-[11px] text-slate-400">سعر الجملة الرسمي</span>
            </div>

            {/* Quick add chips from catalog */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-slate-400 text-[10px] shrink-0">إضافة سريعة:</span>
              {products.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handleAddProduct(p.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-[11px] shrink-0 transition-colors"
                >
                  + {p.nameAr}
                </button>
              ))}
            </div>

            {/* Selected Items List */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden bg-white">
              {orderItems.length === 0 ? (
                <div className="p-6 text-center text-slate-400">
                  لم يتم إضافة أي دواء بعد. اختر من القائمة أعلاه.
                </div>
              ) : (
                orderItems.map((item) => (
                  <div key={item.product.id} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-10 h-10 object-contain rounded bg-slate-50 p-1 border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{item.product.nameAr}</div>
                        <div className="text-[10px] text-slate-400">
                          {item.product.wholesalePrice.toFixed(2)} ج.م / وحدة
                          {item.product.requiresColdChain && (
                            <span className="text-emerald-600 font-bold mr-2">❄️ تبريد 2-8°C</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.product.id, -10)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-bold font-['Plus_Jakarta_Sans'] text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.product.id, 10)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="w-20 text-left font-['Plus_Jakarta_Sans'] font-bold text-slate-900">
                        {(item.product.wholesalePrice * item.quantity).toLocaleString()} ج.م
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(item.product.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cold Chain Notice */}
          {hasColdChain && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <ThermometerSnowflake className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                تنبيه لوجستي: هذا الطلب يحتوي على أدوية سلسلة تبريد حرجة (2°C - 8°C)، سيتم تفعيل جهاز التتبع الحراري التلقائي.
              </span>
            </div>
          )}

          {/* Total & Submit */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-xs block">إجمالي قيمة الفاتورة:</span>
              <span className="text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
                {totalAmount.toLocaleString()} <span className="text-xs font-bold font-['Cairo'] text-slate-500">ج.م</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
              >
                تأكيد وإصدار أمر التوريد
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
