import { ICalculatedModel } from '@/types/calculated-model';
import {
  IIntrinsicValue,
  IntrinsicValueDefault,
} from '@/types/intrinsic-value';

function getEnterpriseValue(discountRate: number, cashFlows: number[]) {
  const npv = cashFlows.reduce(
    (accumulator, currentValue, index) =>
      accumulator + currentValue / Math.pow(1 + discountRate / 100, index + 1),
    0
  );

  return npv;
}

export function calculateDiscountedCashFlowValuation(
  pricePerShare: number,
  growthRate: number,
  marginOfSafety: number,
  freeCashFlow: number,
  discountRate: number,
  perpetualGrowthRate: number,
  cashAndEquivalents: number,
  totalDebt: number,
  shareOutstanding: number
): IIntrinsicValue {
  if (
    Number.isNaN(pricePerShare) ||
    Number.isNaN(growthRate) ||
    Number.isNaN(marginOfSafety) ||
    Number.isNaN(freeCashFlow) ||
    Number.isNaN(discountRate) ||
    Number.isNaN(perpetualGrowthRate) ||
    Number.isNaN(cashAndEquivalents) ||
    Number.isNaN(totalDebt) ||
    Number.isNaN(shareOutstanding)
  ) {
    throw new Error(
      "Can't calculate DCF value because of invalid input parameters."
    );
  }

  const years = 5;
  const freeCashFlows: number[] = [];
  for (let i = 0; i < years; i++) {
    const freeCashFlowInFuture =
      freeCashFlow * Math.pow(1 + growthRate / 100.0, i + 1);
    freeCashFlows.push(freeCashFlowInFuture);
  }

  const freeCashFlowOver5Years = freeCashFlows[freeCashFlows.length - 1];
  const terminalValue =
    (freeCashFlowOver5Years * (1 + perpetualGrowthRate / 100.0)) /
    ((discountRate - perpetualGrowthRate) / 100.0);

  freeCashFlows[freeCashFlows.length - 1] += terminalValue;

  const enterpriseValue = getEnterpriseValue(discountRate, freeCashFlows);

  const equityValue = enterpriseValue + cashAndEquivalents - totalDebt;

  const intrinsicValue = equityValue / shareOutstanding;

  const upside = ((intrinsicValue - pricePerShare) / pricePerShare) * 100;

  let acceptableBuyPrice = intrinsicValue * ((100 - marginOfSafety) / 100);
  acceptableBuyPrice = acceptableBuyPrice > 0 ? acceptableBuyPrice : 0.0;

  const belowIntrinsicValue =
    pricePerShare <= acceptableBuyPrice && pricePerShare !== 0;

  return {
    intrinsicValue: parseFloat(intrinsicValue.toFixed(2)),
    differencePercentage: parseFloat(upside.toFixed(2)),
    acceptableBuyPrice: parseFloat(acceptableBuyPrice.toFixed(2)),
    belowIntrinsicValue: belowIntrinsicValue,
    valid: true,
  };
}

function calculateGrahamValuation(
  pricePerShare: number,
  earningsPerShare: number,
  growthRate: number,
  currentYieldOfBond: number,
  marginOfSafety: number
): IIntrinsicValue {
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
    valid: true,
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
  peRatio: number,
  freeCashFlow: number,
  discountRate: number,
  perpetualGrowthRate: number,
  cashAndEquivalents: number,
  totalDebt: number,
  shareOutstanding: number
): ICalculatedModel {
  const grahamValuation = calculateGrahamValuation(
    pricePerShare,
    earningsPerShare,
    growthRate,
    currentYieldOfBond,
    marginOfSafety
  );

  let dcfValuation: IIntrinsicValue = IntrinsicValueDefault;
  try {
    dcfValuation = calculateDiscountedCashFlowValuation(
      pricePerShare,
      growthRate,
      marginOfSafety,
      freeCashFlow,
      discountRate,
      perpetualGrowthRate,
      cashAndEquivalents,
      totalDebt,
      shareOutstanding
    );
  } catch (e) {
    dcfValuation.valid = false;
  }

  const peterLynchValutation = calculatePeterLynchValutation(
    earningsPerShare,
    dividendYield,
    peRatio
  );

  const belowIntrinsicValue =
    grahamValuation.belowIntrinsicValue &&
    dcfValuation.belowIntrinsicValue &&
    peterLynchValutation.belowIntrinsicValue;

  return {
    grahamValutation: grahamValuation,
    dcfValutation: dcfValuation,
    plValutation: peterLynchValutation,
    belowIntrinsicValue: belowIntrinsicValue,
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
