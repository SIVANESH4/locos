import api from './api';

export const reviewService = {
  async getReviews() {
    const response = await api.get('/reviews/');
    return response.data;
  },

  async createReview(reviewData) {
    const payload = {
      job: reviewData.jobId,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
    };
    const response = await api.post('/reviews/create/', payload);
    return response.data;
  },
};

export default reviewService;
