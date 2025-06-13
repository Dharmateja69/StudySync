import AnalyticsCharts from "@/components/functional/AnalyticsCharts";
import LeaderboardTable from "@/components/functional/LeaderboardTable";
import RoleSwitch from "@/components/functional/RoleSwitch";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Flag,
  MessageSquare,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // Mock data for recent activity
  const recentActivity = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        image: "",
      },
      action: "uploaded a PDF",
      resource: "Machine Learning Basics",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Maria Garcia",
        image: "",
      },
      action: "analyzed an image",
      resource: "Whiteboard Diagrams",
      time: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "Raj Patel",
        image: "",
      },
      action: "referred a new user",
      resource: "Emily Chen",
      time: "5 hours ago",
    },
    {
      id: "4",
      user: {
        name: "David Kim",
        image: "",
      },
      action: "flagged content",
      resource: "Inappropriate Summary",
      time: "6 hours ago",
      flag: true,
    },
  ];

  // Mock data for top resources
  const topResources = [
    {
      id: "1",
      title: "Machine Learning Basics",
      type: "PDF",
      views: 1245,
      rating: 4.8,
    },
    {
      id: "2",
      title: "JavaScript Algorithms",
      type: "Code",
      views: 987,
      rating: 4.6,
    },
    {
      id: "3",
      title: "Statistical Analysis Methods",
      type: "PDF",
      views: 856,
      rating: 4.5,
    },
    {
      id: "4",
      title: "Database Design Principles",
      type: "PDF",
      views: 712,
      rating: 4.7,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex">
        <DashboardSidebar role="admin" />

        <div className="flex-1">
          <div className="flex-1 space-y-6 p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage users, monitor platform analytics, and review content.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Support
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Users"
                value="2,856"
                description="+180 this month"
                icon={<Users className="h-5 w-5 text-muted-foreground" />}
              />
              <StatCard
                title="Total Resources"
                value="12,543"
                description="+842 this month"
                icon={<FileText className="h-5 w-5 text-muted-foreground" />}
              />
              <StatCard
                title="Active Users"
                value="1,428"
                description="52% of total users"
                icon={<UserCircle className="h-5 w-5 text-muted-foreground" />}
              />
              <StatCard
                title="Flagged Content"
                value="7"
                description="Requires review"
                icon={<Flag className="h-5 w-5 text-destructive" />}
              />
            </div>

            <Tabs defaultValue="analytics">
              <TabsList className="mb-4">
                <TabsTrigger value="analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <FileText className="mr-2 h-4 w-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="switchRole">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Switch Role
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsCharts />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest user actions on the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <Avatar>
                              <AvatarImage src={item.user.image} />
                              <AvatarFallback>
                                {item.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium leading-none">
                                  {item.user.name} {item.action}
                                </p>
                                {item.flag && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    Flagged
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {item.resource} · {item.time}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <LeaderboardTable
                    type="contributions"
                    users={[]} // TODO: Replace with actual users data
                  />
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Resources</CardTitle>
                    <CardDescription>
                      Most viewed and highest rated content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topResources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-4"
                        >
                          <div className="rounded-lg bg-muted p-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium leading-none">
                              {resource.title}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <p className="text-sm text-muted-foreground">
                                {resource.views.toLocaleString()} views ·{" "}
                                {resource.rating} rating
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="switchRole">
                <RoleSwitch />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
