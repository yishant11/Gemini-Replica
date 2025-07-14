
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '@/store';
import { useCountries } from '@/hooks/use-countries';
import { useToast } from '@/hooks/use-toast';
import { phoneSchema, otpSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

function AppLogo() {
    return (
        <div className="flex items-center justify-center gap-3 mb-4">
            <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
            >
                <path
                d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                />
                <path
                d="M2 7L12 12L22 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                />
                <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                />
            </svg>
            <h1 className="text-3xl font-headline font-bold">Gemini Replica</h1>
        </div>
    )
}

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedPhone, setFormattedPhone] = useState('');

  const { login } = useAppStore();
  const { countries, loading: countriesLoading } = useCountries();
  const { toast } = useToast();
  const router = useRouter();

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: '', phoneNumber: '' },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const onPhoneSubmit: SubmitHandler<PhoneFormValues> = (data) => {
    setIsSubmitting(true);
    setFormattedPhone(`${data.countryCode}${data.phoneNumber}`);
    toast({ title: 'Simulating OTP Send...', description: 'Please wait a moment.' });
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      toast({ title: 'OTP Sent!', description: `An OTP was "sent" to ${data.countryCode}${data.phoneNumber}` });
    }, 2000);
  };

  const onOtpSubmit: SubmitHandler<OtpFormValues> = (data) => {
    setIsSubmitting(true);
    toast({ title: 'Verifying OTP...', description: 'Please wait a moment.' });
    setTimeout(() => {
      if (data.otp === '123456') { // Simulate correct OTP
        setIsSubmitting(false);
        toast({ title: 'Success!', description: 'You have been logged in.' });
        login();
        router.push('/chat');
      } else {
        setIsSubmitting(false);
        otpForm.setError('otp', { type: 'manual', message: 'Invalid OTP. Use 123456.' });
        toast({ title: 'Error', description: 'Invalid OTP provided.', variant: 'destructive' });
      }
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
            <AppLogo />
            {step === 'phone' ? (
                <>
                <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
                <CardDescription>Enter your phone number to sign in.</CardDescription>
                </>
            ) : (
                <>
                <CardTitle className="font-headline text-2xl">Enter OTP</CardTitle>
                <CardDescription>An OTP was sent to {formattedPhone}. For this demo, use 123456.</CardDescription>
                </>
            )}
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                <div className="flex gap-2">
                  <FormField
                    control={phoneForm.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={countriesLoading}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={countriesLoading ? 'Loading...' : 'Code'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries
                              .filter(country => `${country.idd.root}${country.idd.suffixes?.[0] || ''}` !== '')
                              .map((country) => {
                                const countryCodeValue = `${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
                                return (
                                  <SelectItem key={country.cca2} value={countryCodeValue}>
                                    <div className="flex items-center gap-2">
                                        <Image src={country.flags.svg} alt={country.name.common} width={20} height={15} />
                                        <span>{countryCodeValue}</span>
                                    </div>
                                  </SelectItem>
                                )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-2/3">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send OTP
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                 <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                           <Input placeholder="Enter 6-digit OTP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify OTP
                </Button>
                <Button variant="link" onClick={() => setStep('phone')} className="w-full">
                  Use a different phone number
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
