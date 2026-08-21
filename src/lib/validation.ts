import { z } from "zod";

export const supporterSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  phone: z.string().trim().min(7, "Phone or WhatsApp is required").max(32),
  country: z.string().trim().min(2, "Country is required").max(80),
  email: z.string().trim().email().optional().or(z.literal("")),
  district: z.string().trim().max(80).optional(),
  ageRange: z.string().trim().max(32).optional(),
  termsConsent: z.literal(true, {
    error: "Campaign Terms and Privacy Notice consent is required",
  }),
  marketingConsent: z.boolean().default(false),
  referralCode: z.string().trim().max(32).optional(),
  source: z.string().trim().max(80).optional(),
});

export type SupporterInput = z.infer<typeof supporterSchema>;
