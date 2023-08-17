export interface ICalculatedModel {
  intristicValue: number;
  differencePercentage: number;
  acceptableBuyPrice: number;
  canBuy: boolean;
}

export const defaultIntrinsicValue: ICalculatedModel = {
  intristicValue: 0,
  differencePercentage: 0,
  acceptableBuyPrice: 0,
  canBuy: false,
};
