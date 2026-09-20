import React, { useState } from 'react';
import { NavTab, Order, Pharmacy, MedicalRep, Product, RegionHub, RolePermission } from './types';
import { 
  INITIAL_ORDERS, 
  INITIAL_PHARMACIES, 
  INITIAL_REPS, 
  INITIAL_PRODUCTS, 
  REGION_HUBS, 
  INITIAL_ROLES 
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/views/DashboardView';
import { OrdersView } from './components/views/OrdersView';
import { PharmaciesView } from './components/views/PharmaciesView';
import { MedicalRepsView } from './components/views/MedicalRepsView';
import { ProductsView } from './components/views/ProductsView';
import { RegionsView } from './components/views/RegionsView';
import { PermissionsView } from './components/views/PermissionsView';
import { OrderDetailsModal } from './components/modals/OrderDetailsModal';
import { NewOrderModal } from './components/modals/NewOrderModal';
import { NewPharmacyModal } from './components/modals/NewPharmacyModal';
import { NewProductModal } from './components/modals/NewProductModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(INITIAL_PHARMACIES);
  const [reps, setReps] = useState<MedicalRep[]>(INITIAL_REPS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [regions, setRegions] = useState<RegionHub[]>(REGION_HUBS);
  const [roles, setRoles] = useState<RolePermission[]>(INITIAL_ROLES);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Modals state
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState<boolean>(false);
  const [initialPharmacyForOrder, setInitialPharmacyForOrder] = useState<Pharmacy | null>(null);
  const [initialProductForOrder, setInitialProductForOrder] = useState<Product | null>(null);
  const [isNewPharmacyModalOpen, setIsNewPharmacyModalOpen] = useState<boolean>(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState<boolean>(false);

  // Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleCreateOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // update pharmacy volume
    setPharmacies((prev) =>
      prev.map((ph) => {
        if (ph.name === newOrder.pharmacyName) {
          return {
            ...ph,
            ordersCount: ph.ordersCount + 1,
            totalVolume: ph.totalVolume + newOrder.totalAmount,
            creditUsed: Math.min(ph.creditLimit, ph.creditUsed + newOrder.totalAmount),
            lastOrderDate: 'منذ دقيقة',
          };
        }
        return ph;
      })
    );
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrderForDetails && selectedOrderForDetails.id === orderId) {
      setSelectedOrderForDetails((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleToggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleSelectPharmacyForOrder = (ph: Pharmacy) => {
    setInitialPharmacyForOrder(ph);
    setInitialProductForOrder(null);
    setIsNewOrderModalOpen(true);
  };

  const handleAddProductToOrder = (prod: Product) => {
    setInitialProductForOrder(prod);
    setInitialPharmacyForOrder(null);
    setIsNewOrderModalOpen(true);
  };

  const handleAssignOrderToRep = (rep: MedicalRep) => {
    // Open order modal with this rep or notify
    alert(`تم اختيار المندوب ${rep.name} (${rep.code}) لتعيينه للشحنات القادمة`);
    setIsNewOrderModalOpen(true);
  };

  const handleAddPharmacy = (newPh: Pharmacy) => {
    setPharmacies((prev) => [newPh, ...prev]);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleSaveRolePermissions = (updatedRoles: RolePermission[]) => {
    setRoles(updatedRoles);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-['Cairo']">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        ordersCount={orders.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          onOpenNewOrder={() => {
            setInitialPharmacyForOrder(null);
            setInitialProductForOrder(null);
            setIsNewOrderModalOpen(true);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-12">
            {currentTab === 'dashboard' && (
              <DashboardView
                orders={orders}
                products={products}
                regions={regions}
                onOpenOrderDetails={setSelectedOrderForDetails}
                onOpenNewOrder={() => {
                  setInitialPharmacyForOrder(null);
                  setInitialProductForOrder(null);
                  setIsNewOrderModalOpen(true);
                }}
                onNavigateToTab={setCurrentTab}
                onToggleProductAvailability={handleToggleProductAvailability}
              />
            )}

            {currentTab === 'orders' && (
              <OrdersView
                orders={orders}
                onOpenOrderDetails={setSelectedOrderForDetails}
                onOpenNewOrder={() => {
                  setInitialPharmacyForOrder(null);
                  setInitialProductForOrder(null);
                  setIsNewOrderModalOpen(true);
                }}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'pharmacies' && (
              <PharmaciesView
                pharmacies={pharmacies}
                onOpenNewPharmacy={() => setIsNewPharmacyModalOpen(true)}
                onSelectPharmacyForOrder={handleSelectPharmacyForOrder}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'reps' && (
              <MedicalRepsView
                reps={reps}
                onAssignOrderToRep={handleAssignOrderToRep}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'products' && (
              <ProductsView
                products={products}
                onOpenNewProduct={() => setIsNewProductModalOpen(true)}
                onToggleProductAvailability={handleToggleProductAvailability}
                onAddProductToOrder={handleAddProductToOrder}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'regions' && (
              <RegionsView regions={regions} />
            )}

            {currentTab === 'permissions' && (
              <PermissionsView
                roles={roles}
                onSaveRolePermissions={handleSaveRolePermissions}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        order={selectedOrderForDetails}
        onClose={() => setSelectedOrderForDetails(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        pharmacies={pharmacies}
        reps={reps}
        products={products}
        initialPharmacy={initialPharmacyForOrder}
        initialProduct={initialProductForOrder}
        onCreateOrder={handleCreateOrder}
      />

      <NewPharmacyModal
        isOpen={isNewPharmacyModalOpen}
        onClose={() => setIsNewPharmacyModalOpen(false)}
        reps={reps}
        onAddPharmacy={handleAddPharmacy}
      />

      <NewProductModal
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
