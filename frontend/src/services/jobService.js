import api from './api';

export const jobService = {
  async createJob(jobData) {
    const payload = {
      technician: jobData.technician,
      description: jobData.description,
      service_address: jobData.service_address,
      latitude: jobData.latitude || 0.0,
      longitude: jobData.longitude || 0.0,
    };
    const response = await api.post('/jobs/create/', payload);
    return response.data;
  },

  async getJobs() {
    const response = await api.get('/jobs/');
    return response.data;
  },

  async cancelJob(jobId) {
    const response = await api.patch(`/jobs/${jobId}/cancel/`, {});
    return response.data;
  },

  async updateJobStatus(jobId, status) {
    const response = await api.patch(`/jobs/${jobId}/status/`, { status });
    return response.data;
  },
};

export default jobService;
