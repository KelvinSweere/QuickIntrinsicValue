export interface IIntrinsicValue {
  intrinsicValue: number;
  acceptableBuyPrice: number;
  differencePercentage: number;
  belowIntrinsicValue: boolean;
  valid: boolean;
}

export const IntrinsicValueDefault: IIntrinsicValue = {
  intrinsicValue: 0,
  acceptableBuyPrice: 0,
  differencePercentage: 0,
  belowIntrinsicValue: false,
  valid: true,
};
