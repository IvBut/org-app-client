export interface IRateHistoryModel {
  Cur_OfficialRate: number;
  Cur_ID: number;
  Date: string;
}

export interface IRateHistoryDTO {
  startDate: string;
  endDate: string;
}
