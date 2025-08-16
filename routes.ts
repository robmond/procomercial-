import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  propertyFiltersSchema, 
  calculatorInputSchema, 
  insertInvestmentSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all properties with optional filters
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = propertyFiltersSchema.parse(req.query);
      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(400).json({ error: "Invalid filters" });
    }
  });

  // Get single property and increment view count
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      // Increment view count
      await storage.incrementViewCount(id);
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Get all communes
  app.get("/api/communes", async (req, res) => {
    try {
      const communes = await storage.getCommunes();
      res.json(communes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch communes" });
    }
  });

  // Investment calculator
  app.post("/api/calculate", async (req, res) => {
    try {
      const input = calculatorInputSchema.parse(req.body);
      
      const monthlyRate = input.expectedYield / 100 / 12;
      const months = input.period * 12;
      
      // Calculate compound growth
      const futureValue = input.amount * Math.pow(1 + monthlyRate, months);
      const totalProfit = futureValue - input.amount;
      const monthlyIncome = (input.amount * input.expectedYield / 100) / 12;
      const totalROI = (totalProfit / input.amount) * 100;

      res.json({
        initialAmount: input.amount,
        futureValue: Math.round(futureValue * 100) / 100,
        totalProfit: Math.round(totalProfit * 100) / 100,
        monthlyIncome: Math.round(monthlyIncome * 100) / 100,
        yearlyReturn: Math.round((monthlyIncome * 12) * 100) / 100,
        totalROI: Math.round(totalROI * 100) / 100,
        period: input.period,
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid calculation parameters" });
    }
  });

  // Create investment (reservation)
  app.post("/api/investments", async (req, res) => {
    try {
      const investment = insertInvestmentSchema.parse(req.body);
      const newInvestment = await storage.createInvestment(investment);
      res.status(201).json(newInvestment);
    } catch (error) {
      res.status(400).json({ error: "Failed to create investment" });
    }
  });

  // Get user portfolio stats (mock user for demo)
  app.get("/api/portfolio/stats", async (req, res) => {
    try {
      // Using a mock user ID for demo purposes
      const mockUserId = "demo-user";
      const stats = await storage.getPortfolioStats(mockUserId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio stats" });
    }
  });

  // Search properties
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query required" });
      }

      const allProperties = await storage.getProperties();
      const searchTerm = q.toLowerCase();
      
      const results = allProperties.filter(property => 
        property.name.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm) ||
        property.commune.toLowerCase().includes(searchTerm) ||
        property.propertyType.toLowerCase().includes(searchTerm)
      );

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
