export type DepositDto = {
    account_id: number,
    term: String,
    amount: number,
    deposit_type: String
}

export type Deposit = {
    id: number,
    date: Date,
    term: String,
    amount: number,
    compensation_amount: number,
    status: String,
    deposit_type: String,
    user_id: number,
    account_id: number
}

export type CreditDto = {
    account_id: number,
    term: String,
    payment_type: String,
    amount_given: number,
    is_notification_enabled: Boolean
}

export type AccountDto = {
    name: String,
    currency: String
}

export type UserDto = {
    password: String,
    full_name: String,
    email: String,
    phone_number: String,
    is_enabled: Boolean,
    two_factor_auth: Boolean
}

export type CryptoRates = {
  name: string;
  currencies: Rate[];
}

export type Rate = {
    key: string,
    value: number
}

export type CreateCreditDto = {
  account_id: number;
  term: 'MONTH_3' | 'MONTH_6' | 'MONTH_12';
  payment_type: 'MANUAL';
  amount_given: number;
  is_notification_enabled: boolean;
}

export type MakePaymentRequest = {
  sum_to_pay: number;
}

export type Credit = {
  id: number;
  name: string;
  date: Date;
  user_id: number;
  account_id: number;
  term: 'MONTH_3' | 'MONTH_6' | 'MONTH_12';
  amount_given: number;
  debt: number;
  next_pay_date: Date;
  per_month_pay_sum: number;
  penya: number;
  status: 'NEW' | 'APPROVED' | 'PAID';
  payment_type: 'MANUAL';
  is_notification_enabled: boolean;
}

export type Login = {
  login: String,
  password: String
}

export type JwtToken = {
  token: String,
  otpExpiration: String
}

export type ConfirmOtpRequest = {
  otp_code: number
}

