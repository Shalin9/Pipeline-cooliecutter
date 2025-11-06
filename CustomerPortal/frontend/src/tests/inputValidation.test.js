import { describe, test, expect } from "@jest/globals";

// Payment input whitelisting (matches Payments.js cleaning)
const nameRegex = /^[a-zA-Z\s]+$/;
const accountRegex = /^[0-9]{10,20}$/;
const bankRegex = /^[a-zA-Z\s]+$/;
const countryRegex = /^[a-zA-Z\s]+$/;

describe("Payments Input Validation", () => {
  test("Valid names pass regex", () => {
    expect(nameRegex.test("John Doe")).toBe(true);
  });

  test("Invalid names fail regex", () => {
    expect(nameRegex.test("John123")).toBe(false);
  });

  test("Valid account number passes regex", () => {
    expect(accountRegex.test("1234567890")).toBe(true);
  });

  test("Invalid account number fails regex", () => {
    expect(accountRegex.test("12345abc")).toBe(false);
  });

  test("Valid bank name passes regex", () => {
    expect(bankRegex.test("First National")).toBe(true);
  });

  test("Invalid bank name fails regex", () => {
    expect(bankRegex.test("Bank123")).toBe(false);
  });

  test("Valid country passes regex", () => {
    expect(countryRegex.test("South Africa")).toBe(true);
  });

  test("Invalid country fails regex", () => {
    expect(countryRegex.test("South Africa1")).toBe(false);
  });
});
