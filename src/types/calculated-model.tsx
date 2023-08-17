export interface ICalculatedModel {
  intrinsicValue: number;
  differencePercentage: number;
  acceptableBuyPrice: number;
  canBuy: boolean;
}

export const defaultIntrinsicValue: ICalculatedModel = {
  intrinsicValue: 0,
  differencePercentage: 0,
  acceptableBuyPrice: 0,
  canBuy: false,
};
