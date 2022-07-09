export interface Bill {
  id: number;
  billingObject: number;
  orderId: number;
  customerName: string;
  customerId: number;
  serviceTip: number;
  tax: number;
  discount: number;
  pointEarned: number;
  pointUsed: number;
  staffName: string;
  staffId: number;
  totalPrice: number;
  note: string;
  status: number;
}
