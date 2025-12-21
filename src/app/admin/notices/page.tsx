'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

const notices = [
  {
    id: '1',
    title: 'Holiday Season Special: Book Early for Best Rates',
    status: 'published',
    created_at: '2024-12-15',
  },
  {
    id: '2',
    title: 'New Medical Tourism Packages Available',
    status: 'published',
    created_at: '2024-12-01',
  },
  {
    id: '3',
    title: 'Updated Visa Information for Indonesian Travelers',
    status: 'published',
    created_at: '2024-11-20',
  },
];

export default function NoticesAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notices</h1>
          <p className="mt-2 text-gray-600">Manage news and announcements.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Notice
        </Button>
      </div>

      {/* Setup Notice */}
      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Connect to Supabase database to enable full CRUD functionality.
          Currently showing sample data.
        </p>
      </div>

      {/* Notices Table */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{notice.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        notice.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {notice.status === 'published' ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                      {notice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {notice.created_at}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded p-1 text-gray-400 hover:bg-red-100 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
