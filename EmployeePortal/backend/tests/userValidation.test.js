// tests/userValidation.test.js
import { describe, test, expect } from "@jest/globals";

// Regex patterns used in your registration logic
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[\S]{6,20}$/;

describe("Input Whitelisting Validation", () => {

  // Username tests
  test("Valid usernames should pass", () => {
    const validUsernames = ["JohnDoe", "user_123", "Alice_20"];
    validUsernames.forEach(name => {
      expect(usernameRegex.test(name)).toBe(true);
    });
  });

  test("Invalid usernames should fail", () => {
    const invalidUsernames = ["ab", "name with space", "name!", "user@123"];
    invalidUsernames.forEach(name => {
      expect(usernameRegex.test(name)).toBe(false);
    });
  });

  // Email tests
  test("Valid emails should pass", () => {
    const validEmails = ["test@example.com", "user123@mail.co", "alice.smith@domain.org"];
    validEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true);
    });
  });

  test("Invalid emails should fail", () => {
    const invalidEmails = ["plainaddress", "@missingusername.com", "name@.com", "user@domain"];
    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });

  // Password tests
  test("Valid passwords should pass", () => {
    const validPasswords = ["password123", "Pass_456", "12345678"];
    validPasswords.forEach(password => {
      expect(passwordRegex.test(password)).toBe(true);
    });
  });

  test("Invalid passwords should fail", () => {
    const invalidPasswords = ["short", "space pass", "toolongpasswordtoolong123456"];
    invalidPasswords.forEach(password => {
      expect(passwordRegex.test(password)).toBe(false);
    });
  });

});
