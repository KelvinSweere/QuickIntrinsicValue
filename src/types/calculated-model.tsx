import { IIntrinsicValue, IntrinsicValueDefault } from './intrinsic-value';
import {
  IPeterLynchValuationModel,
  PeterLynchValuationModelDefault,
} from './peter-lynch-valutation-model';

export interface ICalculatedModel {
  grahamValutation: IIntrinsicValue;
  dcfValutation: IIntrinsicValue;
  plValutation: IPeterLynchValuationModel;
  belowIntrinsicValue: boolean;
}

export const defaultIntrinsicValue: ICalculatedModel = {
  grahamValutation: IntrinsicValueDefault,
  dcfValutation: IntrinsicValueDefault,
  plValutation: PeterLynchValuationModelDefault,
  belowIntrinsicValue: false,
};
