import { describe, test, expect } from "@jest/globals";

// Regex from userRoutes.js
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[\S]{6,20}$/;

describe("User Input Validation", () => {
  test("Valid usernames pass regex", () => {
    const valid = ["John123", "Alice_2025", "user_name"];
    valid.forEach(u => expect(usernameRegex.test(u)).toBe(true));
  });

  test("Invalid usernames fail regex", () => {
    const invalid = ["Jo!", "user name", "ab"];
    invalid.forEach(u => expect(usernameRegex.test(u)).toBe(false));
  });

  test("Valid emails pass regex", () => {
    const valid = ["test@example.com", "user123@domain.co"];
    valid.forEach(e => expect(emailRegex.test(e)).toBe(true));
  });

  test("Invalid emails fail regex", () => {
    const invalid = ["test@com", "user@domain", "userdomain.com"];
    invalid.forEach(e => expect(emailRegex.test(e)).toBe(false));
  });

  test("Valid passwords pass regex", () => {
    const valid = ["Password1", "123456", "abcDEF123"];
    valid.forEach(p => expect(passwordRegex.test(p)).toBe(true));
  });

  test("Invalid passwords fail regex", () => {
    const invalid = ["abc", "pass word", " "];
    invalid.forEach(p => expect(passwordRegex.test(p)).toBe(false));
  });
});
