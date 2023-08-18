import { Box, Circle, Image } from '@chakra-ui/react';

const BuyCoffee = () => {
  return (
    <Box
      as="a"
      href="https://github.com/KelvinSweere/Quick_Intrinsic_Value"
      target="_blank"
      className="github-corner"
      aria-label="Buy me a coffee"
      position="fixed"
      bottom="2rem"
      left="2rem"
      zIndex="9999"
      border="0"
    >
      <Circle
        bgColor="white"
        minW="5rem"
        minH="5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src="svg/buy-me-a-coffee.svg" alt="Buy Me a Coffee" />
      </Circle>
    </Box>
  );
};

export default BuyCoffee;
