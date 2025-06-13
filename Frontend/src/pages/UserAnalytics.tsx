
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, FileText, Image, Link, Calendar, Download, Trophy, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const UserAnalytics = () => {
  // Sample analytics data
  const usageData = [
    { month: 'Jan', pdfs: 45, images: 30, links: 25 },
    { month: 'Feb', pdfs: 52, images: 38, links: 31 },
    { month: 'Mar', pdfs: 61, images: 42, links: 38 },
    { month: 'Apr', pdfs: 58, images: 45, links: 42 },
    { month: 'May', pdfs: 67, images: 48, links: 45 },
    { month: 'Jun', pdfs: 74, images: 52, links: 48 }
  ];

  const dailyActivity = [
    { day: 'Mon', uploads: 12 },
    { day: 'Tue', uploads: 19 },
    { day: 'Wed', uploads: 15 },
    { day: 'Thu', uploads: 22 },
    { day: 'Fri', uploads: 28 },
    { day: 'Sat', uploads: 8 },
    { day: 'Sun', uploads: 5 }
  ];

  const documentTypes = [
    { name: 'PDFs', value: 45, color: '#8B5CF6' },
    { name: 'Images', value: 30, color: '#EC4899' },
    { name: 'Links', value: 25, color: '#06B6D4' }
  ];

  const stats = [
    {
      title: "Total Documents",
      value: "267",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Processing Time",
      value: "2.4s",
      change: "-15%",
      icon: Zap,
      color: "text-green-600"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Rank Position",
      value: "#42",
      change: "+8",
      icon: Trophy,
      color: "text-orange-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Track your document processing activity and performance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                          <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Usage Trend */}
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Monthly Usage Trends</CardTitle>
                    <CardDescription>Document processing over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="pdfs" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                        <Area type="monotone" dataKey="images" stackId="1" stroke="#EC4899" fill="#EC4899" />
                        <Area type="monotone" dataKey="links" stackId="1" stroke="#06B6D4" fill="#06B6D4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Daily Activity */}
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>Daily upload patterns this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dailyActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uploads" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Document Type Distribution */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Document Type Distribution</CardTitle>
                  <CardDescription>Breakdown of processed content by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={documentTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {documentTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                      {documentTypes.map((type, index) => (
                        <div key={type.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }}></div>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{type.name}</span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{type.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest document processing activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "PDF", title: "Annual Report 2024", time: "2 hours ago", status: "Completed" },
                      { type: "Image", title: "Invoice Scan", time: "4 hours ago", status: "Completed" },
                      { type: "Link", title: "Research Article", time: "1 day ago", status: "Completed" },
                      { type: "PDF", title: "Contract Document", time: "2 days ago", status: "Completed" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            {activity.type === "PDF" && <FileText className="h-5 w-5 text-white" />}
                            {activity.type === "Image" && <Image className="h-5 w-5 text-white" />}
                            {activity.type === "Link" && <Link className="h-5 w-5 text-white" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
