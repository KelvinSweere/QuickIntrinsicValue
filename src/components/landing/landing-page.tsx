import IntrinsicValueCalculator from '../calculator/intrinsic-value-calculator';
import BuyCoffee from '../promotion/buy-coffee';
import GithubCorner from '../promotion/github-corner';

const LandingPage = () => {
  return (
    <>
      <GithubCorner />
      <BuyCoffee />
      <IntrinsicValueCalculator />
    </>
  );
};

export default LandingPage;
