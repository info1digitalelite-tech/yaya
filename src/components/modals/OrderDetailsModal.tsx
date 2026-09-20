import React from 'react';
import { 
  X, 
  Printer, 
  ThermometerSnowflake, 
  Truck, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText,
  ShieldCheck,
  MapPin,
  Phone
} from 'lucide-react';
import { Order } from '../../types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-['Plus_Jakarta_Sans']">
                #{order.orderNumber}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                order.status === 'delivering'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : order.status === 'delivered'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {order.status === 'delivering' ? 'قيد التوصيل' : order.status === 'delivered' ? 'تم التسليم' : 'قيد التجهيز بالمستودع'}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">فاتورة وأمر توريد دوائي</h2>
            <p className="text-xs text-slate-400 mt-0.5">وقت الطلب: {order.orderTime} • {order.region}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pharmacy and Rep Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Pharmacy Info */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>الجهة المستلمة:</span>
            </div>
            <p className="font-extrabold text-sm text-slate-900">{order.pharmacyName}</p>
            <p className="text-slate-600">{order.pharmacyBranch}</p>
            <p className="text-[11px] text-slate-400">المنطقة: {order.region}</p>
          </div>

          {/* Rep Info */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>المندوب والناقل الميداني:</span>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <img
                src={order.repAvatar}
                alt={order.repName}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-bold text-slate-900">{order.repName}</p>
                <p className="text-[11px] text-emerald-600 font-bold font-['Plus_Jakarta_Sans']">{order.repCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cold-Chain Telemetry Tracker */}
        {order.coldChainRequired && (
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ThermometerSnowflake className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="font-bold text-emerald-900 text-sm">سلسلة التبريد نشطة وموثقة (Cold-Chain IoT)</div>
                <div className="text-[11px] text-emerald-700">درجة حرارة صندوق الشحن الحالية: <strong className="font-['Plus_Jakarta_Sans']">{order.currentTemp}°C</strong> (النطاق المسموح 2-8°C)</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
              مطابق 100%
            </span>
          </div>
        )}

        {/* Items Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">الأصناف المشمولة بأمر التوريد</h3>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-4">الصنف الدوائي</th>
                  <th className="py-2.5 px-4 text-center">الكمية المطلوبة</th>
                  <th className="py-2.5 px-4">سعر الوحدة</th>
                  <th className="py-2.5 px-4 text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-['Plus_Jakarta_Sans']">{item.nameEn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-center font-['Plus_Jakarta_Sans'] font-bold text-slate-800">
                      {item.quantity} وحدة
                    </td>
                    <td className="py-2.5 px-4 font-['Plus_Jakarta_Sans'] text-slate-600">
                      {item.unitPrice.toFixed(2)} ج.م
                    </td>
                    <td className="py-2.5 px-4 font-['Plus_Jakarta_Sans'] font-bold text-slate-900 text-left">
                      {(item.quantity * item.unitPrice).toLocaleString()} ج.م
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                <tr>
                  <td colSpan={3} className="py-3 px-4 text-right">إجمالي الفاتورة الصافية:</td>
                  <td className="py-3 px-4 text-left text-base font-extrabold font-['Plus_Jakarta_Sans'] text-emerald-700">
                    {order.totalAmount.toLocaleString()} ج.م
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">تغيير حالة الطلب:</span>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
            >
              <option value="pending">قيد المراجعة</option>
              <option value="preparing">جاري التجهيز</option>
              <option value="delivering">قيد التوصيل</option>
              <option value="delivered">تم التسليم</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`جاري طباعة بوليصة وأمر توريد الطلب #${order.orderNumber}`)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة المستند</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
