export interface IModelParameters {
  pricePerShare: number;
  earningsPerShare: number;
  growthRate: number;
  currentYieldOfBond: number;
  currencySymbol: string;
}

export const defaultModelParameters: IModelParameters = {
  pricePerShare: 0,
  earningsPerShare: 0,
  growthRate: 0,
  currentYieldOfBond: 0,
  currencySymbol: '$',
};
