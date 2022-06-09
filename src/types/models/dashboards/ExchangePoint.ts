export interface Customer {
  id: number;
  cardId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  totalPoints: number;
  avatar: any;
}

export interface ExchangePointData {
  user_id: number;
}
