import { useState } from "react";
import axios from "axios";

const useUpdateData = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(url, data); // Or use axios.patch for partial updates
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, updateData };
};

export default useUpdateData;
