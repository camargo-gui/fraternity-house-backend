export interface MedicineDTO {
  id?: number;
  name: string;
  id_pharmacological_form: number;
  id_pharmacological_name: number;
  created_a?: Date | null;
  updated_at?: Date | null;
}

export interface MedicineRequestParams {
  name?: string;
  pharmacologicalName?: string;
  pharmacologicalForm?: string;
}

export interface MedicineWhereConditions {
  name?: StringFilterCondition;
  PharmacologicalName?: {
    name?: StringFilterCondition;
  };
  PharmacologicalForm?: {
    name?: StringFilterCondition;
  };
}

type StringFilterCondition = {
  contains: string;
  mode: "insensitive";
};
