import { useState, useEffect } from "react";

function RentalTable() {
  const [type, setType] = useState("peer");
  const [time, setTime] = useState(Date.now());

  // ⏱ live timer update
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rentals = [
    {
      id: 1,
      name: "Camera",
      quantity: 1,
      endDate: new Date(Date.now() + 2 * 86400000), // 2 days
    },
    {
      id: 2,
      name: "Drill Machine",
      quantity: 2,
      endDate: new Date(Date.now() - 86400000), // overdue
    },
  ];

  const getStatus = (endDate) => {
    return endDate > time ? "Active" : "Due";
  };

  const getCountdown = (endDate) => {
    const diff = endDate - time;

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    return `${days}d ${hours}h`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* TOGGLE */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setType("peer")}
          className={`px-4 py-1 rounded-full ${
            type === "peer"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Peer
        </button>

        <button
          onClick={() => setType("business")}
          className={`px-4 py-1 rounded-full ${
            type === "business"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Business
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">S.No</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Countdown</th>
          </tr>
        </thead>

        <tbody>
          {rentals.map((r, index) => (
            <tr key={r.id} className="border-b">
              <td className="py-2">{index + 1}</td>
              <td>{r.name}</td>
              <td>{r.quantity}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    getStatus(r.endDate) === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {getStatus(r.endDate)}
                </span>
              </td>

              <td>{getCountdown(r.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RentalTable;