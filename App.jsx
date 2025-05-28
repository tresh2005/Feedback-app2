import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await axios.get("https://your-api/render-url/api/feedbacks");
    setFeedbacks(res.data);
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await axios.post("https://your-api/render-url/api/feedbacks", { message });
    setMessage("");
    fetchFeedbacks();
  };

  const deleteFeedback = async (id) => {
    await axios.delete(`https://your-api/render-url/api/feedbacks/${id}`);
    fetchFeedbacks();
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Anonymous Feedback</h1>
      <form onSubmit={submitFeedback} className="mb-6">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded" placeholder="Write feedback..." />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
      <ul>
        {feedbacks.map((fb) => (
          <li key={fb._id} className="bg-gray-100 p-3 mb-2 rounded flex justify-between">
            <span>{fb.message}</span>
            <button onClick={() => deleteFeedback(fb._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
