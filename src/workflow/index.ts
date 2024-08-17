// workflow
type UnvalidatedOrder = {
  orderId: OrderId;
  customerInfo: UnvalidatedCustomerInfo;
  shippingAddress: UnvalidatedAddress;
};

// command = workflowへの入力
type PlaceOrder = Command<UnvalidatedOrder>;
// genericsを使って、共通の型を定義
type Command<T> = {
  data: T;
  timestamp: Date;
  userId: string;
  // etc...
};

type OrderTakingCommand = PlaceOrder | ChangeOrder | CancelOrder;

type ValidatedOrder = {
  orderId: OrderId;
  customerInfo: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  orderLines: ValidatedOrderLine[];
};

type PricedOrder = {
  orderId: OrderId;
  customerInfo: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  orderLines: PricedOrderLine[];
  amountToBill: BillingAmount;
};

// 注文の取りうる状態をまとめたトップレベルの型
type Order = UnvalidatedOrder | ValidatedOrder | PricedOrder;
