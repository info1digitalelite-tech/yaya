export type NavTab = 
  | 'dashboard' 
  | 'orders' 
  | 'pharmacies' 
  | 'reps' 
  | 'products' 
  | 'regions' 
  | 'permissions';

export interface OrderItem {
  id: string;
  name: string;
  nameEn: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  pharmacyName: string;
  pharmacyBranch: string;
  repName: string;
  repCode: string;
  repAvatar: string;
  itemsCount: number;
  totalAmount: number;
  orderTime: string;
  deliveryEstimate: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  coldChainRequired: boolean;
  currentTemp?: number;
  slaStatus: 'on_track' | 'urgent' | 'completed';
  region: string;
  items: OrderItem[];
}

export interface Pharmacy {
  id: string;
  name: string;
  type: 'chain' | 'independent' | 'hospital';
  branch: string;
  address: string;
  governorate: string;
  phone: string;
  licenseNumber: string;
  edaStatus: 'verified' | 'under_review';
  ordersCount: number;
  totalVolume: number;
  creditLimit: number;
  creditUsed: number;
  rating: number;
  assignedRep: string;
  lastOrderDate: string;
}

export interface MedicalRep {
  id: string;
  code: string;
  name: string;
  title: string;
  region: string;
  phone: string;
  avatar: string;
  vehicleType: string;
  vehicleTemp: number;
  status: 'active' | 'break' | 'offline';
  completedDeliveries: number;
  activeOrders: number;
  rating: number;
  batteryLevel: number;
  lastLocation: string;
  complianceRate: number;
}

export interface Product {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: string;
  dosage: string;
  manufacturer: string;
  wholesalePrice: number;
  retailPrice: number;
  stockUnits: number;
  minStockAlert: number;
  requiresColdChain: boolean;
  tempRange: string;
  batchNumber: string;
  expiryDate: string;
  image: string;
  edaCode: string;
  isAvailable: boolean;
}

export interface RegionHub {
  id: string;
  country: string;
  name: string;
  distributionCentersCount: number;
  activePharmacies: number;
  dailyOrders: number;
  complianceRate: number;
  storageCapacityUsed: number;
  hubColdTemp: number;
  status: 'operational' | 'high_load' | 'maintenance';
}

export interface RolePermission {
  id: string;
  roleId: string;
  roleName: string;
  roleTitleEn: string;
  description: string;
  usersAssigned: number;
  permissions: {
    orders: {
      viewAll: boolean;
      approveOrders: boolean;
      assignReps: boolean;
      cancelOrders: boolean;
    };
    catalog: {
      editProducts: boolean;
      updateWholesalePricing: boolean;
      manageStockAlerts: boolean;
      manageBatches: boolean;
    };
    pharmaciesAndReps: {
      approvePharmacies: boolean;
      updateCreditLimits: boolean;
      liveGpsTracking: boolean;
      manageCommissions: boolean;
    };
    securityAndReports: {
      exportFinancialReports: boolean;
      auditLogsEDA: boolean;
      manageUserRoles: boolean;
    };
  };
}
