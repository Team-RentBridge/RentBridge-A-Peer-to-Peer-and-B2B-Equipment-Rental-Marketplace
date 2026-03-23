import Navbar from "../components/layout/Navbar";
import StatsCard from "../components/profile/StatsCard";
import RentalTable from "../components/profile/RentalTable";
import CredibilityCard from "../components/profile/CredibilityCard";

function Profile() {
  const stats = [
    { title: "Total Sells", value: 12 },
    { title: "Total Rentals", value: 8 },
    { title: "Total Buys", value: 5 },
    { title: "Late Returns", value: 2 },
  ];

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatsCard key={i} title={s.title} value={s.value} />
          ))}
        </div>

        {/* RENTAL TABLE */}
        <RentalTable />

        {/* EXTRA */}
        <div className="grid md:grid-cols-2 gap-4">
          <CredibilityCard />
        </div>

      </div>
    </>
  );
}

export default Profile;