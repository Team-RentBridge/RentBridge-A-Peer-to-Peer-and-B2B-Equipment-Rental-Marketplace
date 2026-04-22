import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import API from "../../api/api";

function ReviewForm({ equipment_id, onSubmitSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      await API.post("/reviews", {
        equipment_id,
        rating,
        comment: comment || null
      });
      setSubmitted(true);
      setRating(0);
      setComment("");
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="glass-dark rounded-2xl border border-green-500/30 bg-green-500/5 p-6 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
          <Star className="w-5 h-5 fill-green-400" />
          Thank you! Your review has been submitted.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-dark rounded-2xl border border-white/5 p-8 space-y-6 shadow-2xl"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Share Your Experience</h3>
        
        {/* Rating Stars */}
        <div className="flex gap-3 items-center mb-6">
          <span className="text-white/60 text-sm font-medium">Rate this equipment:</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                type="button"
                onMouseEnter={() => setHoverRating(num)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(num)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="focus:outline-none transition-transform"
              >
                <Star
                  className={`w-8 h-8 transition-all ${
                    num <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-white/30"
                  }`}
                />
              </motion.button>
            ))}
          </div>
          {rating > 0 && (
            <span className="text-yellow-400 font-bold ml-auto">
              {rating}.0 / 5.0
            </span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-white font-medium mb-3">
          Your Review (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this equipment..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500/50 resize-none"
          rows="4"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!rating || loading}
        className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-500/20"
      >
        <Send className="w-4 h-4" />
        {loading ? "Submitting..." : "Submit Review"}
      </motion.button>
    </motion.form>
  );
}

export default ReviewForm;
