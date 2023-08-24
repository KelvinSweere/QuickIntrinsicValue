import { ICalculatedModel } from '@/types/calculated-model';

export function calculateDiscountedCashFlowValuation(
  pricePerShare: number,
  growthRate: number,
  marginOfSafety: number,
  freeCashFlow: number,
  discountRate: number,
  perpetualGrowthRate: number
) {
  const years = 5;
  const freeCashFlows: number[] = [];
  for (let i = 0; i < years; i++) {
    const freeCashFlowInFuture = freeCashFlow * Math.pow(1 + growthRate, i + 1);
    freeCashFlows.push(freeCashFlowInFuture);
  }

  console.log(freeCashFlows);

  // // Calculate the present value of the free cash flows
  // let presentValue = 0;
  // for (let i = 0; i < freeCashFlows.length; i++) {
  //   presentValue += freeCashFlows[i] / Math.pow(1 + discountRate, i + 1);
  // }

  // // Add the terminal value (assuming constant growth)
  // const lastCashFlow = freeCashFlows[freeCashFlows.length - 1];
  // const terminalValue =
  //   (lastCashFlow * (1 + discountRate)) / (discountRate - growthRate);

  // // Calculate the intrinsic value
  // const intrinsicValue = presentValue + terminalValue;

  // // Calculate other metrics
  // const differencePercentage =
  //   ((intrinsicValue - pricePerShare) / pricePerShare) * 100;
  // const calculatedAcceptableBuyPrice =
  //   intrinsicValue * ((100 - marginOfSafety) / 100);
  // const acceptableBuyPrice =
  //   calculatedAcceptableBuyPrice > 0 ? calculatedAcceptableBuyPrice : 0.0;
  // const belowIntrinsicValue =
  //   pricePerShare <= acceptableBuyPrice && pricePerShare !== 0;

  return {
    // intrinsicValue,
    // differencePercentage,
    // acceptableBuyPrice,
    // belowIntrinsicValue,
  };
}

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

export function floatToString(value: number): string {
  return isNaN(value)
    ? '0.00'
    : value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}
