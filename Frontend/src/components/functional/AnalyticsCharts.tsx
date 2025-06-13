import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for user growth chart
const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 160 },
  { month: 'Mar', users: 240 },
  { month: 'Apr', users: 290 },
  { month: 'May', users: 380 },
  { month: 'Jun', users: 460 },
  { month: 'Jul', users: 520 },
  { month: 'Aug', users: 610 },
  { month: 'Sep', users: 690 },
  { month: 'Oct', users: 790 },
  { month: 'Nov', users: 880 },
  { month: 'Dec', users: 950 },
];

// Mock data for uploads by type
const uploadsByTypeData = [
  { name: 'PDFs', value: 540 },
  { name: 'Images', value: 320 },
  { name: 'Code', value: 210 },
  { name: 'Links', value: 180 },
];

// Mock data for activity trends
const activityTrendsData = [
  { month: 'Jan', uploads: 45, summaries: 32, shares: 20 },
  { month: 'Feb', uploads: 52, summaries: 36, shares: 24 },
  { month: 'Mar', uploads: 61, summaries: 42, shares: 30 },
  { month: 'Apr', uploads: 67, summaries: 48, shares: 36 },
  { month: 'May', uploads: 72, summaries: 55, shares: 40 },
  { month: 'Jun', uploads: 78, summaries: 60, shares: 45 },
  { month: 'Jul', uploads: 85, summaries: 65, shares: 48 },
  { month: 'Aug', uploads: 92, summaries: 70, shares: 52 },
  { month: 'Sep', uploads: 98, summaries: 75, shares: 58 },
  { month: 'Oct', uploads: 105, summaries: 82, shares: 64 },
  { month: 'Nov', uploads: 112, summaries: 88, shares: 70 },
  { month: 'Dec', uploads: 120, summaries: 95, shares: 78 },
];

// Mock data for institution distribution
const institutionData = [
  { name: 'Universities', value: 45 },
  { name: 'High Schools', value: 25 },
  { name: 'Corporations', value: 20 },
  { name: 'Independent', value: 10 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function AnalyticsCharts() {
  const [period, setPeriod] = useState('year');

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Total user registrations over time</CardDescription>
          <Tabs
            defaultValue={period}
            onValueChange={setPeriod}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userGrowthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploads by Type</CardTitle>
          <CardDescription>Distribution of different resource types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={uploadsByTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {uploadsByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Trends</CardTitle>
          <CardDescription>User engagement metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activityTrendsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uploads"
                  stroke="hsl(var(--chart-1))"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="summaries"
                  stroke="hsl(var(--chart-2))"
                />
                <Line
                  type="monotone"
                  dataKey="shares"
                  stroke="hsl(var(--chart-3))"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Institution Distribution</CardTitle>
          <CardDescription>Users by organization type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={institutionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Bar dataKey="value" name="Percentage">
                  {institutionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}