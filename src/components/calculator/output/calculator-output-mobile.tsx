import { ICalculatedModel } from '@/types/calculated-model';
import { IModelParameters } from '@/types/model-parameters';
import { shouldBuy } from '@/utils/calculator-service';
import { Box, Flex, Text } from '@chakra-ui/react';
import ReadonlyInput from '../readonly-input';

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
      bg="white"
      p={4}
      rounded="md"
      fontWeight="bold"
      display="grid"
      gridGap={3}
    >
      <ReadonlyInput
        heading="Stock price: "
        symbol={modelParameters.currencySymbol}
        value={modelParameters.pricePerShare}
      />

      <ReadonlyInput
        heading="Intrinsic Value: "
        symbol={modelParameters.currencySymbol}
        value={intrinsicValue.intrinsicValue}
      />

      <ReadonlyInput
        heading="Acceptable Buy Price: "
        symbol={modelParameters.currencySymbol}
        value={intrinsicValue.acceptableBuyPrice}
      />

      <ReadonlyInput
        heading="Peter Lynch Valuation: "
        value={intrinsicValue.plValutation}
        tooltipText="<1 overvalued, <1.5 fairly valued, >2 undervalued"
      />

      <Flex flexDir="row">
        <Text fontWeight="bold" mb={2} display="flex" alignItems="center">
          Should Buy:{' '}
        </Text>
        <Text
          fontWeight="bold"
          color={
            shouldBuy(
              intrinsicValue.belowIntrinsicValue,
              intrinsicValue.plValutation
            )
              ? 'green.500'
              : 'red.500'
          }
          mx="auto"
        >
          {shouldBuy(
            intrinsicValue.belowIntrinsicValue,
            intrinsicValue.plValutation
          )
            ? 'Yes'
            : 'No'}
        </Text>
      </Flex>
    </Box>
  );
};

export default CalculatorOutputMobile;
