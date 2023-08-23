import { ICalculatedModel } from '@/types/calculated-model';

function calculateDiscountedCashFlowValuation() {}

function calculateGrahamValuation(
  pricePerShare: number,
  earningsPerShare: number,
  growthRate: number,
  currentYieldOfBond: number,
  marginOfSafety: number
) {
  const calculateValue = (earningsPerShare *
    (7 + 1 * growthRate) *
    (4.4 / currentYieldOfBond)) as number;

  const value = calculateValue > 0 ? calculateValue : 0.0;

  const differencePercentage = ((value - pricePerShare) / pricePerShare) * 100;
  const calculatedAcceptableBuyPrice = value * ((100 - marginOfSafety) / 100);

  const acceptableBuyPrice =
    calculatedAcceptableBuyPrice > 0 ? calculatedAcceptableBuyPrice : 0.0;

  const belowIntrinsicValue =
    pricePerShare <= acceptableBuyPrice && pricePerShare !== 0;

  return {
    intrinsicValue: value,
    differencePercentage: differencePercentage,
    acceptableBuyPrice: acceptableBuyPrice,
    belowIntrinsicValue: belowIntrinsicValue,
  };
}

function calculatePeterLynchValutation(
  earningsPerShare: number,
  dividendYield: number,
  peRatio: number
) {
  const plValutation = (earningsPerShare + dividendYield) / peRatio;
  const belowIntrinsicValue = plValutation >= 1.5;

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
    intrinsicValue: grahamValuation.intrinsicValue,
    differencePercentage: grahamValuation.differencePercentage,
    acceptableBuyPrice: grahamValuation.acceptableBuyPrice,
    belowIntrinsicValue: grahamValuation.belowIntrinsicValue,
    plValutation: peterLynchValutation.plValutation,
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
  const returnVal = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log(returnVal);

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
