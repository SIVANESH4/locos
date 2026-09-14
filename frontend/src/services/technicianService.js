import api from './api';

export const technicianService = {
  async getCategories() {
    const response = await api.get('/categories/');
    return response.data;
  },

  async getTechnicians(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.min_rating) queryParams.append('min_rating', params.min_rating);

    const queryString = queryParams.toString();
    const url = queryString ? `/technicians/?${queryString}` : '/technicians/';
    const response = await api.get(url);
    return response.data;
  },

  async getTechnicianProfile(id) {
    const response = await api.get(`/technicians/profile/${id}/`);
    return response.data;
  },

  async createProfile(profileData) {
    const payload = {
      category: Number(profileData.category),
      bio: profileData.bio,
      experience: Number(profileData.experience),
      address: profileData.address,
      latitude: Number(profileData.latitude || 0.0),
      longitude: Number(profileData.longitude || 0.0),
    };
    const response = await api.post('/technicians/profile/', payload);
    return response.data;
  },

  async updateProfile(profileId, profileData) {
    const payload = {
      category: Number(profileData.category),
      bio: profileData.bio,
      experience: Number(profileData.experience),
      address: profileData.address,
      latitude: Number(profileData.latitude || 0.0),
      longitude: Number(profileData.longitude || 0.0),
    };
    const response = await api.patch(`/technicians/profile/${profileId}/`, payload);
    return response.data;
  },
};

export default technicianService;
