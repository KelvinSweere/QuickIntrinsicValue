import { useAppSelector } from '@/redux/hooks';
import { EmailIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Link,
  Text,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import router from 'next/router';
import ApplyDirect from '../company/header/apply-direct';

const ContactFooter = () => {
  const theme = useTheme();
  const metaSlice = useAppSelector((state) => state.metaData);
  const [largeEnoughForExtraInfoInFooter] = useMediaQuery(
    '(min-width: 30.5em)'
  );

  return (
    <Flex height="100%" flexDir="row" alignItems="center">
      {largeEnoughForExtraInfoInFooter && (
        <Flex height="auto" ml="10%" mr="1rem" flexDir="column" gap="2rem">
          <Text as="b" fontSize="2xl">
            Staat je droom baan er niet tussen?
          </Text>
          <Link
            href={`${router.basePath}/${router.query.subdomain}/solliciteer`}
          >
            <ApplyDirect text="Open sollicitatie" />
          </Link>
        </Flex>
      )}

      <Flex
        flexDir="row"
        gap={{ base: '2rem', md: '4rem', lg: '6rem' }}
        justifyContent={
          largeEnoughForExtraInfoInFooter ? 'center' : 'space-evenly'
        }
        alignContent="center"
        textColor="blackAlpha.700"
        width="100%"
        mx="1rem"
      >
        <Flex flexDir="column">
          <Text as="b" color={theme.colors.primary}>
            Adres
          </Text>
          <Text>{metaSlice.address.street}</Text>
          <Text>
            {metaSlice.address.postalCode}, {metaSlice.address.city}
          </Text>
          <Text>{metaSlice.address.country}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text color={theme.colors.primary} as="b">
            Contact
          </Text>
          <Text>{metaSlice.contact.number}</Text>
          <Box display="flex" flexDir="row" alignItems="center" gap="4px">
            {largeEnoughForExtraInfoInFooter && <EmailIcon />}
            <Text>{metaSlice.contact.email}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContactFooter;
