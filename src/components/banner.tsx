import { Box, Flex, IconButton, Link } from '@chakra-ui/react';
import { FaCoffee, FaGithub } from 'react-icons/fa';

const Banner = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      right="0"
      p="16px"
      bg="red.300"
      color="white"
    >
      <Flex flexDir="column">
        <Box textAlign="center">
          Open-source on GitHub
          <IconButton
            as={Link}
            href="https://github.com/KelvinSweere/Quick_Intrinsic_Value"
            target="_blank"
            aria-label="GitHub"
            icon={<FaGithub />}
            colorScheme="red.200"
          />
        </Box>
        <Box ml="auto" textAlign="center">
          Buy Me a Coffee
          <Link
            href="https://www.buymeacoffee.com/KelvinSweere"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy Me a Coffee"
          >
            <IconButton
              aria-label="Buy Me a Coffee"
              icon={<FaCoffee />}
              colorScheme="red.200"
            />
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Banner;
