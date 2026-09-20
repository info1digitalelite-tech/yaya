import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  KeyRound, 
  Check, 
  Save, 
  AlertCircle,
  Sparkles,
  FileCheck2,
  Package,
  Pill,
  Building2,
  Cpu
} from 'lucide-react';
import { RolePermission } from '../../types';

interface PermissionsViewProps {
  roles: RolePermission[];
  onSaveRolePermissions: (updatedRoles: RolePermission[]) => void;
}

export const PermissionsView: React.FC<PermissionsViewProps> = ({
  roles,
  onSaveRolePermissions,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.roleId || 'super-admin');
  const [localRoles, setLocalRoles] = useState<RolePermission[]>(roles);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const currentRole = localRoles.find((r) => r.roleId === selectedRoleId) || localRoles[0];

  const handleToggle = (
    moduleKey: keyof RolePermission['permissions'],
    permKey: string
  ) => {
    setLocalRoles((prev) =>
      prev.map((r) => {
        if (r.roleId !== selectedRoleId) return r;
        const currentMod = r.permissions[moduleKey] as any;
        return {
          ...r,
          permissions: {
            ...r.permissions,
            [moduleKey]: {
              ...currentMod,
              [permKey]: !currentMod[permKey],
            },
          },
        };
      })
    );
  };

  const handleSave = () => {
    onSaveRolePermissions(localRoles);
    setSaveSuccessMessage(`تم تحديث وحفظ صلاحيات الدور (${currentRole.roleName}) وتطبيقها فورياً`);
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
              الأدوار والصلاحيات المؤسسية
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              RBAC Security Model
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            التحكم الدقيق في صلاحيات الوصول لكافة وحدات النظام، وتأمين عمليات توريد الأدوية
          </p>
        </div>

        <button
          id="save-permissions-btn"
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>حفظ التعديلات وتطبيق الصلاحيات</span>
        </button>
      </div>

      {/* Save Toast */}
      {saveSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMessage}</span>
          </div>
          <button onClick={() => setSaveSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Role Selector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex items-center gap-2 overflow-x-auto">
        {localRoles.map((role) => {
          const isSelected = role.roleId === selectedRoleId;
          return (
            <button
              key={role.roleId}
              onClick={() => setSelectedRoleId(role.roleId)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <KeyRound className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
              <div className="text-right">
                <div>{role.roleName}</div>
                <div className={`text-[10px] font-['Plus_Jakarta_Sans'] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {role.roleTitleEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Role Details Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400">الدور النشط المحدد:</span>
            <h3 className="text-lg font-bold">{currentRole.roleName}</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl">{currentRole.description}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs flex items-center gap-2 border border-slate-700">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>المستخدمون المسند إليهم: <strong className="font-['Plus_Jakarta_Sans'] text-emerald-400">{currentRole.usersAssigned}</strong> مستخدم</span>
          </div>
        </div>
      </div>

      {/* Permission Modules 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">صلاحيات إدارة وتوجيه الطلبات</h4>
                <p className="text-[11px] text-slate-500">Orders & Logistics Permissions</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">4 خيارات</span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'viewAll', label: 'عرض كافة طلبات التوريد الميدانية لجميع المحافظات', desc: 'الاطلاع على جميع تفاصيل الفواتير والمسارات' },
              { key: 'approveOrders', label: 'اعتماد وقبول طلبات التوريد الجديدة الواردة', desc: 'صلاحية تغيير حالة الطلب من قيد المراجعة لمؤكد' },
              { key: 'assignReps', label: 'إسناد الطلبات للمناديب وتعديل مسارات الشحن', desc: 'توجيه الشحنات للسيارات وفانات التوزيع الميداني' },
              { key: 'cancelOrders', label: 'إلغاء وتعديل فواتير التوريد والأصناف الموردة', desc: 'يتطلب موافقة إدارية وإشعار الصيدلية' },
            ].map((item) => {
              const isChecked = (currentRole.permissions.orders as any)[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => handleToggle('orders', item.key)}
                  className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 cursor-pointer transition-all select-none"
                >
                  <div className="pr-1">
                    <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{item.desc}</span>
                  </div>

                  <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${isChecked ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${isChecked ? 'left-1' : 'right-1'}`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 2: Products & Catalog */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">صلاحيات كتالوج الأدوية والمخزون</h4>
                <p className="text-[11px] text-slate-500">Products & Inventory Permissions</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">4 خيارات</span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'editProducts', label: 'إضافة وتعديل بيانات الأصناف والمستحضرات الطبية', desc: 'إدخال أصناف جديدة بالكتالوج المعتمد' },
              { key: 'updateWholesalePricing', label: 'تعديل أسعار الجملة B2B وهوامش الربح الرسمية', desc: 'تحديث تسعيرة هيئة الدواء ونسب الخصم' },
              { key: 'manageStockAlerts', label: 'ضبط مستويات التنبيه بالحد الأدنى للأرصدة', desc: 'إطلاق إشعارات العجز للمستودعات المركزية' },
              { key: 'manageBatches', label: 'إدارة أرقام التشغيلات (Batches) وتواريخ الصلاحية', desc: 'ربط الشحنات بتشغيلات معتمدة من المصانع' },
            ].map((item) => {
              const isChecked = (currentRole.permissions.catalog as any)[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => handleToggle('catalog', item.key)}
                  className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 cursor-pointer transition-all select-none"
                >
                  <div className="pr-1">
                    <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{item.desc}</span>
                  </div>

                  <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${isChecked ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${isChecked ? 'left-1' : 'right-1'}`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 3: Pharmacies & Reps */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">صلاحيات الصيدليات والمناديب</h4>
                <p className="text-[11px] text-slate-500">Pharmacies & Field Reps Management</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">4 خيارات</span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'approvePharmacies', label: 'اعتماد وقبول الصيدليات والمراكز الطبية الجديدة', desc: 'مراجعة السجل التجاري وترخيص الصيدلية' },
              { key: 'updateCreditLimits', label: 'تعديل السقوف والحدود الائتمانية للصيدليات', desc: 'زيادة أو إيقاف التسهيلات الائتمانية' },
              { key: 'liveGpsTracking', label: 'التتبع الحي المباشر GPS لمندوبي التوزيع', desc: 'مراقبة سرعة ومواقع السيارات وأجهزة الاستشعار' },
              { key: 'manageCommissions', label: 'إدارة العمولات وتقييم أداء المناديب', desc: 'حساب مكافآت الإنجاز ومعدلات الالتزام' },
            ].map((item) => {
              const isChecked = (currentRole.permissions.pharmaciesAndReps as any)[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => handleToggle('pharmaciesAndReps', item.key)}
                  className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 cursor-pointer transition-all select-none"
                >
                  <div className="pr-1">
                    <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{item.desc}</span>
                  </div>

                  <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${isChecked ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${isChecked ? 'left-1' : 'right-1'}`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 4: Security & Audit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">الأمان وسجلات التدقيق وهيئة الدواء</h4>
                <p className="text-[11px] text-slate-500">Security, Audit & EDA Compliance</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">3 خيارات</span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'exportFinancialReports', label: 'تصدير التقارير المالية والإقرارات الضريبية', desc: 'تحميل كشوف حساب المبيعات والمدفوعات' },
              { key: 'auditLogsEDA', label: 'الاطلاع على سجلات التدقيق والتفتيش لهيئة الدواء', desc: 'متابعة سلسلة التبريد وسجلات الشحنات الحرجة' },
              { key: 'manageUserRoles', label: 'إدارة المستخدمين وتعيين الأدوار والصلاحيات', desc: 'إنشاء حسابات جديدة للموظفين وتعديل صلاحياتهم' },
            ].map((item) => {
              const isChecked = (currentRole.permissions.securityAndReports as any)[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => handleToggle('securityAndReports', item.key)}
                  className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 cursor-pointer transition-all select-none"
                >
                  <div className="pr-1">
                    <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{item.desc}</span>
                  </div>

                  <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${isChecked ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${isChecked ? 'left-1' : 'right-1'}`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
