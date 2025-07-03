// Example service for the example-module
// This demonstrates how to organize API calls and business logic

export interface ExampleData {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export class ExampleService {
  private static instance: ExampleService;
  private baseUrl = 'https://api.example.com';

  private constructor() {}

  public static getInstance(): ExampleService {
    if (!ExampleService.instance) {
      ExampleService.instance = new ExampleService();
    }
    return ExampleService.instance;
  }

  async fetchData(): Promise<ExampleData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/data`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async createData(data: Omit<ExampleData, 'id' | 'createdAt'>): Promise<ExampleData> {
    try {
      const response = await fetch(`${this.baseUrl}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  }
}

export const exampleService = ExampleService.getInstance(); 