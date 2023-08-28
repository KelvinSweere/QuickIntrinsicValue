import { floatToString } from '@/utils/calculator-service';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

interface IReadonlyInputProps {
  heading: string;
  symbol?: string;
  value: string | number;
  tooltipText?: string;
}

const ReadonlyInput = ({
  heading,
  symbol,
  value,
  tooltipText,
}: IReadonlyInputProps) => {
  const [tooltipVisibe, setTooltipVisibe] = useState(false);

  const toggleTooltipVisible = () => {
    setTooltipVisibe(!tooltipVisibe);
  };

  return (
    <Box>
      <Text fontWeight="bold">
        {heading}
        {tooltipText && (
          <Tooltip label={tooltipText} isOpen={tooltipVisibe}>
            <InfoOutlineIcon
              ml="1"
              w={3}
              h={4}
              color="gray.500"
              onClick={toggleTooltipVisible}
            />
          </Tooltip>
        )}
      </Text>

      <Flex alignItems="center">
        {symbol && (
          <Text alignSelf="center" marginRight="0.5rem">
            {symbol}
          </Text>
        )}
        <Input
          isReadOnly
          value={
            typeof value === 'number' ? floatToString(value as number) : value
          }
        />
      </Flex>
    </Box>
  );
};

export default ReadonlyInput;
