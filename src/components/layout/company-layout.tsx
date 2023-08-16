import Footer from '@/components/layout/footer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { metaDataActions } from '@/redux/meta/slice';
import { ImagePositionEnum } from '@/types/imagePosition.type';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CompanyHeader from '../company/header/company-header';

const subdomainTheme = extendTheme({
  fonts: {
    text: 'Roboto, sans-serif',
  },
  colors: {
    primary: 'red.400',
    secondary: 'red.300',
    dark: '#2b303c',
  },
});

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const metaSlice = useAppSelector((state) => state.metaData);

  const [companyName, setCompanyName] = useState<string>('');

  useEffect(() => {
    dispatch(
      metaDataActions.setMetaData({
        subdomain: 'acme',
        companyName: 'Acme',
        companyLogo: '/svg/Acme-corp.svg',
        companyDescription: 'Explosive tennis balls and other products',
        homeImage:
          'https://www.vraagenaanbod.nl/wp-content/uploads/2022/06/port-g5d1e3d1e9_1920-1536x1024.jpg',
        linkedinUrl: 'https://www.linkedin.com/company/acme',
        whatsappNumber: '06-12345678',
        address: {
          street: 'Straatnaam 1',
          postalCode: '1234 AB',
          city: 'Plaatsnaam',
          country: 'Nederland',
        },
        contact: {
          number: '06 86697356',
          email: 'contact@amce.com',
        },
        vacatureData: [
          {
            functionPostFix: 'marketing-specialist',
            postFunctionTitle: 'Werken als',
            functionTitle: 'Marketing specialist',
            functionText: 'Sluit de business aan op de IT!',
            city: 'Harderwijk',
            education: 'HBO',
            hoursPerWeek: '36',
            image:
              'https://www.scienceguide.nl/wp-content/uploads/2022/06/wet-leeruitkomsten.png',
            imagePosition: ImagePositionEnum.TOP,
          },
          {
            functionPostFix: 'software-engineer',
            postFunctionTitle: 'Werken als',
            functionTitle: 'Software Engineer',
            functionText: 'Sluit de IT aan op de business!',
            city: 'Hengelo',
            education: 'HBO',
            hoursPerWeek: '40',
            image:
              'https://icthealth.nl/wp-content/uploads/2021/03/Computers-informatie-910x575.jpeg',
            imagePosition: ImagePositionEnum.TOP,
          },
          {
            functionPostFix: 'directeur',
            postFunctionTitle: 'Werken als',
            functionTitle: 'Directeur',
            functionText: 'Manage de business en IT op jouw manier!',
            city: 'Amsterdam',
            education: 'WO',
            hoursPerWeek: '40',
            image:
              'https://images.pexels.com/photos/3760089/pexels-photo-3760089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            imagePosition: ImagePositionEnum.CENTER,
          },
          {
            functionPostFix: 'technicus',
            postFunctionTitle: 'Werken als',
            functionTitle: 'Technicus',
            functionText: 'Jij fixt het (en niet alleen met ducttape)!',
            city: 'Utrecht',
            education: 'MBO',
            hoursPerWeek: '40',
            image:
              'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            imagePosition: ImagePositionEnum.CENTER,
          },
          {
            functionPostFix: 'schoonmaker',
            postFunctionTitle: 'Werken als',
            functionTitle: 'Schoonmaker',
            functionText: 'Werk jij graag in een schone omgeving? Wij wel!',
            city: 'Apeldoorn',
            education: 'MBO',
            hoursPerWeek: '16',
            image:
              'https://images.pexels.com/photos/713297/pexels-photo-713297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            imagePosition: ImagePositionEnum.CENTER,
          },
        ],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (metaSlice.companyName) {
      setCompanyName(metaSlice.companyName);
    }
  }, [metaSlice]);

  return (
    <ChakraProvider theme={subdomainTheme}>
      <Box>
        <title>{companyName}</title>
        <CompanyHeader />
        <Box className="page">{children}</Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default CompanyLayout;
