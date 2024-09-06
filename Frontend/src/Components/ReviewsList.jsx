// import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ReviewsList = ({ recipeId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [error, setError] = useState('');

//   // جلب المراجعات عند تحميل المكون
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`/api/reviews/recipes/${recipeId}`);
//         setReviews(response.data);
//       } catch (error) {
//         setError(error.response?.data?.message || 'Failed to load reviews');
//       }
//     };

//     fetchReviews();
//   }, [recipeId]);

//   // حذف المراجعة
//   const handleDelete = async (reviewId) => {
//     try {
//       const userId = Cookies.get('userId');
//       await axios.delete(`/api/reviews/${reviewId}`);
//       setReviews(reviews.filter(review => review._id !== reviewId));
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to delete review');
//     }
//   };

//   // تحديث المراجعة (نقوم فقط بعمل نافذة صغيرة لتعديل التعليق هنا)
//   const handleUpdate = async (reviewId, newComment, newRating) => {
//     try {
//       const response = await axios.put(`/api/reviews/update/${reviewId}`, {
//         comment: newComment,
//         rating: newRating,
//       });
//       setReviews(reviews.map(review => (review._id === reviewId ? response.data.review : review)));
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update review');
//     }
//   };

//   return (
//     <div className="reviews-list">
//       <h2>Reviews</h2>
//       {error && <p className="error">{error}</p>}
//       {reviews.length > 0 ? (
//         reviews.map((review) => (
//           <div key={review._id} className="review">
//             <p><strong>{review.user.name}</strong></p>
//             <p>Rating: {review.rating}</p>
//             <p>{review.comment}</p>
//             <button onClick={() => handleDelete(review._id)}>Delete</button>
//             <button onClick={() => handleUpdate(review._id, prompt('Enter new comment'), prompt('Enter new rating'))}>
//               Update
//             </button>
//             {/* الردود */}
//             <div className="replies">
//               {review.replies.length > 0 && <h4>Replies:</h4>}
//               {review.replies.map((reply) => (
//                 <div key={reply._id}>
//                   <p>{reply.content} - <strong>{reply.author.name}</strong></p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No reviews yet</p>
//       )}
//     </div>
//   );
// };

// export default ReviewsList;
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReviewsList = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  // جلب المراجعات عند تحميل المكون
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reviews/recipes/${recipeId}/reviews`);
        const reviewsData = response.data;

        // تأكد من أن البيانات هي مصفوفة قبل تعيينها
        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else {
          setReviews([]); // إذا كانت البيانات ليست مصفوفة، نعين مصفوفة فارغة
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load reviews');
      }
    };

    fetchReviews();
  }, [recipeId]);

  // حذف المراجعة
  const handleDelete = async (reviewId) => {
    try {
    //   const userId = Cookies.get('user_id');
      await axios.put(`http://localhost:3000/api/reviews/reviews/${reviewId}`,
        {},
        {withCredentials:true}
      ); 
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete review');
    }
  };

  // تحديث المراجعة
  const handleUpdate = async (reviewId) => {
    const newComment = prompt('Enter new comment');
    const newRating = prompt('Enter new rating');
    if (!newComment || !newRating) return;

    try {
      const response = await axios.put(`/api/reviews/update/${reviewId}`, {
        comment: newComment,
        rating: newRating,
      });
      setReviews(reviews.map(review => (review._id === reviewId ? response.data.review : review)));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update review');
    }
  };

  return (
    <div className="reviews-list">
      <h2>Reviews</h2>
      {error && <p className="error">{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <p><strong>{review.user.name}</strong></p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
            <button onClick={() => handleDelete(review._id)}>Delete</button>
            <button onClick={() => handleUpdate(review._id)}>Update</button>

            {/* الردود */}
            {Array.isArray(review.replies) && review.replies.length > 0 && (
              <div className="replies">
                <h4>Replies:</h4>
                {review.replies.map((reply) => (
                  <div key={reply._id}>
                    <p>{reply.content} - <strong>{reply.author.name}</strong></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default ReviewsList;
