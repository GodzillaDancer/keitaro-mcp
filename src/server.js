import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getApiClient } from './api-client.js';
import { config } from './config.js';

// Create an MCP server for Keitaro TDS API
const server = new McpServer({
  name: "Keitaro TDS API",
  version: "1.0.0",
  description: "MCP server for interacting with Keitaro TDS API"
});

// Check if API is configured
const isApiConfigured = config.isConfigured();
if (!isApiConfigured) {
  console.warn('⚠️ Keitaro API is not configured. Please set KEITARO_API_URL and KEITARO_API_KEY in .env file.');
}

// Helper function to format API responses
const formatResponse = (data) => {
  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2);
  }
  return String(data);
};

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error.message);
  return {
    content: [{ type: "text", text: `Error: ${error.message}` }],
    isError: true
  };
};

// Campaigns
server.tool(
  "list_campaigns",
  {
    limit: z.number().optional().describe("Maximum number of campaigns to return"),
    page: z.number().optional().describe("Page number for pagination"),
    search: z.string().optional().describe("Search term to filter campaigns")
  },
  async ({ limit, page, search }) => {
    try {
      const apiClient = getApiClient();
      const params = { limit, page, search };
      const campaigns = await apiClient.getCampaigns(params);
      return {
        content: [{ type: "text", text: formatResponse(campaigns) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List campaigns with optional filtering" }
);

server.tool(
  "get_campaign",
  {
    id: z.number().describe("Campaign ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const campaign = await apiClient.getCampaign(id);
      return {
        content: [{ type: "text", text: formatResponse(campaign) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific campaign" }
);

server.tool(
  "create_campaign",
  {
    name: z.string().describe("Campaign name"),
    type: z.string().describe("Campaign type"),
    cost_type: z.string().optional().describe("Cost type"),
    cost_value: z.number().optional().describe("Cost value"),
    group_id: z.number().optional().describe("Group ID"),
    state: z.string().optional().describe("Campaign state"),
    traffic_source_id: z.number().optional().describe("Traffic source ID")
  },
  async (params) => {
    try {
      const apiClient = getApiClient();
      const result = await apiClient.createCampaign(params);
      return {
        content: [{ type: "text", text: formatResponse(result) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Create a new campaign" }
);

server.tool(
  "update_campaign",
  {
    id: z.number().describe("Campaign ID"),
    name: z.string().optional().describe("Campaign name"),
    type: z.string().optional().describe("Campaign type"),
    cost_type: z.string().optional().describe("Cost type"),
    cost_value: z.number().optional().describe("Cost value"),
    group_id: z.number().optional().describe("Group ID"),
    state: z.string().optional().describe("Campaign state"),
    traffic_source_id: z.number().optional().describe("Traffic source ID")
  },
  async ({ id, ...data }) => {
    try {
      const apiClient = getApiClient();
      const result = await apiClient.updateCampaign(id, data);
      return {
        content: [{ type: "text", text: formatResponse(result) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Update an existing campaign" }
);

server.tool(
  "delete_campaign",
  {
    id: z.number().describe("Campaign ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const result = await apiClient.deleteCampaign(id);
      return {
        content: [{ type: "text", text: formatResponse(result) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Delete a campaign" }
);

// Traffic Sources
server.tool(
  "list_traffic_sources",
  {
    limit: z.number().optional().describe("Maximum number of traffic sources to return"),
    page: z.number().optional().describe("Page number for pagination")
  },
  async ({ limit, page }) => {
    try {
      const apiClient = getApiClient();
      const params = { limit, page };
      const trafficSources = await apiClient.getTrafficSources(params);
      return {
        content: [{ type: "text", text: formatResponse(trafficSources) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List traffic sources" }
);

server.tool(
  "get_traffic_source",
  {
    id: z.number().describe("Traffic source ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const trafficSource = await apiClient.getTrafficSource(id);
      return {
        content: [{ type: "text", text: formatResponse(trafficSource) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific traffic source" }
);

// Offers
server.tool(
  "list_offers",
  {
    limit: z.number().optional().describe("Maximum number of offers to return"),
    page: z.number().optional().describe("Page number for pagination"),
    search: z.string().optional().describe("Search term to filter offers")
  },
  async ({ limit, page, search }) => {
    try {
      const apiClient = getApiClient();
      const params = { limit, page, search };
      const offers = await apiClient.getOffers(params);
      return {
        content: [{ type: "text", text: formatResponse(offers) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List offers with optional filtering" }
);

server.tool(
  "get_offer",
  {
    id: z.number().describe("Offer ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const offer = await apiClient.getOffer(id);
      return {
        content: [{ type: "text", text: formatResponse(offer) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific offer" }
);

// Streams
server.tool(
  "list_streams",
  {
    campaign_id: z.number().describe("Campaign ID"),
    limit: z.number().optional().describe("Maximum number of streams to return"),
    page: z.number().optional().describe("Page number for pagination")
  },
  async ({ campaign_id, limit, page }) => {
    try {
      const apiClient = getApiClient();
      const params = { limit, page };
      const streams = await apiClient.getStreams(campaign_id, params);
      return {
        content: [{ type: "text", text: formatResponse(streams) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List streams for a campaign" }
);

server.tool(
  "get_stream",
  {
    campaign_id: z.number().describe("Campaign ID"),
    stream_id: z.number().describe("Stream ID")
  },
  async ({ campaign_id, stream_id }) => {
    try {
      const apiClient = getApiClient();
      const stream = await apiClient.getStream(campaign_id, stream_id);
      return {
        content: [{ type: "text", text: formatResponse(stream) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific stream" }
);

// Reports
server.tool(
  "get_report",
  {
    from: z.string().describe("Start date (YYYY-MM-DD)"),
    to: z.string().describe("End date (YYYY-MM-DD)"),
    group: z.string().optional().describe("Grouping parameter (e.g., 'campaign', 'offer', 'day')"),
    filters: z.record(z.any()).optional().describe("Filters as key-value pairs")
  },
  async ({ from, to, group, filters }) => {
    try {
      const apiClient = getApiClient();
      const params = { from, to, group, ...filters };
      const report = await apiClient.getReport(params);
      return {
        content: [{ type: "text", text: formatResponse(report) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Generate a report with custom parameters" }
);

// Clicks
server.tool(
  "list_clicks",
  {
    limit: z.number().optional().describe("Maximum number of clicks to return"),
    page: z.number().optional().describe("Page number for pagination"),
    campaign_id: z.number().optional().describe("Filter by campaign ID"),
    from: z.string().optional().describe("Start date (YYYY-MM-DD)"),
    to: z.string().optional().describe("End date (YYYY-MM-DD)")
  },
  async (params) => {
    try {
      const apiClient = getApiClient();
      const clicks = await apiClient.getClicks(params);
      return {
        content: [{ type: "text", text: formatResponse(clicks) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List clicks with optional filtering" }
);

server.tool(
  "get_click",
  {
    id: z.number().describe("Click ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const click = await apiClient.getClick(id);
      return {
        content: [{ type: "text", text: formatResponse(click) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific click" }
);

// Conversions
server.tool(
  "list_conversions",
  {
    limit: z.number().optional().describe("Maximum number of conversions to return"),
    page: z.number().optional().describe("Page number for pagination"),
    campaign_id: z.number().optional().describe("Filter by campaign ID"),
    from: z.string().optional().describe("Start date (YYYY-MM-DD)"),
    to: z.string().optional().describe("End date (YYYY-MM-DD)")
  },
  async (params) => {
    try {
      const apiClient = getApiClient();
      const conversions = await apiClient.getConversions(params);
      return {
        content: [{ type: "text", text: formatResponse(conversions) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List conversions with optional filtering" }
);

server.tool(
  "get_conversion",
  {
    id: z.number().describe("Conversion ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const conversion = await apiClient.getConversion(id);
      return {
        content: [{ type: "text", text: formatResponse(conversion) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific conversion" }
);

// Domains
server.tool(
  "list_domains",
  {
    limit: z.number().optional().describe("Maximum number of domains to return"),
    page: z.number().optional().describe("Page number for pagination")
  },
  async ({ limit, page }) => {
    try {
      const apiClient = getApiClient();
      const params = { limit, page };
      const domains = await apiClient.getDomains(params);
      return {
        content: [{ type: "text", text: formatResponse(domains) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "List domains" }
);

server.tool(
  "get_domain",
  {
    id: z.number().describe("Domain ID")
  },
  async ({ id }) => {
    try {
      const apiClient = getApiClient();
      const domain = await apiClient.getDomain(id);
      return {
        content: [{ type: "text", text: formatResponse(domain) }]
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  { description: "Get details of a specific domain" }
);

// Resources
server.resource(
  "campaign",
  new ResourceTemplate("keitaro://campaign/{id}", { list: "keitaro://campaigns" }),
  async (uri, { id }) => {
    try {
      const apiClient = getApiClient();
      const campaign = await apiClient.getCampaign(Number(id));
      return {
        contents: [{
          uri: uri.href,
          text: formatResponse(campaign)
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error: ${error.message}`
        }]
      };
    }
  }
);

server.resource(
  "campaigns",
  new ResourceTemplate("keitaro://campaigns", { list: undefined }),
  async (uri) => {
    try {
      const apiClient = getApiClient();
      const campaigns = await apiClient.getCampaigns({});
      return {
        contents: [{
          uri: uri.href,
          text: formatResponse(campaigns)
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error: ${error.message}`
        }]
      };
    }
  }
);

server.resource(
  "offer",
  new ResourceTemplate("keitaro://offer/{id}", { list: "keitaro://offers" }),
  async (uri, { id }) => {
    try {
      const apiClient = getApiClient();
      const offer = await apiClient.getOffer(Number(id));
      return {
        contents: [{
          uri: uri.href,
          text: formatResponse(offer)
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error: ${error.message}`
        }]
      };
    }
  }
);

server.resource(
  "offers",
  new ResourceTemplate("keitaro://offers", { list: undefined }),
  async (uri) => {
    try {
      const apiClient = getApiClient();
      const offers = await apiClient.getOffers({});
      return {
        contents: [{
          uri: uri.href,
          text: formatResponse(offers)
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error: ${error.message}`
        }]
      };
    }
  }
);

export { server };
