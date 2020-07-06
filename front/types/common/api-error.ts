export interface ApiError {

  code: number;

  message: string;

  errors: {

    msg: string;

    param: string;
  }[];
}
