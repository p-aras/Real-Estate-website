import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { feedback, rating });
    // Here you would typically send the feedback to your server
    alert('Thank you for your feedback!');
    setFeedback('');
    setRating(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-700 font-bold mb-2">Your Feedback</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;