// input for workflow is always domain object that has been deserialized from DTO
type UnvalidatedOrder = {
  OrderId: string;
  // CustomerInfo : UnvalidatedCustomerInfo ShippingAddress : UnvalidatedAddress ...
};

// modeling command that is passed workflow
type Command<T> = {
  data: T;
  timestamp: Date;
  userId: string;
  // etc
};

type PlaceOrder = Command<UnvalidatedOrder>;

type OrderTakingCommand = {
  place: PlaceOrder;
  // change: ChangeOrder;
  // Cancel: CancelOrder;
};

// 注文状態をどう管理するか
// 他の状態では必要のないものが混ざってくる
// type Order = {
//   OrderId: number;
// ...
//   IsValidated: boolean; // set when validated
//   IsPriced: boolean; // set when priced
//   AmountToBill: number; // also set when priced
// };

// state machine
// ショッピングカート
type Item = {};
type ActiveCartData = {
  unpaidItems: Item[];
};
type PaidCartData = {
  paidItems: Item[];
  payment: number;
};

type EmptyCart = {
  tag: "empty";
  cart: [];
};
type ActiveCart = {
  tag: "active";
  cart: ActiveCartData;
};
type PaidCart = {
  tag: "paid";
  cart: PaidCartData;
};
type ShoppingCart = EmptyCart | ActiveCart | PaidCart;

function addItem(cart: ShoppingCart, item: Item) {
  switch (cart.tag) {
    case "empty":
      // push(item)
      break;
    case "active":
      // push(...existingItem, item)
      break;
    case "paid":
      // do nothing
      break;

    default:
      break;
  }
}
