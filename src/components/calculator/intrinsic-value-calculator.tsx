import {
  ICalculatedModel,
  defaultIntrinsicValue,
} from '@/types/calculated-model';
import {
  IModelParameters,
  defaultModelParameters,
} from '@/types/model-parameters';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { calculateIntrinsicValue } from '../../utils/calculator-service';
import CalculatorInputForm from './calculator-input-form';
import CalculatorOutputValues from './calculator-output-values';
import CalculatorParameters from './calculator-parameters';

const IntrinsicValueCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [marginOfSafety, setMarginOfSafety] = useState<string>('65');
  const [modelParameters, setModelParameters] = useState<IModelParameters>(
    defaultModelParameters
  );
  const [intrinsicValue, setIntrinsicValue] = useState<ICalculatedModel>(
    defaultIntrinsicValue
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIntrinsicValue(
      calculateIntrinsicValue(
        Number(modelParameters.pricePerShare),
        Number(modelParameters.earningsPerShare),
        Number(modelParameters.growthRate),
        Number(modelParameters.currentYieldOfBond),
        Number(marginOfSafety)
      )
    );
  }, [modelParameters]);

  const clearValues = () => {
    setStockSymbol('');
    setModelParameters(defaultModelParameters);
    setIntrinsicValue(defaultIntrinsicValue);
  };

  return (
    <Container
      display="flex"
      flexDir="column"
      mt={8}
      maxW="xl"
      bg="gray.200"
      p={4}
      gap="1rem"
    >
      <Heading textAlign="center">Calculator</Heading>

      <CalculatorInputForm
        stockSymbol={stockSymbol}
        marginOfSafety={marginOfSafety}
        setMarginOfSafety={setMarginOfSafety}
        setIsLoading={setIsLoading}
        setModelParameters={setModelParameters}
        setStockSymbol={setStockSymbol}
      />

      <CalculatorParameters
        isLoading={isLoading}
        modelParameters={modelParameters}
      />

      <Box display="flex" flexDir="column" gap={4}>
        <Button type="button" colorScheme="blue" onClick={clearValues}>
          Clear
        </Button>
      </Box>

      <CalculatorOutputValues
        intrinsicValue={intrinsicValue}
        modelParameters={modelParameters}
      />
    </Container>
  );
};

export default IntrinsicValueCalculator;
