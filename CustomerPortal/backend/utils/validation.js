// backend/utils/validation.js
export const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^[\S]{6,20}$/;
