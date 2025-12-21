'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

const faqs = [
  {
    id: '1',
    question: 'What areas in Korea do you cover?',
    answer: 'We cover all major destinations including Seoul, Busan, Jeju Island...',
    order: 1,
  },
  {
    id: '2',
    question: 'Do you offer medical tourism packages?',
    answer: 'Yes, we partner with JCI-accredited hospitals and clinics...',
    order: 2,
  },
  {
    id: '3',
    question: 'What languages do your guides speak?',
    answer: 'Our licensed guides are fluent in English, Indonesian (Bahasa)...',
    order: 3,
  },
  {
    id: '4',
    question: 'How do I book a tour or service?',
    answer: 'Simply fill out our inquiry form with your preferences...',
    order: 4,
  },
  {
    id: '5',
    question: 'What payment methods do you accept?',
    answer: 'We accept international bank transfers, credit cards...',
    order: 5,
  },
  {
    id: '6',
    question: 'Can you help with visa requirements?',
    answer: 'Yes, we provide guidance on visa requirements...',
    order: 6,
  },
];

export default function FAQAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="mt-2 text-gray-600">Manage frequently asked questions.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {/* Setup Notice */}
      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Connect to Supabase database to enable full CRUD functionality.
          Currently showing sample data. Drag to reorder questions.
        </p>
      </div>

      {/* FAQ List */}
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <button className="mt-1 cursor-grab text-gray-400 hover:text-gray-600">
                  <GripVertical className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="mr-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        #{faq.order}
                      </span>
                      <h3 className="inline font-medium text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded p-1 text-gray-400 hover:bg-red-100 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
