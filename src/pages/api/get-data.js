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
        'financialData',
      ],
    });

    const freeCashFlow = result?.financialData?.freeCashflow;
    const growthRate = result.earningsTrend.trend?.find(
      (x) => x.period === '+5y'
    )?.growth;
    const pricePerShare = result.price.regularMarketPrice;
    const earningsPerShare = result.defaultKeyStatistics.trailingEps;
    const currentYieldOfBond = 2.57;
    const currencySymbol = result.price.currencySymbol;
    const dividendYield = result.summaryDetail.dividendYield ?? 0;
    const peRation = result.summaryDetail.trailingPE;

    const isInvalid = growthRate === null || peRation === null;

    const equity = result?.price?.marketCap;
    const debt = result?.financialData?.totalDebt;

    const costOfEquity = 0.1;
    const costOfDebt = 0.05;
    const taxRate = 0.3;
    const totalCapital = equity + debt;
    const wacc =
      (equity / totalCapital) * costOfEquity +
      (debt / totalCapital) * costOfDebt * (1 - taxRate);

    console.log('freeCashFlow', freeCashFlow);
    console.log('growthRate', growthRate);
    console.log('wacc', wacc);

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
