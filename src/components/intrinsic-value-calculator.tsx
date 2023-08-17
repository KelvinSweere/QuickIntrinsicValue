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

const IntrinsicValueCalculator = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [pricePerShare, setPricePerShare] = useState<string>('');
  const [earningsPerShare, setEarningsPerShare] = useState<string>('');
  const [growthRate, setGrowthRate] = useState<string>('');
  const [currentYieldOfBond, setCurrentYieldOfBond] = useState<string>('2.57');
  const [marginOfSafety, setMarginOfSafety] = useState<string>('65');

  const [intrinsicValue, setIntrinsicValue] = useState<ICalculatedModel>(
    defaultIntrinsicValue
  );

  const calculateValues = () => {
    setIntrinsicValue(
      calculateIntrinsicValue(
        Number(pricePerShare),
        Number(earningsPerShare),
        Number(growthRate),
        Number(currentYieldOfBond),
        Number(marginOfSafety)
      )
    );
  };

  return (
    <Container mt={8} maxW="xl" bg="gray.200" p={4}>
      <Heading textAlign="center">Calculator</Heading>
      <Box bg="white" p={4} rounded="md">
        <form>
          <Box display="grid" gridGap={3}>
            <label>
              Stock Symbol
              <Input
                type="text"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
              />
            </label>
            <label>
              Price per Share
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={pricePerShare}
                onChange={(e) => setPricePerShare(e.target.value)}
              />
            </label>
            <label>
              Earnings per Share
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={earningsPerShare}
                onChange={(e) => setEarningsPerShare(e.target.value)}
              />
            </label>
            <label>
              Growth Rate
              <Input
                type="text"
                pattern="^\d*(\.\d{0,2})?$"
                value={growthRate}
                onChange={(e) => setGrowthRate(e.target.value)}
              />
            </label>
            <Button type="button" colorScheme="blue" onClick={calculateValues}>
              Calculate
            </Button>
          </Box>
        </form>
      </Box>
      <Box mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">Stock price</Th>
              <Th textAlign="center">Intrinsic Value</Th>
              {/* <Th textAlign="center">Difference</Th> */}
              <Th textAlign="center">Acceptable Buy Price</Th>
              <Th textAlign="center">Can Buy</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center" bg="white">
                {pricePerShare}
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
