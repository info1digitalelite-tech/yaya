import React from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Star, 
  ArrowUpRight, 
  ThermometerSnowflake, 
  Truck, 
  Building2, 
  FileText, 
  AlertTriangle,
  ChevronLeft,
  Warehouse,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Order, Product, RegionHub } from '../../types';
import { ADMIN_USER } from '../../data/mockData';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  regions: RegionHub[];
  onOpenOrderDetails: (order: Order) => void;
  onOpenNewOrder: () => void;
  onNavigateToTab: (tab: any) => void;
  onToggleProductAvailability: (productId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  regions,
  onOpenOrderDetails,
  onOpenNewOrder,
  onNavigateToTab,
  onToggleProductAvailability,
}) => {
  const totalOrders = orders.length;
  const deliveringOrders = orders.filter((o) => o.status === 'delivering').length;
  const preparingOrders = orders.filter((o) => o.status === 'preparing').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لوحة العمليات المركزية المباشرة • Live Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Cairo'] tracking-tight">
              مرحباً {ADMIN_USER.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              منظومة التوزيع الذكي B2B متصلة مع 14 مركزاً لوجستياً وسلاسل صيدليات كبرى مع مراقبة حرجة لسلسلة التبريد على مدار الساعة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="dashboard-new-order-quick"
              onClick={onOpenNewOrder}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>+ إنشاء طلب سريع</span>
            </button>
            <button
              id="dashboard-goto-reps"
              onClick={() => onNavigateToTab('reps')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>تتبع المندوبين GPS</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-0 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Metrics Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">طلبات اليوم الإجمالية</span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Package className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">342</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" /> +18.4%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">مقارنة بأمس (288 طلب)</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">قيد التجهيز بالمستودعات</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">48</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              96.8% دقة التجهيز
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">مقسمة على 4 مراكز إقليمية</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">تم التسليم اليوم</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">265</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              1.8 ساعة متوسط التسليم
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">تغطية تامة لمواعيد الصيدليات</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">تقييم أداء المنظومة والمندوبين</span>
            <span className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Star className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">4.95<span className="text-base text-slate-400 font-normal"> / 5.0</span></span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
              99.4% التزام التبريد
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">من إجمالي 1,480 صيدلية شريكة</p>
        </div>
      </div>

      {/* Main Grid: Orders on Left (65%), Telemetry & Warehouses on Right (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Orders Table (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <h2 className="text-lg font-bold text-slate-900">أحدث طلبات التوزيع الميدانية المباشرة</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">تحديث آني لحالة الشحنات وسلسلة التبريد بالسيارات</p>
            </div>

            <button
              onClick={() => onNavigateToTab('orders')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 transition-colors"
            >
              <span>عرض جميع الطلبات ({totalOrders})</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
                <tr>
                  <th className="py-3.5 px-4">رقم الطلب</th>
                  <th className="py-3.5 px-4">الصيدلية المستلمة</th>
                  <th className="py-3.5 px-4">المندوب والشاحنة</th>
                  <th className="py-3.5 px-4">التبريد</th>
                  <th className="py-3.5 px-4">القيمة الإجمالية</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => {
                  const isDelivering = order.status === 'delivering';
                  const isDelivered = order.status === 'delivered';
                  const isPreparing = order.status === 'preparing';

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold font-['Plus_Jakarta_Sans'] text-slate-900">
                        #{order.orderNumber}
                        <div className="text-[10px] text-slate-400 font-normal font-['Cairo']">{order.orderTime}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{order.pharmacyName}</div>
                        <div className="text-[11px] text-slate-500">{order.pharmacyBranch}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.repAvatar}
                            alt={order.repName}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-semibold text-slate-800">{order.repName}</div>
                            <div className="text-[10px] text-slate-400 font-['Plus_Jakarta_Sans']">{order.repCode}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {order.coldChainRequired ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-['Plus_Jakarta_Sans']">{order.currentTemp}°C</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">عادي (15-25°)</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        {order.totalAmount.toLocaleString()} ج.م
                        <div className="text-[10px] text-slate-400 font-normal font-['Cairo']">{order.itemsCount} صنف</div>
                      </td>

                      <td className="py-3.5 px-4">
                        {isDelivering && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Truck className="w-3 h-3 animate-pulse" /> قيد التوصيل
                          </span>
                        )}
                        {isPreparing && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <Clock className="w-3 h-3" /> قيد التجهيز
                          </span>
                        )}
                        {isDelivered && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> تم التسليم
                          </span>
                        )}
                        {order.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            قيد المراجعة
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          id={`view-order-${order.id}`}
                          onClick={() => onOpenOrderDetails(order)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold text-xs transition-colors"
                        >
                          التفاصيل
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Rail: Inventory Toggles & Warehouse Hubs (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Inventory Availability */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">التوفر اللوجستي للأدوية الحرجة</h3>
                <p className="text-[11px] text-slate-500">تحكم فوري بفتح وحجز التوريد للصيدليات</p>
              </div>
              <button
                onClick={() => onNavigateToTab('products')}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                الكتالوج
              </button>
            </div>

            <div className="space-y-3">
              {products.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.nameAr}
                      className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{p.nameAr}</div>
                      <div className="text-[10px] text-slate-500 font-['Plus_Jakarta_Sans']">
                        المتوفر: {p.stockUnits.toLocaleString()} وحدة
                      </div>
                    </div>
                  </div>

                  <button
                    id={`toggle-avail-${p.id}`}
                    onClick={() => onToggleProductAvailability(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      p.isAvailable
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    {p.isAvailable ? 'متاح للطلب' : 'معلّق مؤقتاً'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Warehouses & Cold Hubs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Warehouse className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">المستودعات ومراكز التوزيع</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                4 مستودعات نشطة
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {regions.map((hub) => (
                <div key={hub.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{hub.name}</span>
                    <span className="text-[11px] font-bold text-emerald-600 font-['Plus_Jakarta_Sans'] flex items-center gap-1">
                      <ThermometerSnowflake className="w-3 h-3" />
                      {hub.hubColdTemp}°C
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>السعة المشغولة: {hub.storageCapacityUsed}%</span>
                    <span>{hub.activePharmacies} صيدلية</span>
                  </div>

                  <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        hub.storageCapacityUsed > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${hub.storageCapacityUsed}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex items-center gap-3 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">معتمد بنسبة 100% من هيئة الدواء المصرية</p>
              <p className="text-slate-300 text-[11px] mt-0.5">مطابق لاشتراطات التخزين والتوزيع الجيد (WHO GDP)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
