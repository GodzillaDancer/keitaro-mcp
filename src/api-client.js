import axios from 'axios';
    import { config } from './config.js';

    export class KeitaroApiClient {
      constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.client = axios.create({
          baseURL: apiUrl,
          headers: {
            'Api-Key': apiKey,
            'Content-Type': 'application/json'
          }
        });
      }

      async request(method, endpoint, data = null, params = null) {
        try {
          const response = await this.client({
            method,
            url: endpoint,
            data: method !== 'get' ? data : undefined,
            params: method === 'get' ? params : undefined
          });
          return response.data;
        } catch (error) {
          if (error.response) {
            throw new Error(`Keitaro API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
          } else if (error.request) {
            throw new Error('Keitaro API Error: No response received from server');
          } else {
            throw new Error(`Keitaro API Error: ${error.message}`);
          }
        }
      }

      // Campaigns
      async getCampaigns(params) {
        return this.request('get', '/campaigns', null, params);
      }

      async getCampaign(id) {
        return this.request('get', `/campaigns/${id}`);
      }

      async createCampaign(data) {
        return this.request('post', '/campaigns', data);
      }

      async updateCampaign(id, data) {
        return this.request('put', `/campaigns/${id}`, data);
      }

      async deleteCampaign(id) {
        return this.request('delete', `/campaigns/${id}`);
      }

      // Traffic sources
      async getTrafficSources(params) {
        return this.request('get', '/traffic_sources', null, params);
      }

      async getTrafficSource(id) {
        return this.request('get', `/traffic_sources/${id}`);
      }

      // Offers
      async getOffers(params) {
        return this.request('get', '/offers', null, params);
      }

      async getOffer(id) {
        return this.request('get', `/offers/${id}`);
      }

      // Streams
      async getStreams(campaignId, params) {
        return this.request('get', `/campaigns/${campaignId}/streams`, null, params);
      }

      async getStream(campaignId, streamId) {
        return this.request('get', `/campaigns/${campaignId}/streams/${streamId}`);
      }

      // Reports
      async getReport(params) {
        return this.request('get', '/report', null, params);
      }

      // Clicks
      async getClicks(params) {
        return this.request('get', '/clicks', null, params);
      }

      async getClick(id) {
        return this.request('get', `/clicks/${id}`);
      }

      // Conversions
      async getConversions(params) {
        return this.request('get', '/conversions', null, params);
      }

      async getConversion(id) {
        return this.request('get', `/conversions/${id}`);
      }

      // Domains
      async getDomains(params) {
        return this.request('get', '/domains', null, params);
      }

      async getDomain(id) {
        return this.request('get', `/domains/${id}`);
      }
    }

    export const getApiClient = () => {
      if (!config.isConfigured()) {
        throw new Error('Keitaro API is not configured. Please set KEITARO_API_URL and KEITARO_API_KEY in .env file.');
      }
      return new KeitaroApiClient(config.apiUrl, config.apiKey);
    };
