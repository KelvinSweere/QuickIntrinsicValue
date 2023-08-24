export interface ICashFlowDiscountModel {
  intrinsicValue: number;
  upside: number;
  acceptableBuyPrice: number;
  belowIntrinsicValue: boolean;
}

export const defaultCashFlowDiscountModel: ICashFlowDiscountModel = {
  intrinsicValue: 0,
  upside: 0,
  acceptableBuyPrice: 0,
  belowIntrinsicValue: false,
};
