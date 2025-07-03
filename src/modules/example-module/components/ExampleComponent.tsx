import React from 'react';
import styled from 'styled-components';

import { Button } from '@/components/Button';

interface ExampleComponentProps {
  title: string;
  onAction?: () => void;
}

const Container = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  margin: 10px 0;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 10px;
`;

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  onAction,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <p>This is an example component from the example-module.</p>
      {onAction && (
        <Button onClick={onAction} variant="outline" size="small">
          Take Action
        </Button>
      )}
    </Container>
  );
};
