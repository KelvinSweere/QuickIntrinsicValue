import { floatToString } from '@/utils/calculator-service';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, Text, Tooltip } from '@chakra-ui/react';

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
  return (
    <Box>
      <Text fontWeight="bold">
        {heading}
        {tooltipText && (
          <Tooltip label={tooltipText}>
            <InfoOutlineIcon ml="1" w={3} h={4} color="gray.500" />
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
            (value as number)
              ? floatToString(value as number)
              : value.toString()
          }
        />
      </Flex>
    </Box>
  );
};

export default ReadonlyInput;
