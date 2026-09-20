import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  ThermometerSnowflake, 
  Truck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  Eye, 
  Printer, 
  Plus, 
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import { Order } from '../../types';

interface OrdersViewProps {
  orders: Order[];
  onOpenOrderDetails: (order: Order) => void;
  onOpenNewOrder: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  searchQuery: string;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onOpenOrderDetails,
  onOpenNewOrder,
  onUpdateOrderStatus,
  searchQuery,
}) => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Tab filter
      if (selectedStatusTab !== 'all' && order.status !== selectedStatusTab) {
        return false;
      }
      // Region filter
      if (selectedRegionFilter !== 'all' && !order.region.includes(selectedRegionFilter)) {
        return false;
      }
      // Global search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchNumber = order.orderNumber.toLowerCase().includes(query);
        const matchPharmacy = order.pharmacyName.toLowerCase().includes(query) || order.pharmacyBranch.toLowerCase().includes(query);
        const matchRep = order.repName.toLowerCase().includes(query) || order.repCode.toLowerCase().includes(query);
        if (!matchNumber && !matchPharmacy && !matchRep) {
          return false;
        }
      }
      return true;
    });
  }, [orders, selectedStatusTab, selectedRegionFilter, searchQuery]);

  const statusCounts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      delivering: orders.filter((o) => o.status === 'delivering').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
    };
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.totalAmount, 0);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
              إدارة وتتبع الطلبات الميدانية
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {orders.length} طلب نشط
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            متابعة فورية لدورة حياة الطلب، الفواتير، التوزيع، والامتثال لسلسلة التبريد
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('تم تصدير سجل الطلبات كملف Excel بنجاح')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>تصدير تقرير Excel</span>
          </button>

          <button
            id="orders-create-btn"
            onClick={onOpenNewOrder}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ إنشاء طلب توريد</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">إجمالي قيمة طلبات اليوم</span>
          <div className="mt-2 text-xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
            {totalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-500 font-['Cairo']">ج.م</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">شحنات سلسلة التبريد الحرجة</span>
          <div className="mt-2 text-xl font-extrabold text-emerald-700 font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
            <ThermometerSnowflake className="w-5 h-5 text-emerald-600" />
            {orders.filter((o) => o.coldChainRequired).length} شحنة (100% آمنة)
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">معدل التسليم في الوقت المحدد</span>
          <div className="mt-2 text-xl font-extrabold text-blue-700 font-['Plus_Jakarta_Sans']">
            98.8% <span className="text-xs font-normal text-slate-500 font-['Cairo']">SLA</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">السيارات والشاحنات النشطة</span>
          <div className="mt-2 text-xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
            <Truck className="w-5 h-5 text-emerald-600" />
            6 أساطيل ميدانية
          </div>
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'جميع الطلبات', count: statusCounts.all },
              { id: 'pending', label: 'قيد الانتظار', count: statusCounts.pending },
              { id: 'preparing', label: 'جاري التجهيز', count: statusCounts.preparing },
              { id: 'delivering', label: 'قيد التوصيل', count: statusCounts.delivering },
              { id: 'delivered', label: 'تم التسليم', count: statusCounts.delivered },
            ].map((tab) => {
              const isActive = selectedStatusTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatusTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-['Plus_Jakarta_Sans'] ${
                    isActive ? 'bg-slate-800 text-white' : 'bg-slate-200/80 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span className="text-slate-500 font-medium">المنطقة:</span>
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">كافة المحافظات والمناطق</option>
              <option value="القاهرة">القاهرة الكبرى</option>
              <option value="الجيزة">الجيزة وأكتوبر</option>
              <option value="الإسكندرية">الإسكندرية</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">كود الطلب</th>
                <th className="py-3 px-4">الصيدلية المستلمة والفرع</th>
                <th className="py-3 px-4">المندوب الميداني</th>
                <th className="py-3 px-4">الأصناف والقيمة</th>
                <th className="py-3 px-4">سلسلة التبريد</th>
                <th className="py-3 px-4">حالة الطلب</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    لا توجد طلبات تطابق معايير البحث الحالية
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Order Code */}
                    <td className="py-3.5 px-4 font-['Plus_Jakarta_Sans'] font-extrabold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>#{order.orderNumber}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal font-['Cairo'] block">
                        {order.orderTime}
                      </span>
                    </td>

                    {/* Pharmacy */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{order.pharmacyName}</div>
                      <div className="text-[11px] text-slate-500">{order.pharmacyBranch}</div>
                      <span className="text-[10px] text-slate-400 font-medium">{order.region}</span>
                    </td>

                    {/* Medical Rep */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={order.repAvatar}
                          alt={order.repName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-800">{order.repName}</div>
                          <div className="text-[10px] text-emerald-600 font-bold font-['Plus_Jakarta_Sans']">
                            {order.repCode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Items & Amount */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] text-sm">
                        {order.totalAmount.toLocaleString()} ج.م
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {order.itemsCount} صنف في الشحنة
                      </div>
                    </td>

                    {/* Cold Chain */}
                    <td className="py-3.5 px-4">
                      {order.coldChainRequired ? (
                        <div className="inline-flex flex-col">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-['Plus_Jakarta_Sans']">{order.currentTemp}°C</span>
                          </span>
                          <span className="text-[10px] text-emerald-600 mt-0.5 font-medium">ضمن النطاق الآمن</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">درجة حرارة الغرفة</span>
                      )}
                    </td>

                    {/* Status Dropdown/Selector */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-hidden transition-all cursor-pointer ${
                          order.status === 'delivering'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : order.status === 'preparing'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : order.status === 'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="preparing">جاري التجهيز بالمستودع</option>
                        <option value="delivering">قيد التوصيل مع المندوب</option>
                        <option value="delivered">تم التسليم بنجاح</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          id={`view-details-${order.id}`}
                          onClick={() => onOpenOrderDetails(order)}
                          title="عرض الفاتورة والتفاصيل"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`جاري طباعة بوليصة الشحن للطلب #${order.orderNumber}`)}
                          title="طباعة بوليصة الشحن"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
