import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import WhyUs from "../components/home/Whyus";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Header />

      <main>
        <Hero />
        <Features />
        <WhyUs />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default Home;