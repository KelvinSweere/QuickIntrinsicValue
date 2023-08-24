export interface IIntrinsicValue {
  intrinsicValue: number;
  acceptableBuyPrice: number;
  differencePercentage: number;
  belowIntrinsicValue: boolean;
}

export interface ICalculatedModel {
  grahamValutation: IIntrinsicValue;
  dcfValutation: IIntrinsicValue;
  plValutation: number;
}

export const defaultIntrinsicValue: ICalculatedModel = {
  grahamValutation: {
    intrinsicValue: 0,
    acceptableBuyPrice: 0,
    differencePercentage: 0,
    belowIntrinsicValue: false,
  },
  dcfValutation: {
    intrinsicValue: 0,
    acceptableBuyPrice: 0,
    differencePercentage: 0,
    belowIntrinsicValue: false,
  },
  plValutation: 0,
};
