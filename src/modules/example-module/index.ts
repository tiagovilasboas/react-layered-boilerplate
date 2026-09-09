// Example Module - Entry point
// This module demonstrates the layered architecture pattern

export { ExampleComponent } from './components/ExampleComponent';
export { useExampleHook } from './hooks/useExampleHook';
export {
  createExampleRepository,
  exampleRepository,
  type CreateExampleRepositoryOptions,
  type ExampleData,
  type ExampleRepository,
  type ExampleRepositoryKind,
} from './service/exampleService';
export * as exampleUtils from './utils/exampleUtils';
