import { ICalculatedModel } from '@/types/calculated-model';

export function calculateIntrinsicValue(
  pricePerShare: number,
  earningsPerShare: number,
  growthRate: number,
  currentYieldOfBond: number,
  marginOfSafety: number,
  dividendYield: number,
  peRatio: number
): ICalculatedModel {
  const calculateValue = (
    earningsPerShare *
    (7 + 1 * growthRate) *
    (4.4 / currentYieldOfBond)
  ).toFixed(2);
  const value = parseFloat(calculateValue) > 0 ? calculateValue : '0.00';

  const differencePercentage = (
    ((parseFloat(value) - pricePerShare) / pricePerShare) *
    100
  ).toFixed(2);
  const calculatedAcceptableBuyPrice = (
    parseFloat(value) *
    ((100 - marginOfSafety) / 100)
  ).toFixed(2);

  const acceptableBuyPrice =
    parseFloat(calculatedAcceptableBuyPrice) > 0
      ? calculatedAcceptableBuyPrice
      : '0.00';

  const belowIntrinsicValue =
    pricePerShare <= parseFloat(acceptableBuyPrice) && pricePerShare !== 0;

  const plValutation = ((earningsPerShare + dividendYield) / peRatio).toFixed(
    2
  );

  return {
    intrinsicValue: parseFloat(value),
    differencePercentage: parseFloat(differencePercentage),
    acceptableBuyPrice: parseFloat(acceptableBuyPrice),
    belowIntrinsicValue,
    plValutation: parseFloat(plValutation),
  };
}

export function shouldBuy(belowIntrinsicValue: boolean, plValutation: number) {
  return belowIntrinsicValue && plValutation >= 1;
}
