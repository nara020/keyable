'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Mail, MessageCircle, Calendar, User, DollarSign } from 'lucide-react';

interface Inquiry {
  id: string;
  data: {
    name: string;
    email: string;
    phone: string;
    preferred_date: string;
    guests: string;
    budget: string;
    service_type: string;
    details?: string;
  };
  created_at: string;
  status: string;
}

// Sample data for demo - In production, fetch from API with auth
const initialInquiries: Inquiry[] = [
  {
    id: 'INQ-001',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+62812345678',
      preferred_date: '2025-02-15',
      guests: '2 adults, 1 child',
      budget: 'premium',
      service_type: 'private-tour',
      details: 'Looking for a 5-day Seoul and Jeju tour with K-pop experience.',
    },
    created_at: '2024-12-20T10:30:00Z',
    status: 'pending',
  },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    // In production, fetch from API
    // const response = await fetch('/api/admin/inquiries');
    // const data = await response.json();
    // setInquiries(data);

    // Simulate API call delay
    setTimeout(() => {
      setInquiries(initialInquiries);
      setIsLoading(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="mt-2 text-gray-600">Manage customer inquiries and requests.</p>
        </div>
        <Button variant="secondary" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Inquiries List */}
      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No inquiries yet. They will appear here when customers submit the form.</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {inquiry.data.name}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{inquiry.id}</p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {inquiry.data.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        {inquiry.data.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {inquiry.data.preferred_date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        {inquiry.data.guests}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                          {inquiry.data.service_type}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          {inquiry.data.budget}
                        </span>
                      </div>
                    </div>

                    {inquiry.data.details && (
                      <p className="mt-4 text-sm text-gray-600">{inquiry.data.details}</p>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    <a
                      href={`mailto:${inquiry.data.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#040f77] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d1b6d]"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                    <a
                      href={`https://wa.me/${inquiry.data.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4 text-sm text-gray-500">
                  Received: {new Date(inquiry.created_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
