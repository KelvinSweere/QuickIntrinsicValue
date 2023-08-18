import { ICalculatedModel } from '@/types/calculated-model';
import { IModelParameters } from '@/types/model-parameters';
import { useBreakpointValue } from '@chakra-ui/react';
import CalculatorOutputMobile from './output/calculator-output-mobile';
import CalculatorOutputRegular from './output/calculator-output-regular';

interface ICalculatorOutputValuesProps {
  modelParameters: IModelParameters;
  intrinsicValue: ICalculatedModel;
}

const CalculatorOutputValues = ({
  modelParameters,
  intrinsicValue,
}: ICalculatorOutputValuesProps) => {
  const mobileView = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      {mobileView ? (
        <CalculatorOutputMobile
          modelParameters={modelParameters}
          intrinsicValue={intrinsicValue}
        />
      ) : (
        <CalculatorOutputRegular
          modelParameters={modelParameters}
          intrinsicValue={intrinsicValue}
        />
      )}
    </>
  );
};

export default CalculatorOutputValues;
