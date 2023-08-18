import {
  ICalculatedModel,
  defaultIntrinsicValue,
} from '@/types/calculated-model';
import {
  IModelParameters,
  defaultModelParameters,
} from '@/types/model-parameters';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { calculateIntrinsicValue } from '../../utils/calculator-service';
import CalculatorInputForm from './calculator-input-form';
import CalculatorOutputValues from './calculator-output-values';
import CalculatorParameters from './calculator-parameters';

const IntrinsicValueCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [marginOfSafety, setMarginOfSafety] = useState<string>('35');
  const [modelParameters, setModelParameters] = useState<IModelParameters>(
    defaultModelParameters
  );
  const [intrinsicValue, setIntrinsicValue] = useState<ICalculatedModel>(
    defaultIntrinsicValue
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const calculatorWidth = useBreakpointValue({
    base: '95vw',
    md: '75vw',
    lg: '65vw',
    xl: '40vw',
  });

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

  const GradientText: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <Box
      as="span"
      fontWeight="bold"
      bgGradient="linear(to-l, red.300, red.500)"
      bgClip="text"
      fontSize={{ base: '3xl', md: '4xl' }}
    >
      {children}
    </Box>
  );

  return (
    <Container
      display="flex"
      flexDir="column"
      w="100vw"
      p={4}
      gap="1rem"
      maxW={calculatorWidth}
    >
      <Box textAlign="center">
        <Heading fontSize="4xl" fontWeight="bold" mb={4}>
          <GradientText>Graham Formula Calculator</GradientText>
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Unlock the potential of stock valuation with our Graham Formula
          Calculator. Effortlessly compute the intrinsic value of stocks by
          simply entering the Yahoo Finance stock symbol.
        </Text>
      </Box>

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
        <Button type="button" colorScheme="red" onClick={clearValues}>
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
