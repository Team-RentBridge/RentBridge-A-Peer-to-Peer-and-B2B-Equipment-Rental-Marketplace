function UserTable() {
  const users = [
    { id: 1, name: "Reshu", role: "Peer", status: "Active" },
    { id: 2, name: "Raunak", role: "Business", status: "Blocked" },
    { id: 3, name: "Aashutosh", role: "Peer", status: "Active" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.id}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    u.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default UserTable;