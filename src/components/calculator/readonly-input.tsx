import { Box, Flex, Input, Text } from '@chakra-ui/react';

interface IReadonlyInputProps {
  heading: string;
  symbol?: string;
  value: string | number;
}

const ReadonlyInput = ({ heading, symbol, value }: IReadonlyInputProps) => {
  return (
    <Box>
      <Text fontWeight="bold">{heading}</Text>
      <Flex alignItems="center">
        {symbol && (
          <Text alignSelf="center" marginRight="0.5rem">
            {symbol}
          </Text>
        )}
        <Input isReadOnly value={value.toString()} />
      </Flex>
    </Box>
  );
};

export default ReadonlyInput;
