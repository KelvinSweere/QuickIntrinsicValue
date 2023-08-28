export interface IModelParameters {
  stockName: string;
  pricePerShare: number;
  earningsPerShare: number;
  growthRate: number;
  currentYieldOfBond: number;
  currencySymbol: string;
  dividendYield: number;
  peRation: number;
  isInvalid: boolean;
  freeCashFlow: number;
  cash: number;
  debt: number;
  sharesOutstanding: number;
  perpetualGrowthRate: number;
  wacc: number;
}

export const defaultModelParameters: IModelParameters = {
  stockName: '',
  pricePerShare: 0,
  earningsPerShare: 0,
  growthRate: 0,
  currentYieldOfBond: 0,
  currencySymbol: '$',
  dividendYield: 0,
  peRation: 0,
  freeCashFlow: 0,
  cash: 0,
  debt: 0,
  sharesOutstanding: 0,
  perpetualGrowthRate: 0,
  wacc: 0,
  isInvalid: false,
};
