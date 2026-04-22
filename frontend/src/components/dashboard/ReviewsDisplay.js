import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import API from "../../api/api";

function ReviewsDisplay({ equipment_id, user }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [equipment_id]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/reviews/equipment/${equipment_id}`);
      setReviews(res.data.reviews);
      setAvgRating(res.data.avg_rating);
      setTotalReviews(res.data.total_reviews);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await API.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter(r => r.id !== reviewId));
      loadReviews(); // Reload to update avg rating
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white/40">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="glass-dark rounded-2xl border border-white/5 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(avgRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/20"
                }`}
              />
            ))}
          </div>
          <div>
            <div className="text-3xl font-bold text-white">
              {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
            </div>
            <div className="text-white/60 text-sm">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-dark rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-white">{review.reviewer_name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                    <span className="text-white/60 text-sm ml-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {user && (user.id === review.user_id || user.role === 'admin') && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {review.comment && (
                <p className="text-white/70 text-sm leading-relaxed">
                  {review.comment}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-dark rounded-2xl border border-white/5 p-8 text-center text-white/40">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  );
}

export default ReviewsDisplay;
