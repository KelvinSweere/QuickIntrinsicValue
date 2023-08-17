import { IModelParameters } from '@/types/model-parameters';
import { Box, Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface ICalculatorInputFormProps {
  stockSymbol: string;
  setStockSymbol: (stockSymbol: string) => void;
  marginOfSafety: string;
  setMarginOfSafety: (marginOfSafety: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setModelParameters: (modelParameters: IModelParameters) => void;
}

const CalculatorInputForm = ({
  stockSymbol,
  marginOfSafety,
  setMarginOfSafety,
  setIsLoading,
  setModelParameters,
  setStockSymbol,
}: ICalculatorInputFormProps) => {
  const toast = useToast();

  const calculateValues = async () => {
    await getYahooFinanceData();
  };

  const tryToSetMarginOfSafety = (value: string) => {
    const toast = useToast();

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
      setMarginOfSafety('70');
    } else if (numericMarginValue < 0) {
      toast({
        title: 'Margin of safety too low',
        description: 'Margin of safety must be higher than 0%',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setMarginOfSafety('0');
    }
  };

  async function getYahooFinanceData() {
    if (stockSymbol === '') {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/get-data?stockSymbol=${stockSymbol}`
      );
      setModelParameters(response.data);
    } catch (error) {
      toast({
        title: `Ticker '${stockSymbol}' not found`,
        description: 'Please enter a valid yahoo finance ticker',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  }

  return (
    <Box bg="white" p={4} rounded="md" fontWeight="bold">
      <label>
        Stock ticker
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
  );
};

export default CalculatorInputForm;
