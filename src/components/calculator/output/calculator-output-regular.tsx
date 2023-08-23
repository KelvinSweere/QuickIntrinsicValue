import { ICalculatedModel } from '@/types/calculated-model';
import { IModelParameters } from '@/types/model-parameters';
import { floatToString, shouldBuy } from '@/utils/calculator-service';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';

interface ICalculatorOutputRegularProps {
  modelParameters: IModelParameters;
  intrinsicValue: ICalculatedModel;
}

const CalculatorOutputRegular = ({
  modelParameters,
  intrinsicValue,
}: ICalculatorOutputRegularProps) => {
  const getPlValutationColor = (): string => {
    const plValutation: number = intrinsicValue.plValutation;
    if (plValutation < 1) {
      return 'red.500';
    } else if (plValutation < 1.5) {
      return 'yellow.500';
    } else if (plValutation < 2) {
      return 'green.300';
    } else {
      return 'green.500';
    }
  };

  return (
    <Box mt={4} bg="white">
      <Table variant="simple" colorScheme="red">
        <Thead>
          <Tr>
            <Th textAlign="center">Stock price</Th>
            <Th textAlign="center">Intrinsic Value</Th>
            <Th textAlign="center">Acceptable Buy Price</Th>
            <Th textAlign="center">
              Peter Lynch Valuation{' '}
              <Tooltip label="&lt;1 overvalued, &lt;1.5 fairly valued, &gt;2 undervalued">
                <InfoOutlineIcon ml="1" w={3} h={4} color="gray.500" />
              </Tooltip>
            </Th>
            <Th textAlign="center">Should Buy</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign="center" bg="white">
              {floatToString(modelParameters.pricePerShare)}
            </Td>
            <Td textAlign="center" bg="white">
              {floatToString(intrinsicValue.intrinsicValue)}
            </Td>
            <Td
              textAlign="center"
              bg="white"
              textColor={
                intrinsicValue.belowIntrinsicValue ? 'green.500' : 'red.500'
              }
            >
              {floatToString(intrinsicValue.acceptableBuyPrice)}
            </Td>
            <Td
              textAlign="center"
              bg="white"
              textColor={getPlValutationColor()}
            >
              {floatToString(intrinsicValue.plValutation)}
            </Td>
            <Td
              textAlign="center"
              bg="white"
              fontWeight="bold"
              color={
                shouldBuy(
                  intrinsicValue.belowIntrinsicValue,
                  intrinsicValue.plValutation
                )
                  ? 'green.500'
                  : 'red.500'
              }
            >
              {shouldBuy(
                intrinsicValue.belowIntrinsicValue,
                intrinsicValue.plValutation
              )
                ? 'Yes'
                : 'No'}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default CalculatorOutputRegular;
