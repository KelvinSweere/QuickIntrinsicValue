import '@testing-library/jest-dom';
import { calculateDiscountedCashFlowValuation } from './calculator-service';

describe('calculateDiscountedCashFlowValuation', () => {
  const parameters = {
    pricePerShare: 133.98,
    growthRate: 6.36,
    marginOfSafety: 30,
    perpetualGrowthRate: 2.5,
    discountRate: 11.82,
    freeCashFlow: 111443000,
    cashAndEquivalents: 48304000,
    totalDebt: 96423000,
    shareOutstanding: 15630000,
  };

  it('cash flows in the future', () => {
    const result = calculateDiscountedCashFlowValuation(
      parameters.pricePerShare,
      parameters.growthRate,
      parameters.marginOfSafety,
      parameters.freeCashFlow,
      parameters.discountRate,
      parameters.perpetualGrowthRate,
      parameters.cashAndEquivalents,
      parameters.totalDebt,
      parameters.shareOutstanding
    );

    expect(result.intrinsicValue).toEqual(88.73);
    expect(result.differencePercentage).toEqual(-33.77);
    expect(result.acceptableBuyPrice).toEqual(62.11);
    expect(result.belowIntrinsicValue).toEqual(false);
  });
});
