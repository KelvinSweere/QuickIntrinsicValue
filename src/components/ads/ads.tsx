import { Adsense } from '@ctrl/react-adsense';

const Ads = () => {
  return (
    <div className="text-center adsbygoogle my-3">
      <Adsense
        client="ca-pub-2806858064287732"
        slot="use-your-slot-id-here"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
};

export default Ads;
