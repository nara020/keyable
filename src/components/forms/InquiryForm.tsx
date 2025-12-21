'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface InquiryFormProps {
  locale: string;
  dict: Dictionary;
  defaultService?: string;
}

export function InquiryForm({ locale, dict, defaultService }: InquiryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const budgetOptions = [
    { value: '', label: dict.inquiry.form.budgetOptions.select },
    { value: 'economy', label: dict.inquiry.form.budgetOptions.economy },
    { value: 'standard', label: dict.inquiry.form.budgetOptions.standard },
    { value: 'premium', label: dict.inquiry.form.budgetOptions.premium },
    { value: 'luxury', label: dict.inquiry.form.budgetOptions.luxury },
  ];

  const serviceOptions = [
    { value: '', label: dict.inquiry.form.serviceOptions.select },
    { value: 'private-tour', label: dict.inquiry.form.serviceOptions.privateTour },
    { value: 'medical-tourism', label: dict.inquiry.form.serviceOptions.medical },
    { value: 'guide-service', label: dict.inquiry.form.serviceOptions.guide },
    { value: 'vehicle-rental', label: dict.inquiry.form.serviceOptions.vehicle },
    { value: 'custom', label: dict.inquiry.form.serviceOptions.custom },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      preferred_date: formData.get('date') as string,
      guests: formData.get('guests') as string,
      budget: formData.get('budget') as string,
      service_type: formData.get('service') as string,
      details: formData.get('details') as string,
    };

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      router.push(`/${locale}/inquiry/complete`);
    } catch (err) {
      setError('Failed to submit. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="name"
          name="name"
          label={dict.inquiry.form.name}
          placeholder={dict.inquiry.form.namePlaceholder}
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label={dict.inquiry.form.email}
          placeholder={dict.inquiry.form.emailPlaceholder}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="phone"
          name="phone"
          type="tel"
          label={dict.inquiry.form.phone}
          placeholder={dict.inquiry.form.phonePlaceholder}
          required
        />
        <Input
          id="date"
          name="date"
          type="date"
          label={dict.inquiry.form.date}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="guests"
          name="guests"
          label={dict.inquiry.form.guests}
          placeholder={dict.inquiry.form.guestsPlaceholder}
          required
        />
        <Select
          id="budget"
          name="budget"
          label={dict.inquiry.form.budget}
          options={budgetOptions}
          required
        />
      </div>

      <Select
        id="service"
        name="service"
        label={dict.inquiry.form.service}
        options={serviceOptions}
        defaultValue={defaultService || ''}
        required
      />

      <Textarea
        id="details"
        name="details"
        label={dict.inquiry.form.details}
        placeholder={dict.inquiry.form.detailsPlaceholder}
        rows={5}
      />

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
        {isSubmitting ? dict.inquiry.form.submitting : dict.inquiry.form.submit}
      </Button>
    </form>
  );
}
