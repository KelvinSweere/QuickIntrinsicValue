import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  ICalculatedModel,
  calculateIntrinsicValue,
} from '../utils/calculator-service';

const defaultIntrinsicValue: ICalculatedModel = {
  intristicValue: 0,
  differencePercentage: 0,
  acceptableBuyPrice: 0,
  canBuy: false,
};

export interface IModelParameters {
  pricePerShare: number;
  earningsPerShare: number;
  growthRate: number;
  currentYieldOfBond: number;
  currencySymbol: string;
}

const defaultModelParameters: IModelParameters = {
  pricePerShare: 0,
  earningsPerShare: 0,
  growthRate: 0,
  currentYieldOfBond: 0,
  currencySymbol: '$',
};

const IntrinsicValueCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [marginOfSafety, setMarginOfSafety] = useState<string>('65');
  const toast = useToast();

  const [modelParameters, setModelParameters] = useState<IModelParameters>(
    defaultModelParameters
  );

  const [intrinsicValue, setIntrinsicValue] = useState<ICalculatedModel>(
    defaultIntrinsicValue
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('modelParameters', modelParameters);
  }, [modelParameters]);

  useEffect(() => {
    console.log('intrinsicValue', intrinsicValue);
  }, [intrinsicValue]);

  const calculateValues = async () => {
    await getYahooFinanceData();
  };

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

  const tryToSetMarginOfSafety = (value: string) => {
    const numericMarginValue = Number(value);
    if (numericMarginValue > 0 && numericMarginValue <= 70) {
      setMarginOfSafety(value);
    } else if (numericMarginValue > 70) {
      toast({
        title: 'Margin of safety too high',
        description: 'Margin of safety must be lower than 70%',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (numericMarginValue <= 0) {
      toast({
        title: 'Margin of safety too low',
        description: 'Margin of safety must be higher than 0%',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  async function getYahooFinanceData() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/get-data?stockSymbol=${stockSymbol}`
      );
      setModelParameters(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
    setIsLoading(false);
  }

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
      <Box bg="white" p={4} rounded="md" fontWeight="bold">
        <label>
          Stock Symbol
          <div style={{ display: 'flex' }}>
            <Input
              type="text"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
            />
            <Button ml={4} onClick={calculateValues}>
              Calculate
            </Button>
          </div>
        </label>
        <label>
          Margin of safety (%)
          <div style={{ display: 'flex' }}>
            <Input
              type="number"
              pattern="^\d*(\.\d{0,2})?$"
              value={marginOfSafety}
              onChange={(e) => tryToSetMarginOfSafety(e.target.value)}
            />
          </div>
        </label>
      </Box>

      <Box bg="white" p={4} rounded="md" fontWeight="bold">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Spinner />
          </Box>
        ) : (
          <>
            <form>
              <Box display="grid" gridGap={3}>
                <label>
                  Price per share (PPS)
                  <div style={{ display: 'flex', fontWeight: 'normal' }}>
                    <span
                      style={{ alignSelf: 'center', marginRight: '0.5rem' }}
                    >
                      {modelParameters.currencySymbol}
                    </span>
                    <Input
                      readOnly
                      type="text"
                      pattern="^\d*(\.\d{0,2})?$"
                      value={modelParameters.pricePerShare}
                    />
                  </div>
                </label>
                <label>
                  Earnings per share (EPS)
                  <Input
                    readOnly
                    type="text"
                    pattern="^\d*(\.\d{0,2})?$"
                    value={modelParameters.earningsPerShare}
                  />
                </label>
                <label>
                  Growth rate avg. 5 years (GR)
                  <div style={{ display: 'flex', fontWeight: 'normal' }}>
                    <span
                      style={{ alignSelf: 'center', marginRight: '0.5rem' }}
                    >
                      %
                    </span>
                    <Input
                      readOnly
                      type="text"
                      pattern="^\d*(\.\d{0,2})?$"
                      value={modelParameters.growthRate}
                    />
                  </div>
                </label>
                <label>
                  Yield of AAA bond (YB)
                  <div style={{ display: 'flex', fontWeight: 'normal' }}>
                    <span
                      style={{ alignSelf: 'center', marginRight: '0.5rem' }}
                    >
                      %
                    </span>
                    <Input
                      readOnly
                      type="text"
                      pattern="^\d*(\.\d{0,2})?$"
                      value={modelParameters.currentYieldOfBond}
                    />
                  </div>
                </label>
              </Box>
            </form>
          </>
        )}
      </Box>

      <Box display="flex" flexDir="column" gap={4}>
        <Button type="button" colorScheme="blue" onClick={clearValues}>
          Clear
        </Button>
      </Box>

      <Box mt={4} bg="white">
        <Table variant="simple" colorScheme="blue">
          <Thead>
            <Tr>
              <Th textAlign="center">Stock price</Th>
              <Th textAlign="center">Intrinsic Value</Th>
              <Th textAlign="center">Acceptable Buy Price</Th>
              <Th textAlign="center">Should Buy</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center" bg="white">
                {modelParameters.pricePerShare}
              </Td>
              <Td textAlign="center" bg="white">
                {intrinsicValue.intristicValue}
              </Td>
              <Td textAlign="center" bg="white">
                {intrinsicValue.acceptableBuyPrice}
              </Td>
              <Td
                textAlign="center"
                bg="white"
                fontWeight="bold"
                color={intrinsicValue.canBuy ? 'green.500' : 'red.500'}
              >
                {intrinsicValue.canBuy ? 'Yes' : 'No'}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default IntrinsicValueCalculator;
