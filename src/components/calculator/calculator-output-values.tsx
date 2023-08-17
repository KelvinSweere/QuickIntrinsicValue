import { ICalculatedModel } from '@/types/calculated-model';
import { IModelParameters } from '@/types/model-parameters';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface ICalculatorOutputValuesProps {
  modelParameters: IModelParameters;
  intrinsicValue: ICalculatedModel;
}

const CalculatorOutputValues = ({
  modelParameters,
  intrinsicValue,
}: ICalculatorOutputValuesProps) => {
  return (
    <Box mt={4} bg="white">
      <Table variant="simple" colorScheme="red">
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
              {intrinsicValue.intrinsicValue}
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
  );
};

export default CalculatorOutputValues;
