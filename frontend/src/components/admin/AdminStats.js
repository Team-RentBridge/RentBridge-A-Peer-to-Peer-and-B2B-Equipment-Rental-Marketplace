function AdminStats() {
  const stats = [
    { title: "Total Transactions", value: 120 },
    { title: "Total Revenue", value: "₹50,000" },
    { title: "Total Users", value: 80 },
    { title: "Active Users", value: 45 },
    { title: "Daily Users", value: 20 },
    { title: "Businesses", value: 15 },
    { title: "Peers", value: 65 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">{s.title}</p>
          <h2 className="text-xl font-bold">{s.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;