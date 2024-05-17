export interface IExchangeModel {
  Cur_Abbreviation: string;
  Cur_ID: string;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
  Date: string;
  symbol?: string;
}

export interface IExchangeDTO {
  periodicity?: string;
  parammode?: string;
  ondate?: string;
}
