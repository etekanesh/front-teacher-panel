export interface ApiParams {
  page?: number;
  action?: string;
  query?: string | number;
  courses?: string;
  page_size?: number;
}

export interface ApiResponse {
  results: UsersDataTypes;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface UsersDataTypes {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  nation_code: string;
  birthday: moment.Moment | null;
  role: number,
  telegram_status: boolean
  profile: string
  uuid?: string,
}
