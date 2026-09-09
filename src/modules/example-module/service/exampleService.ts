// Example repository for the example-module.
// Swap implementations at the factory — hooks and UI stay unchanged.

export interface ExampleData {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface ExampleDataDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface ExampleRepository {
  fetchData(): Promise<ExampleData[]>;
  createData(data: Omit<ExampleData, 'id' | 'createdAt'>): Promise<ExampleData>;
}

export type ExampleRepositoryKind = 'memory' | 'http';

export interface CreateExampleRepositoryOptions {
  kind?: ExampleRepositoryKind;
  baseUrl?: string;
  initialData?: ExampleData[];
}

const toExampleData = (dto: ExampleDataDto): ExampleData => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  createdAt: new Date(dto.createdAt),
});

class ExampleHttpRepository implements ExampleRepository {
  constructor(private readonly baseUrl: string) {}

  async fetchData(): Promise<ExampleData[]> {
    const response = await fetch(`${this.baseUrl}/data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payload = (await response.json()) as ExampleDataDto[];
    return payload.map(toExampleData);
  }

  async createData(
    data: Omit<ExampleData, 'id' | 'createdAt'>,
  ): Promise<ExampleData> {
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
    const payload = (await response.json()) as ExampleDataDto;
    return toExampleData(payload);
  }
}

class ExampleInMemoryRepository implements ExampleRepository {
  private items: ExampleData[];

  constructor(initialData: ExampleData[] = []) {
    this.items = [...initialData];
  }

  async fetchData(): Promise<ExampleData[]> {
    return [...this.items];
  }

  async createData(
    data: Omit<ExampleData, 'id' | 'createdAt'>,
  ): Promise<ExampleData> {
    const created: ExampleData = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      createdAt: new Date(),
    };
    this.items = [...this.items, created];
    return created;
  }
}

export const createExampleRepository = (
  options: CreateExampleRepositoryOptions = {},
): ExampleRepository => {
  const kind = options.kind ?? 'memory';

  if (kind === 'http') {
    return new ExampleHttpRepository(options.baseUrl ?? 'https://api.example.com');
  }

  return new ExampleInMemoryRepository(options.initialData);
};

// Demo default: in-memory so `npm start` works without a backend.
export const exampleRepository: ExampleRepository = createExampleRepository();
