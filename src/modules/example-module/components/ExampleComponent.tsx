import React from 'react';
import styled from 'styled-components';

import { Button } from '@/components/Button';

import { useExampleHook } from '../hooks/useExampleHook';

interface ExampleComponentProps {
  title: string;
  onAction?: () => void;
}

const Container = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  margin: 10px 0;
  text-align: left;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 10px;
`;

const DataList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const DataItem = styled.li`
  padding: 8px;
  margin: 4px 0;
  background: ${({ theme }) => theme.colors.grey}20;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
  padding: 8px;
  background: #ffebee;
  border-radius: 4px;
`;

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  onAction,
}) => {
  const { data, loading, error, createData } = useExampleHook();

  const handleCreateData = async () => {
    try {
      await createData({
        name: 'New Item',
        description: 'Created via component action',
      });
      onAction?.();
    } catch (err) {
      console.error('Failed to create data:', err);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <p>This is an example component from the example-module.</p>

      {loading && <p>Loading data...</p>}

      {error && <ErrorMessage>Error: {error}</ErrorMessage>}

      {data.length > 0 && (
        <DataList>
          {data.map((item) => (
            <DataItem key={item.id}>
              <strong>{item.name}</strong> - {item.description}
            </DataItem>
          ))}
        </DataList>
      )}

      {onAction && (
        <Button onClick={handleCreateData} variant="outline" size="small">
          Create New Item
        </Button>
      )}
    </Container>
  );
};
