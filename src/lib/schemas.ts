import { z } from 'zod';

export const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Please select a country'),
  phoneNumber: z
    .string()
    .min(5, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});
