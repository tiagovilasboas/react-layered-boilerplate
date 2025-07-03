// Example Module - Entry point
// This module demonstrates the layered architecture pattern

export { ExampleComponent } from './components/ExampleComponent';
export { useExampleHook } from './hooks/useExampleHook';
export {
  createExampleRepository,
  exampleRepository,
  type ExampleData,
  type ExampleRepository,
} from './service/exampleService';
export * as exampleUtils from './utils/exampleUtils';
