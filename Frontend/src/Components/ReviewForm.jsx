// ReviewForm.jsx
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReviewForm = ({ recipeId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // التأكد من أن التوكن و الـ userId موجودين في الكوكيز
    //   const token = Cookies.get('token');
    //   const userId = Cookies.get('user_id');
    //   console.log(userId)
    //   console.log(token)
    //   if (!token || !userId) {
    //     setError('User is not authenticated');
    //     return;
    //   }

      
      await axios.post(   
        `http://localhost:3000/api/reviews/recipes/${recipeId}/reviews`,
        { rating, comment },
        {withCredentials:true}
      );

      setSuccess('Review added successfully!');
      setRating(1);
      setComment('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="review-form">
      <h2>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="comment">
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ReviewForm;
