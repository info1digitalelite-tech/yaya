import React, { useState, useMemo } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  ThermometerSnowflake, 
  LayoutGrid, 
  List, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ShoppingCart, 
  Calendar, 
  Building
} from 'lucide-react';
import { Product } from '../../types';

interface ProductsViewProps {
  products: Product[];
  onOpenNewProduct: () => void;
  onToggleProductAvailability: (productId: string) => void;
  onAddProductToOrder: (product: Product) => void;
  searchQuery: string;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onOpenNewProduct,
  onToggleProductAvailability,
  onAddProductToOrder,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [coldChainOnly, setColdChainOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'كافة الأدوية والمستلزمات' },
    { id: 'مضادات حيوية', label: 'مضادات حيوية' },
    { id: 'مضادات التجلط وسلسلة التبريد', label: 'مضادات التجلط' },
    { id: 'أدوية القلب والضغط', label: 'القلب والضغط' },
    { id: 'الجهاز الهضمي وقرحة المعدة', label: 'الجهاز الهضمي' },
    { id: 'مسكنات وخافض للحرارة', label: 'مسكنات' },
    { id: 'محاليل وريدية ومستلزمات', label: 'محاليل وريدية' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (coldChainOnly && !p.requiresColdChain) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
        const matchCode = p.code.toLowerCase().includes(q) || p.edaCode.toLowerCase().includes(q);
        const matchMfr = p.manufacturer.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchMfr) return false;
      }
      return true;
    });
  }, [products, selectedCategory, coldChainOnly, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
              دليل المنتجات والأدوية الطبية
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
              {products.length} صنف مسجل
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            كتالوج التوريد الرسمي B2B المعتمد مع بيانات التشغيلات والتحكم في التوفر اللوجستي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            id="add-product-btn"
            onClick={onOpenNewProduct}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ إضافة دواء / مستحضر</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 cursor-pointer select-none shrink-0">
          <input
            type="checkbox"
            checked={coldChainOnly}
            onChange={(e) => setColdChainOnly(e.target.checked)}
            className="rounded text-emerald-600 focus:ring-emerald-500"
          />
          <ThermometerSnowflake className="w-4 h-4 text-emerald-600" />
          <span>سلسلة التبريد فقط (2°-8°C)</span>
        </label>
      </div>

      {/* View Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isLowStock = product.stockUnits <= product.minStockAlert;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Product Image & Badges */}
                  <div className="relative bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 h-52">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="max-h-40 max-w-full object-contain filter drop-shadow-md transition-transform hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Cold chain badge */}
                    {product.requiresColdChain && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-sm">
                        <ThermometerSnowflake className="w-3 h-3" />
                        <span>2°C - 8°C تبريد حرج</span>
                      </div>
                    )}

                    {/* Availability switch */}
                    <button
                      onClick={() => onToggleProductAvailability(product.id)}
                      className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs transition-colors ${
                        product.isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {product.isAvailable ? 'متاح' : 'محجوز مؤقتاً'}
                    </button>
                  </div>

                  {/* Info Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 font-['Plus_Jakarta_Sans']">{product.code}</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">{product.category}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">{product.nameAr}</h3>
                      <p className="text-xs text-slate-500 font-['Plus_Jakarta_Sans'] font-medium">{product.nameEn}</p>
                      <p className="text-[11px] text-slate-600 mt-1">{product.dosage}</p>
                    </div>

                    {/* Pricing Box */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block">سعر الجملة B2B</span>
                        <span className="text-base font-black text-slate-900 font-['Plus_Jakarta_Sans']">
                          {product.wholesalePrice.toFixed(2)} ج.م
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-slate-400 text-[10px] block">سعر الجمهور الرسمي</span>
                        <span className="text-xs font-bold text-slate-600 font-['Plus_Jakarta_Sans'] line-through">
                          {product.retailPrice.toFixed(2)} ج.م
                        </span>
                      </div>
                    </div>

                    {/* Stock & Batch info */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">المخزون بالمستودعات:</span>
                        <span className={`font-['Plus_Jakarta_Sans'] font-bold ${isLowStock ? 'text-rose-600' : 'text-slate-900'}`}>
                          {product.stockUnits.toLocaleString()} وحدة
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>التشغيلة: {product.batchNumber}</span>
                        <span>الصلاحية: {product.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onAddProductToOrder(product)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>إضافة لأمر التوريد</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">الصنف والعبوة</th>
                  <th className="py-3 px-4">التصنيف والشركة</th>
                  <th className="py-3 px-4">سعر الجملة</th>
                  <th className="py-3 px-4">الرصيد المتاح</th>
                  <th className="py-3 px-4">التبريد</th>
                  <th className="py-3 px-4">رقم التشغيلة</th>
                  <th className="py-3 px-4 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.nameAr}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-extrabold text-slate-900">{p.nameAr}</div>
                          <div className="text-[10px] text-slate-400 font-['Plus_Jakarta_Sans']">{p.nameEn}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-700">{p.category}</div>
                      <div className="text-[10px] text-slate-400">{p.manufacturer}</div>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                      {p.wholesalePrice.toFixed(2)} ج.م
                    </td>

                    <td className="py-3 px-4 font-bold font-['Plus_Jakarta_Sans']">
                      {p.stockUnits.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      {p.requiresColdChain ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          2-8°C تبريد
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">عادي</span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-['Plus_Jakarta_Sans'] text-slate-600">
                      {p.batchNumber}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onAddProductToOrder(p)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                      >
                        + طلب
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
