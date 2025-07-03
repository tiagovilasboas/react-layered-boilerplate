// Example repository for the example-module
// This demonstrates the Repository pattern for data access

export interface ExampleData {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface ExampleRepository {
  fetchData(): Promise<ExampleData[]>;
  createData(data: Omit<ExampleData, 'id' | 'createdAt'>): Promise<ExampleData>;
}

export class ExampleRepositoryImpl implements ExampleRepository {
  private baseUrl = 'https://api.example.com';

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

  async createData(
    data: Omit<ExampleData, 'id' | 'createdAt'>,
  ): Promise<ExampleData> {
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

// Factory function to create repository instance
export const createExampleRepository = (): ExampleRepository => {
  return new ExampleRepositoryImpl();
};

// Default export for convenience
export const exampleRepository = createExampleRepository();
