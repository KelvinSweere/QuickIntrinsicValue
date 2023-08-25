import { Box } from '@chakra-ui/react';
import SideAds from '../ads/side-ads';
import IntrinsicValueCalculator from '../calculator/intrinsic-value-calculator';
import BuyCoffee from '../promotion/buy-coffee';
import GithubCorner from '../promotion/github-corner';

const LandingPage = () => {
  return (
    <>
      <SideAds>
        <GithubCorner />
        <BuyCoffee />
        <IntrinsicValueCalculator />
      </SideAds>
    </>
  );
};

export default LandingPage;
