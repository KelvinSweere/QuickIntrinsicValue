import { Box, Container, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SideAdsProps {
  children: ReactNode;
}

const SideAds = ({ children }: SideAdsProps) => {
  return (
    <VStack alignItems="center" position="relative" spacing={0}>
      <Box position="fixed" left={0} top="50vh" transform="translateY(-50%)">
        <Container background="red" height="10rem" width="10rem" />
      </Box>
      <Box flex="1">{children}</Box>
      <Box position="fixed" right={0} top="50vh" transform="translateY(-50%)">
        <Container background="red" height="10rem" width="10rem" />
      </Box>
    </VStack>
  );
};

export default SideAds;
