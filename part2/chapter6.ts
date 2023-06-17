type Name = string;
type Email = string;
type Address = string;

/**
 * A customer must have an email or a postal address.
 */

// Incorrect
// type Contact = {
//   name: Name;
//   email: Email;
//   address: Address;
// };

// ↓↓↓

// Incorrect
// type Contact = {
//   name: Name;
//   email?: Email;
//   address?: Address;
// };

// ↓↓↓

type EmailOnly = {
  email: Email;
};
type AddressOnly = {
  address: Address;
};
type BothContactMethods = {
  email: Email;
  address: Address;
};

type ContactInfo = EmailOnly | AddressOnly | BothContactMethods;

type Contact = {
  name: Name;
  ContactInfo: ContactInfo;
};

/**
 * ValidatedAddress
 */
type UnvalidatedAddress = any;
type ValidatedAddress = string;
type ValidattionEror = any;

type AddressValidationService = (
  arg: UnvalidatedAddress
) => ValidatedAddress | ValidattionEror;

type UnvalidatedOrder = {
  shipingAddress: UnvalidatedAddress;
};
// テストを書くことなく、住所が検証済みであることを保証できた
type ValidatedOrder = {
  shippingAddress: ValidatedAddress;
};
