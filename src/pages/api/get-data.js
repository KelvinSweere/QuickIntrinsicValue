import yahooFinance from 'yahoo-finance2';

export default async (req, res) => {
  const { stockSymbol } = req.query;

  try {
    const result = await yahooFinance.quoteSummary(stockSymbol, {
      modules: [
        'price',
        'defaultKeyStatistics',
        'earningsTrend',
        'summaryDetail',
      ],
    });
    const pricePerShare = result.price.regularMarketPrice;
    const earningsPerShare = result.defaultKeyStatistics.trailingEps;
    const growthRate = result.earningsTrend.trend?.find(
      (x) => x.period === '+5y'
    )?.growth;
    const currentYieldOfBond = 2.57;
    const currencySymbol = result.price.currencySymbol;
    const dividendYield = result.summaryDetail.dividendYield ?? 0;
    const peRation = result.summaryDetail.trailingPE;

    const isInvalid = growthRate === null || peRation === null;

    return res.status(200).json({
      pricePerShare,
      earningsPerShare,
      growthRate: (growthRate * 100).toFixed(2),
      currentYieldOfBond,
      currencySymbol,
      dividendYield: (dividendYield * 100).toFixed(2),
      peRation,
      isInvalid,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Failed to fetch data from Yahoo Finance' });
  }
};
