export interface Customer {
    id: number;
    cardNumber: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    totalPoints: number
}

export interface ExchangePointData {
    user_id: number;
}
