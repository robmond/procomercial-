import { 
  type User, 
  type InsertUser, 
  type Property, 
  type InsertProperty,
  type Investment,
  type InsertInvestment,
  type Commune,
  type InsertCommune,
  type PropertyFilters 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Property methods
  getProperties(filters?: PropertyFilters): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined>;
  incrementViewCount(id: string): Promise<void>;

  // Investment methods
  getUserInvestments(userId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;

  // Commune methods
  getCommunes(): Promise<Commune[]>;
  createCommune(commune: InsertCommune): Promise<Commune>;

  // Stats methods
  getPortfolioStats(userId: string): Promise<{
    totalValue: number;
    propertiesCount: number;
    monthlyIncome: number;
    averageYield: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private investments: Map<string, Investment>;
  private communes: Map<string, Commune>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.investments = new Map();
    this.communes = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize communes
    const communesData = [
      { name: "Las Condes", propertyCount: 8, averageYield: 15.9, minPrice: 169, maxPrice: 299 },
      { name: "Santiago", propertyCount: 15, averageYield: 5.5, minPrice: 99, maxPrice: 199 },
      { name: "San Joaquín", propertyCount: 6, averageYield: 8.1, minPrice: 91, maxPrice: 169 },
      { name: "La Florida", propertyCount: 4, averageYield: 11.1, minPrice: 249, maxPrice: 313 },
      { name: "La Cisterna", propertyCount: 3, averageYield: 10.5, minPrice: 115, maxPrice: 162 },
      { name: "Ñuñoa", propertyCount: 4, averageYield: 6.0, minPrice: 112, maxPrice: 159 },
      { name: "Renca", propertyCount: 2, averageYield: 8.5, minPrice: 102, maxPrice: 114 },
      { name: "Estación Central", propertyCount: 2, averageYield: 6.9, minPrice: 99, maxPrice: 109 },
      { name: "Independencia", propertyCount: 5, averageYield: 9.2, minPrice: 299, maxPrice: 375 },
      { name: "Quilicura", propertyCount: 2, averageYield: 12.8, minPrice: 159, maxPrice: 199 },
      { name: "La Serena", propertyCount: 6, averageYield: 7.2, minPrice: 299, maxPrice: 413 },
    ];

    communesData.forEach(commune => {
      const id = randomUUID();
      this.communes.set(id, {
        id,
        name: commune.name,
        propertyCount: commune.propertyCount,
        averageYield: commune.averageYield.toString(),
        minPrice: commune.minPrice,
        maxPrice: commune.maxPrice,
      });
    });

    // Initialize properties with real data using fixed IDs
    const propertiesData = [
      {
        id: "prop-portal-vina-1",
        name: "Edificio Portal la Viña 2.0",
        address: "Vicuña Mackenna 2289, San Joaquín",
        commune: "San Joaquín",
        propertyType: "Bodega",
        unitNumber: "Bodega 68",
        size: "2.40",
        floor: "-1",
        status: "Entrega inmediata",
        price: 91,
        originalPrice: 96,
        discount: 5,
        annualYield: "8.1",
        viewCount: 9,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
      },
      {
        id: "prop-neo-florida-1",
        name: "Neo Florida 3",
        address: "Alonso de Ercilla 7698, La Florida",
        commune: "La Florida",
        propertyType: "Estacionamiento",
        unitNumber: "Estacionamiento 67",
        size: "12.50",
        floor: "-1",
        status: "Entrega inmediata",
        price: 249,
        originalPrice: 313,
        discount: 20,
        annualYield: "11.1",
        viewCount: 7,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
      },
      {
        id: "prop-trinitarias-1",
        name: "Las Trinitarias",
        address: "Las Trinitarias 7047, Las Condes",
        commune: "Las Condes",
        propertyType: "Pack",
        unitNumber: "Pack Bodega 30 Bodega BA901",
        size: "3.51",
        floor: "-1",
        status: "Entrega inmediata",
        price: 193,
        originalPrice: 228,
        discount: 15,
        annualYield: "15.9",
        viewCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
      },
      {
        id: "prop-mirador-san-pablo-1",
        name: "Mirador San Pablo",
        address: "San Pablo 2937, Santiago Centro",
        commune: "Santiago",
        propertyType: "Bodega",
        unitNumber: "Bodega 80",
        size: "1.77",
        floor: "5",
        status: "En verde",
        price: 99,
        originalPrice: 133,
        discount: 26,
        annualYield: "5.5",
        viewCount: 6,
        imageUrl: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
      },
      {
        id: "prop-santa-maria-1",
        name: "Santa Maria",
        address: "Av. Domingo Santa María N°1846, Independencia",
        commune: "Independencia",
        propertyType: "Estacionamiento",
        unitNumber: "Estacionamiento 069",
        size: "12.50",
        floor: "-3",
        status: "Entrega inmediata",
        price: 299,
        originalPrice: 375,
        discount: 20,
        annualYield: "9.2",
        viewCount: 4,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
      },
      {
        id: "prop-ceppi-1",
        name: "Edificio Ceppi",
        address: "Calle Uno 6590, La Cisterna",
        commune: "La Cisterna",
        propertyType: "Bodega",
        unitNumber: "Bodega 39",
        size: "3.93",
        floor: "-2",
        status: "Entrega inmediata",
        price: 115,
        originalPrice: 138,
        discount: 17,
        annualYield: "10.5",
        viewCount: 9,
        imageUrl: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
      }
    ];

    propertiesData.forEach(property => {
      this.properties.set(property.id, {
        ...property,
        isAvailable: true,
        createdAt: new Date(),
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getProperties(filters?: PropertyFilters): Promise<Property[]> {
    let properties = Array.from(this.properties.values());

    if (filters) {
      if (filters.commune) {
        properties = properties.filter(p => p.commune === filters.commune);
      }
      if (filters.propertyType) {
        properties = properties.filter(p => p.propertyType === filters.propertyType);
      }
      if (filters.minPrice !== undefined) {
        properties = properties.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        properties = properties.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.minYield !== undefined) {
        properties = properties.filter(p => parseFloat(p.annualYield) >= filters.minYield!);
      }
      if (filters.maxYield !== undefined) {
        properties = properties.filter(p => parseFloat(p.annualYield) <= filters.maxYield!);
      }
      if (filters.status) {
        properties = properties.filter(p => p.status === filters.status);
      }
    }

    // Sort by price by default
    return properties.sort((a, b) => a.price - b.price);
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const newProperty: Property = {
      ...property,
      id,
      createdAt: new Date(),
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;

    const updatedProperty = { ...property, ...updates };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async incrementViewCount(id: string): Promise<void> {
    const property = this.properties.get(id);
    if (property) {
      property.viewCount = (property.viewCount || 0) + 1;
      this.properties.set(id, property);
    }
  }

  async getUserInvestments(userId: string): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(inv => inv.userId === userId);
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const id = randomUUID();
    const newInvestment: Investment = {
      ...investment,
      id,
      purchaseDate: new Date(),
    };
    this.investments.set(id, newInvestment);
    return newInvestment;
  }

  async getCommunes(): Promise<Commune[]> {
    return Array.from(this.communes.values());
  }

  async createCommune(commune: InsertCommune): Promise<Commune> {
    const id = randomUUID();
    const newCommune: Commune = { ...commune, id };
    this.communes.set(id, newCommune);
    return newCommune;
  }

  async getPortfolioStats(userId: string): Promise<{
    totalValue: number;
    propertiesCount: number;
    monthlyIncome: number;
    averageYield: number;
  }> {
    const investments = await this.getUserInvestments(userId);
    const totalValue = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
    const propertiesCount = investments.length;
    
    // Calculate monthly income based on average yield
    const averageYield = propertiesCount > 0 ? 11.2 : 0; // Mock average
    const monthlyIncome = (totalValue * averageYield / 100) / 12;

    return {
      totalValue,
      propertiesCount,
      monthlyIncome: Math.round(monthlyIncome * 100) / 100,
      averageYield,
    };
  }
}

export const storage = new MemStorage();
