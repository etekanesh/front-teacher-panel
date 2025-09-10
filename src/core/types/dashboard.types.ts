export interface DashboardOverviewDataTypes {
  in_review: number;
  label: string;
  students_total_income: string;
  unanswered_messages: number;
}

export interface DashboardSummaryDataTypes {
  month: string;
  income: number;
  sold: number;
}

export interface DashboardMonthlyDataTypes {
  date: {
    year: number;
    month: number;
    month_name: string;
  };
  sold_income: number;
  installment_amount: number;
  intial_amount:number;
  webinar_income: number;
  share_of_students: number;
}
