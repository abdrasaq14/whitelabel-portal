
import { SideItem } from "../../../containers/dashboard/Sidebar";
import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";

export const AdminLayout = () => {
  return (
    <DashboardWrapper sidebar={sidebar}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};
export const sidebar: SideItem[] = [
  { name: "Dashboard", path: "/dashboard", iconName: "dashboard" },
  { name: "Product Discovery", path: "/discover-products", iconName: "discover" },
  { name: "Inventory", path: "/inventory", iconName: "inventory" },
  {
    name: "Merchant", iconName:"people", path:"merchant", children: [
      { name: "All merchants", path: "/merchant/all-merchants", iconName: "report" },
      // { name: "Add merchants", path: "/merchant/add-merchants", iconName: "report" },
      { name: "Merchant Request", path: "/merchant/request-merchants", iconName: "note" },
      { name: "Suspended Merchant ", path: "/merchant/suspend-merchants ", iconName: "swap" },
    ]
  },
  {
    name: "Product", iconName:"note", path:"product", children: [
      { name: "All Products", path: "/product/all-products" },
      { name: "Blocked Products", path: "/product/blocked-products", },
    ]
  },
  { name: "Order & Transaction", path: "/orders", iconName: "orders" },
  { name: "Blog", path: "/blog", iconName: "blog" },
  { name: "Message", path: "/message", iconName: "sms" },
  { name: "Account", path: "/account", iconName: "account" },
  { name: "Settings", path: "/settings", iconName: "settings" },
];
