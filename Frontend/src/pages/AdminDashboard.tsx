import { AdminFileApproval } from "@/components/dashboard/AdminFileApproval";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Activity,
  Database,
  FileText,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminDashboard = () => {
  const [features, setFeatures] = useState({
    pdfProcessing: true,
    imageAnalysis: true,
    linkAssist: false,
    aiSummary: true,
    exportFeature: true,
  });

  // Sample data for charts
  const uploadData = [
    { month: "Jan", uploads: 1200 },
    { month: "Feb", uploads: 1800 },
    { month: "Mar", uploads: 2200 },
    { month: "Apr", uploads: 2800 },
    { month: "May", uploads: 3200 },
    { month: "Jun", uploads: 3800 },
  ];

  const userGrowthData = [
    { month: "Jan", users: 500 },
    { month: "Feb", users: 750 },
    { month: "Mar", users: 1100 },
    { month: "Apr", users: 1500 },
    { month: "May", users: 2100 },
    { month: "Jun", users: 2800 },
  ];

  const usageData = [
    { name: "PDF Processing", value: 45, color: "#8B5CF6" },
    { name: "Image Analysis", value: 30, color: "#EC4899" },
    { name: "Link Assistant", value: 15, color: "#06B6D4" },
    { name: "Code Snippets", value: 10, color: "#10B981" },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Documents Processed",
      value: "15,429",
      change: "+8%",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "API Calls",
      value: "89,234",
      change: "+15%",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "$24,567",
      change: "+23%",
      icon: TrendingUp,
      color: "text-pink-600",
    },
  ];

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* <Navbar /> */}

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-8 w-8 text-purple-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor system performance and manage platform features
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700"
            >
              Admin Access
            </Badge>
          </motion.div>

          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users & Files</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-0 shadow-lg">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {stat.title}
                              </p>
                              <p className="text-2xl font-bold text-gray-900">
                                {stat.value}
                              </p>
                              <p className="text-xs text-green-600 font-medium">
                                {stat.change} from last month
                              </p>
                            </div>
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Upload Trends</CardTitle>
                      <CardDescription>
                        Monthly document uploads
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={uploadData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="uploads" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>New user registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#EC4899"
                            strokeWidth={3}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Feature Usage Distribution</CardTitle>
                    <CardDescription>
                      How users interact with different features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <AdminFileApproval />
            </TabsContent>

            <TabsContent value="features">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Feature Toggles</CardTitle>
                  <CardDescription>
                    Enable or disable platform features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(features).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === "pdfProcessing" &&
                              "Allow users to upload and process PDF documents"}
                            {key === "imageAnalysis" &&
                              "Enable OCR and image text extraction features"}
                            {key === "linkAssist" &&
                              "AI-powered link analysis and summary generation"}
                            {key === "aiSummary" &&
                              "Advanced AI summarization capabilities"}
                            {key === "exportFeature" &&
                              "Allow users to export processed data"}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={() =>
                            toggleFeature(key as keyof typeof features)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system">
              <div className="grid gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      System Status
                    </CardTitle>
                    <CardDescription>
                      Monitor system health and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                        </div>
                        <h4 className="font-medium text-gray-900">
                          API Status
                        </h4>
                        <p className="text-sm text-green-600">Operational</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                        </div>
                        <h4 className="font-medium text-gray-900">Database</h4>
                        <p className="text-sm text-green-600">Healthy</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                        </div>
                        <h4 className="font-medium text-gray-900">
                          AI Services
                        </h4>
                        <p className="text-sm text-yellow-600">Monitoring</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>System Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                          99.9%
                        </p>
                        <p className="text-sm text-gray-600">Uptime</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">45ms</p>
                        <p className="text-sm text-gray-600">Avg Response</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                          1.2TB
                        </p>
                        <p className="text-sm text-gray-600">Data Processed</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-600">Critical Errors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
