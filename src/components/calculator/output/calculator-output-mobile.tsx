import { ICalculatedModel } from '@/types/calculated-model';
import { IModelParameters } from '@/types/model-parameters';
import { Box, Text } from '@chakra-ui/react';

interface ICalculatorOutputMobileProps {
  modelParameters: IModelParameters;
  intrinsicValue: ICalculatedModel;
}

const CalculatorOutputMobile = ({
  modelParameters,
  intrinsicValue,
}: ICalculatorOutputMobileProps) => {
  return (
    <Box
      mt={4}
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        Stock price: {modelParameters.pricePerShare}
      </Text>
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        Intrinsic Value: {intrinsicValue.intrinsicValue}
      </Text>
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        Acceptable Buy Price: {intrinsicValue.acceptableBuyPrice}
      </Text>
      <Text
        fontWeight="bold"
        fontSize="xl"
        color={intrinsicValue.canBuy ? 'green.500' : 'red.500'}
      >
        Should Buy: {intrinsicValue.canBuy ? 'Yes' : 'No'}
      </Text>
    </Box>
  );
};

export default CalculatorOutputMobile;
