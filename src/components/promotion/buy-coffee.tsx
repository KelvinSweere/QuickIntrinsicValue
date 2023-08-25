import { Box, Circle, Image, keyframes, useMediaQuery } from '@chakra-ui/react';

const buzz = keyframes`
  0%, 100% {
    transform: rotate(0);
  }
  20%, 60% {
    transform: rotate(-10deg);
  }
  40%, 80% {
    transform: rotate(10deg);
  }
`;

const BuyCoffee = () => {
  const [isVisible] = useMediaQuery('(min-width: 55rem)');

  return (
    <>
      {isVisible && (
        <Box
          as="a"
          href="https://www.buymeacoffee.com/KelvinSweere"
          target="_blank"
          className="github-corner"
          aria-label="Buy me a coffee"
          position="fixed"
          bottom="2rem"
          left="2rem"
          zIndex="9999"
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            '.coffee-icon': {
              animation: `${buzz} 560ms ease-in-out`,
            },
          }}
        >
          <Circle bgColor="white" minW="5rem" minH="5rem">
            <Image
              className="coffee-icon"
              src="svg/buy-me-a-coffee.svg"
              alt="Buy Me a Coffee"
            />
          </Circle>
        </Box>
      )}
    </>
  );
};

export default BuyCoffee;
