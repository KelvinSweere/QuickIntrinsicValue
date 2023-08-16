import { Flex } from '@chakra-ui/react';
import ContactFooter from './contact-footer';
import EndFooter from './end-footer';

const Footer = () => {
  return (
    <Flex height="20rem" flexDir="column">
      <ContactFooter />
      <EndFooter />
    </Flex>
  );
};

export default Footer;
