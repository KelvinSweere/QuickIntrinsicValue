export interface IPeterLynchValuationModel {
  plValutation: number;
  belowIntrinsicValue: boolean;
}

export const PeterLynchValuationModelDefault: IPeterLynchValuationModel = {
  plValutation: 0,
  belowIntrinsicValue: false,
};
