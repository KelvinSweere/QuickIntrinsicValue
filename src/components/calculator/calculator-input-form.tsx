import {
  IModelParameters,
  defaultModelParameters,
} from '@/types/model-parameters';
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

  const checkIfMarginOfSafetyIsValid = () => {
    const numericMarginValue = Number(marginOfSafety);
    if (numericMarginValue < 35) {
      toast({
        title: 'Margin of safety too high',
        description: 'Margin of safety must be higher than 35%',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setMarginOfSafety('35');
      return;
    } else if (numericMarginValue > 100) {
      toast({
        title: 'Margin of safety too high',
        description: "Margin of safety can't be higher than 100%",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setMarginOfSafety('100');
      return;
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
      const { data } = response;

      if (data.isInvalid) {
        handleInvalidData();
        setModelParameters(defaultModelParameters);
      } else {
        setModelParameters(data);
      }
    } catch (error) {
      handleNotFoundError();
    } finally {
      setIsLoading(false);
    }
  }

  function handleInvalidData() {
    toast({
      title: `Ticker '${stockSymbol}' data is invalid`,
      description: "Can't calculate the intrinsic value of this stock",
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }

  function handleNotFoundError() {
    toast({
      title: `Ticker '${stockSymbol}' not found`,
      description: 'Please enter a valid yahoo finance ticker',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Box bg="white" p={4} rounded="md" fontWeight="bold">
      <label>
        Stock ticker (from Yahoo Finance)
        <div style={{ display: 'flex' }}>
          <Input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === 'Enter') {
                calculateValues();
              }
            }}
          />
          <Button
            ml={4}
            onClick={calculateValues}
            _hover={{ bg: 'red.500', color: 'white' }}
            px="2rem"
          >
            Calculate
          </Button>
        </div>
      </label>
      <label>
        Margin of safety / discount (%)
        <div style={{ display: 'flex' }}>
          <Input
            type="number"
            pattern="^\d*(\.\d{0,2})?$"
            value={marginOfSafety}
            onChange={(e) => setMarginOfSafety(e.target.value)}
            onBlur={checkIfMarginOfSafetyIsValid}
          />
        </div>
      </label>
    </Box>
  );
};

export default CalculatorInputForm;
