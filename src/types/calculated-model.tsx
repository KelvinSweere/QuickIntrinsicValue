export interface ICalculatedModel {
  intrinsicValue: number;
  differencePercentage: number;
  acceptableBuyPrice: number;
  belowIntrinsicValue: boolean;
  plValutation: number;
  freeCashFlow: number;
  cash: number;
  debt: number;
  sharesOutstanding: number;
  perpetualGrowthRate: number;
  wacc: number;
  isInvalid: boolean;
}

export const defaultIntrinsicValue: ICalculatedModel = {
  intrinsicValue: 0,
  differencePercentage: 0,
  acceptableBuyPrice: 0,
  belowIntrinsicValue: false,
  plValutation: 0,
  freeCashFlow: 0,
  cash: 0,
  debt: 0,
  sharesOutstanding: 0,
  perpetualGrowthRate: 0,
  wacc: 0,
  isInvalid: false,
};
