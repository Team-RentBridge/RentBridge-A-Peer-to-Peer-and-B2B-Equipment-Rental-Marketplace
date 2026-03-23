import Navbar from "../components/layout/Navbar";
import AdminStats from "../components/admin/AdminStats";
import Charts from "../components/admin/Charts";
import UserTable from "../components/admin/UserTable";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">

        <AdminStats />

        <Charts />

        <UserTable />

      </div>
    </>
  );
}

export default AdminDashboard;