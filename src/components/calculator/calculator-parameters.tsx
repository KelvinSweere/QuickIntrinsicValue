import { IModelParameters } from '@/types/model-parameters';
import { Box, Spinner } from '@chakra-ui/react';
import ReadonlyInput from './readonly-input';

interface ICalculatorParametersProps {
  isLoading: boolean;
  modelParameters: IModelParameters;
}

const CalculatorParameters = ({
  isLoading,
  modelParameters,
}: ICalculatorParametersProps) => {
  return (
    <Box bg="white" p={4} rounded="md" fontWeight="bold">
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      ) : (
        <>
          <form>
            <Box display="grid" gridGap={3}>
              <ReadonlyInput
                heading="Price per share (PPS)"
                symbol={modelParameters.currencySymbol}
                value={modelParameters.pricePerShare}
              />
              <ReadonlyInput
                heading="Earnings per share (EPS)"
                value={modelParameters.earningsPerShare}
              />
              <ReadonlyInput
                heading="Growth rate avg. 5 years (GR)"
                symbol="%"
                value={modelParameters.growthRate}
              />
              <ReadonlyInput
                heading="Yield of AAA bond (YB)"
                symbol="%"
                value={modelParameters.currentYieldOfBond}
              />
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default CalculatorParameters;
