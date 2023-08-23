import { ICalculatedModel } from '@/types/calculated-model';

function calculateDiscountedCashFlowValuation() {}

function calculateGrahamValuation(
  pricePerShare: number,
  earningsPerShare: number,
  growthRate: number,
  currentYieldOfBond: number,
  marginOfSafety: number
) {
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

  return {
    intrinsicValue: parseFloat(value).toFixed(2),
    differencePercentage: parseFloat(differencePercentage),
    acceptableBuyPrice: parseFloat(acceptableBuyPrice),
    belowIntrinsicValue: belowIntrinsicValue,
  };
}

function calculatePeterLynchValutation(
  earningsPerShare: number,
  dividendYield: number,
  peRatio: number
) {
  const plValutation = ((earningsPerShare + dividendYield) / peRatio).toFixed(
    2
  );

  const belowIntrinsicValue = parseFloat(plValutation) >= 1.5;

  return {
    plValutation,
    belowIntrinsicValue,
  };
}

export function calculateIntrinsicValue(
  pricePerShare: number,
  earningsPerShare: number,
  growthRate: number,
  currentYieldOfBond: number,
  marginOfSafety: number,
  dividendYield: number,
  peRatio: number
): ICalculatedModel {
  const grahamValuation = calculateGrahamValuation(
    pricePerShare,
    earningsPerShare,
    growthRate,
    currentYieldOfBond,
    marginOfSafety
  );

  const peterLynchValutation = calculatePeterLynchValutation(
    earningsPerShare,
    dividendYield,
    peRatio
  );

  return {
    intrinsicValue: parseFloat(grahamValuation.intrinsicValue),
    differencePercentage: parseFloat(
      grahamValuation.differencePercentage.toFixed(2)
    ),
    acceptableBuyPrice: parseFloat(
      grahamValuation.acceptableBuyPrice.toFixed(2)
    ),
    belowIntrinsicValue: grahamValuation.belowIntrinsicValue,
    plValutation: parseFloat(peterLynchValutation.plValutation),
    isInvalid: !(
      grahamValuation.belowIntrinsicValue ||
      peterLynchValutation.belowIntrinsicValue
    ),
  };
}

export function shouldBuy(belowIntrinsicValue: boolean, plValutation: number) {
  return belowIntrinsicValue && plValutation >= 1;
}

export function floatToString(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
