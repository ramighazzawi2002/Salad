import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReplyForm = ({ reviewId, onReplyAdded }) => {
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = Cookies.get('user_id');
      console.log(userId)
      if (!userId) {
        setError('User is not authenticated');
        return;
      }

      await axios.post(`http://localhost:3000/api/reviews/${reviewId}/replies`, { content: reply });
      setSuccess('Reply added successfully!');
      setReply('');
      onReplyAdded();  // لإعادة تحميل المراجعات بعد إضافة الرد
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add reply');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Add a reply..."
        required
      ></textarea>
      <button type="submit">Reply</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default ReplyForm;
