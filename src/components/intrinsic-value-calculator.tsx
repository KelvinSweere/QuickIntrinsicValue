import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

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
}

const defaultModelParameters: IModelParameters = {
  pricePerShare: 0,
  earningsPerShare: 0,
  growthRate: 0,
  currentYieldOfBond: 0,
};

const IntrinsicValueCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [marginOfSafety, setMarginOfSafety] = useState<string>('65');

  const [modelParameters, setModelParameters] = useState<IModelParameters>(
    defaultModelParameters
  );

  const [intrinsicValue, setIntrinsicValue] = useState<ICalculatedModel>(
    defaultIntrinsicValue
  );

  const calculateValues = () => {
    getYahooFinanceData();
    setIntrinsicValue(
      calculateIntrinsicValue(
        Number(modelParameters.pricePerShare),
        Number(modelParameters.earningsPerShare),
        Number(modelParameters.growthRate),
        Number(modelParameters.currentYieldOfBond),
        Number(marginOfSafety)
      )
    );
  };

  const clearValues = () => {
    setStockSymbol('');
    setModelParameters(defaultModelParameters);
    setIntrinsicValue(defaultIntrinsicValue);
  };

  async function getYahooFinanceData() {
    setModelParameters(defaultModelParameters);
    setIntrinsicValue(defaultIntrinsicValue);
    try {
      const response = await axios.get(
        `/api/get-data?stockSymbol=${stockSymbol}`
      );
      setModelParameters(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
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
      </Box>
      <Box bg="white" p={4} rounded="md" fontWeight="bold">
        <form>
          <Box display="grid" gridGap={3}>
            <label>
              Price per share (PPS)
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={modelParameters.pricePerShare}
                onChange={(e) =>
                  setModelParameters({
                    ...modelParameters,
                    pricePerShare: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Earnings per share (EPS)
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={modelParameters.earningsPerShare}
                onChange={(e) =>
                  setModelParameters({
                    ...modelParameters,
                    earningsPerShare: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Growth rate (GR)
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={modelParameters.growthRate}
                onChange={(e) =>
                  setModelParameters({
                    ...modelParameters,
                    growthRate: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Yield of bond (YB)
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={modelParameters.currentYieldOfBond}
                onChange={(e) =>
                  setModelParameters({
                    ...modelParameters,
                    currentYieldOfBond: parseFloat(e.target.value),
                  })
                }
              />
            </label>
          </Box>
        </form>
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
              {/* <Th textAlign="center">Difference</Th> */}
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
              {/* <Td textAlign="center" bg="white">
                {intrinsicValue.differencePercentage} %
              </Td> */}
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
