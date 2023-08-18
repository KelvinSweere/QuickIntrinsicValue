import { Input, Text } from '@chakra-ui/react';

interface IReadonlyInputProps {
  heading: string;
  symbol?: string;
  value: string | number;
}

const ReadonlyInput = ({ heading, symbol, value }: IReadonlyInputProps) => {
  return (
    <label>
      <Text fontWeight="bold">{heading}</Text>
      <div style={{ display: 'flex', fontWeight: 'normal' }}>
        {symbol && (
          <span style={{ alignSelf: 'center', marginRight: '0.5rem' }}>
            {symbol}
          </span>
        )}
        <Input readOnly type="text" value={value} />
      </div>
    </label>
  );
};

export default ReadonlyInput;
