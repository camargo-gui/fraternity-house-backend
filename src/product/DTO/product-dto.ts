export interface ProductDTO {
  id?: number;
  quantity?: number;
  name?: string;
  measurement: MeasurementUnit;
}

export enum MeasurementUnit {
  UNITY = "UNITY",
  KG = "KG",
  L = "L",
}