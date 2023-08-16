import { useAppSelector } from '@/redux/hooks';
import {
  Flex,
  Image,
  Link,
  Text,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import CallDirect from '../company/header/call-company';

const EndFooter = () => {
  const theme = useTheme();
  const metaSlice = useAppSelector((state) => state.metaData);
  const [largeEnoughForExtraInfoInFooter] = useMediaQuery(
    '(min-width: 30.5em)'
  );

  const year = new Date().getFullYear();

  return (
    <Flex
      height="50%"
      flexDir="row"
      background="blackAlpha.700"
      alignItems="center"
      textColor="white"
      as="b"
      flexDirection="row"
      width="100%"
    >
      <Text
        ml="10%"
        w="50%"
        _hover={{
          textColor: `${theme.colors.secondary}`,
        }}
      >
        {year} - {metaSlice.companyName} (via VacatureCloud)
      </Text>
      <Flex alignItems="center" justifyContent="space-evenly" width="100%">
        <CallDirect phoneNumber={metaSlice.whatsappNumber} color="white" />
        {largeEnoughForExtraInfoInFooter && (
          <Flex>
            <Link
              href={metaSlice.linkedinUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                src="/svg/linkedin.svg"
                alt="LinkedIn"
                maxHeight="4.5rem"
                _hover={{
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default EndFooter;
