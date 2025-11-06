// validation.js
export const currencyRe = /^[A-Z]{3}$/; // ISO 4217 code e.g. USD EUR
export const amountRe = /^\d{1,12}(\.\d{1,2})?$/; // up to 12 digits, optional 2 decimals
export const accountRe = /^[A-Z0-9\-\_]{6,34}$/i; // simplified IBAN-like
export const descriptionRe = /^[\w\s\-\.,]{0,140}$/; // short description allowed chars

export function validatePayment(body) {
  if (!currencyRe.test(body.currency)) return { ok:false, field:"currency" };
  if (!amountRe.test(String(body.amount))) return { ok:false, field:"amount" };
  if (!accountRe.test(body.toAccount)) return { ok:false, field:"toAccount" };
  if (body.description && !descriptionRe.test(body.description)) return { ok:false, field:"description" };
  return { ok:true };
}

