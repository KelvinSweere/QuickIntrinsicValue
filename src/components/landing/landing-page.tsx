import IntrinsicValueCalculator from '../calculator/intrinsic-value-calculator';
import Banner from '../promotion/banner';
import GithubCorner from '../promotion/github-corner';

const LandingPage = () => {
  return (
    <>
      <GithubCorner />
      <IntrinsicValueCalculator />
      <Banner />
    </>
  );
};

export default LandingPage;
