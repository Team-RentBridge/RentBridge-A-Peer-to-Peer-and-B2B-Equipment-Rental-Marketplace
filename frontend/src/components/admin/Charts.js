function Charts() {
  return (
    <div className="grid md:grid-cols-2 gap-4">

      {/* Revenue */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Revenue Trend</h2>

        <div className="h-40 flex items-end gap-2">
          {[30, 50, 70, 40, 90].map((h, i) => (
            <div
              key={i}
              className="bg-blue-500 w-6"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Users */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">User Growth</h2>

        <div className="h-40 flex items-end gap-2">
          {[20, 40, 60, 80, 100].map((h, i) => (
            <div
              key={i}
              className="bg-green-500 w-6"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Charts;