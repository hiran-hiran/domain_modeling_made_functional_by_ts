/**
 * OrderTaking domain
 */

namespace OrderTaking {
  // Value Object
  //
  // constraint: starting with "W" then 4 digits
  type WidgetCode = string;
  // constraint: starting with "G" then 3 digits
  type GizmoCode = string;
  type ProductCode = WidgetCode | GizmoCode;

  // integer
  type UnitQuantity = number;
  // float
  type KilogramQuantity = number;
  type OrderQuantity = UnitQuantity | KilogramQuantity;

  // Entity
  //
  // int or string or uuidなのか不明
  type OrderId = undefined;
  type OrderLineId = undefined;
  type CustomerId = undefined;

  type CustomerInfo = undefined;
  type ShippingAddress = undefined;
  type BillingAddress = undefined;
  type Price = undefined;
  type BillingAmount = undefined;

  type Order = {
    id: OrderId; // id for entity
    customerId: CustomerId; // customer reference
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
    orderLines: OrderLine[];
    amountToBill: BillingAmount;
  };

  type OrderLine = {
    id: OrderLineId; // id for entity
    orderId: OrderId;
    productCode: ProductCode;
    orderQuantity: OrderQuantity;
    price: Price;
  };

  type UnvalidatedOrder = {
    orderId: string;
  };

  type PlaceOrderEvents = {};

  type PlaceOrderError = ValidationError;
  type ValidationError = {
    fieldName: string;
    errorDescription: string;
  };

  // The "Place Order" process (work flow)
  type PlacedOrder = (
    args: UnvalidatedOrder
  ) => PlaceOrderEvents | PlaceOrderError;
}
