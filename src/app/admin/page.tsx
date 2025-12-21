import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Eye, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Inquiries',
    value: '0',
    change: '+0 this week',
    icon: MessageSquare,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    title: 'Page Views',
    value: '-',
    change: 'Connect analytics',
    icon: Eye,
    color: 'text-green-600 bg-green-100',
  },
  {
    title: 'Conversion Rate',
    value: '-',
    change: 'No data yet',
    icon: TrendingUp,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    title: 'Active Clients',
    value: '0',
    change: 'Start tracking',
    icon: Users,
    color: 'text-amber-600 bg-amber-100',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to the Keyable Korea admin panel.</p>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-1 text-sm text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Quick Setup</h2>
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-medium text-amber-800">Complete Your Setup</h3>
          <ul className="mt-2 list-inside list-disc text-sm text-amber-700">
            <li>Configure Supabase database connection</li>
            <li>Set up email notifications (SMTP)</li>
            <li>Add your business information</li>
            <li>Connect Google Analytics</li>
          </ul>
        </div>
      </div>

      {/* Environment Variables Needed */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Environment Variables</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <pre className="overflow-x-auto p-4 text-sm">
{`# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Gmail SMTP)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Admin
ADMIN_API_KEY=generate_a_secure_key`}
          </pre>
        </div>
      </div>
    </div>
  );
}
