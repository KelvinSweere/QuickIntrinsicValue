import { IModelParameters } from '@/types/model-parameters';
import { Box, Input, Spinner } from '@chakra-ui/react';

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
              <label>
                Price per share (PPS)
                <div style={{ display: 'flex', fontWeight: 'normal' }}>
                  <span style={{ alignSelf: 'center', marginRight: '0.5rem' }}>
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
                  <span style={{ alignSelf: 'center', marginRight: '0.5rem' }}>
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
                  <span style={{ alignSelf: 'center', marginRight: '0.5rem' }}>
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
  );
};

export default CalculatorParameters;
