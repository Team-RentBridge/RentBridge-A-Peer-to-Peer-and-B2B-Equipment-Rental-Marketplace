import { enUS } from "date-fns/locale";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-date-range";

function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState("");
  const [rentType, setRentType] = useState("take");

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const pricePerDay = product.price || 100;

  const calculateRent = () => {
    const start = range[0].startDate;
    const end = range[0].endDate;

    const days =
      (end - start) / (1000 * 60 * 60 * 24);

    return days > 0 ? days * pricePerDay * quantity : 0;
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="border rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition bg-white"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg mb-3"
        />

        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-gray-500 text-sm">
          ₹{product.price}/day
        </p>

        <span
          className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
            product.type === "peer"
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {product.type}
        </span>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[60%] h-[85%] rounded-xl p-6 overflow-y-auto"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* LEFT */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-lg"
                />

                {/* RIGHT */}
                <div>
                  <h2 className="text-2xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 mb-3">
                    ₹{product.price}/day
                  </p>

                  {/* QUANTITY */}
                  <div className="border rounded-lg px-3 py-2 mb-4 w-40">
                    <label className="text-sm text-gray-500">
                      Quantity
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Number(e.target.value))
                      }
                      className="w-full outline-none"
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* BUTTONS */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setMode("buy")}
                      className="w-full bg-yellow-400 py-2 rounded-full font-semibold hover:bg-yellow-500"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => setMode("buy")}
                      className="w-full bg-orange-400 py-2 rounded-full font-semibold hover:bg-orange-500"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => setMode("rent")}
                      className="w-full bg-blue-500 py-2 rounded-full text-white font-semibold hover:bg-blue-600"
                    >
                      Rent
                    </button>
                  </div>

                  {/* RENT FLOW */}
                  <AnimatePresence>
                    {mode === "rent" && (
                      <motion.div
                        className="mt-6 border-t pt-4 space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* TOGGLE */}
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              setRentType("take")
                            }
                            className={`px-4 py-1 rounded-full ${
                              rentType === "take"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            Take on Rent
                          </button>

                          <button
                            onClick={() =>
                              setRentType("give")
                            }
                            className={`px-4 py-1 rounded-full ${
                              rentType === "give"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            Give on Rent
                          </button>
                        </div>

                        {/* CALENDAR */}
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setRange([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={range}
                          locale={enUS}
                        />

                        {/* PRICE */}
                        <div className="text-lg font-semibold">
                          Total: ₹{calculateRent()}
                        </div>

                        {/* FINAL BUTTONS */}
                        <button className="w-full bg-yellow-400 py-2 rounded-full font-semibold">
                          Add to Cart
                        </button>

                        <button className="w-full bg-orange-400 py-2 rounded-full font-semibold">
                          Go Now
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;