export interface IModelParameters {
  pricePerShare: number;
  earningsPerShare: number;
  growthRate: number;
  currentYieldOfBond: number;
  currencySymbol: string;
  dividendYield: number;
  peRation: number;
  isInvalid: boolean;
}

export const defaultModelParameters: IModelParameters = {
  pricePerShare: 0,
  earningsPerShare: 0,
  growthRate: 0,
  currentYieldOfBond: 0,
  currencySymbol: '$',
  dividendYield: 0,
  peRation: 0,
  isInvalid: false,
};
