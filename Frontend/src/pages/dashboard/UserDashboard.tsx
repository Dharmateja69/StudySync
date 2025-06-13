import CodeRefPanel from "@/components/functional/CodeRefPanel";
import ImageUploader from "@/components/functional/ImageUploader";
import LinkAssist from "@/components/functional/LinkAssist";
import PDFUploader from "@/components/functional/PDFUploader";
import SummaryViewer from "@/components/functional/SummaryViewer";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  UserCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [user, setUser] = useState(null); // User info after verification
  const navigate = useNavigate();

  const mockSummary = `
  # Introduction to Machine Learning
  
  Machine learning is a subfield of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. Unlike traditional programming, where explicit instructions are given to solve a problem, machine learning algorithms build a model based on sample data, known as training data, to make predictions or decisions without being explicitly programmed to do so.
  
  ## Key Concepts
  
  1. **Supervised Learning**: The algorithm is trained on labeled data, learning to map inputs to known outputs.
  2. **Unsupervised Learning**: The algorithm works with unlabeled data, finding patterns or groupings on its own.
  3. **Reinforcement Learning**: The algorithm learns by interacting with an environment and receiving feedback in the form of rewards or penalties.
  
  ## Applications
  
  Machine learning has numerous applications across various industries:
  
  - Healthcare: Disease diagnosis, personalized treatment plans
  - Finance: Fraud detection, algorithmic trading
  - Transportation: Autonomous vehicles, traffic prediction
  - Marketing: Customer segmentation, recommendation systems
  
  As computational power increases and more data becomes available, machine learning techniques continue to evolve, opening up new possibilities for solving complex problems.
  `.trim();

  const recentUploads = [
    {
      id: "1",
      title: "Machine Learning Basics",
      type: "pdf",
      date: "2023-07-15",
      size: "2.3 MB",
    },
    {
      id: "2",
      title: "Quantum Computing Lecture Notes",
      type: "pdf",
      date: "2023-07-10",
      size: "1.8 MB",
    },
    {
      id: "3",
      title: "Whiteboard Session",
      type: "image",
      date: "2023-07-05",
      size: "0.7 MB",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex">
        <DashboardSidebar role="user" />

        <div className="flex-1">
          <div className="flex-1 space-y-6 p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, Alex! Here's an overview of your learning
                  activities.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link to="/settings">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Support
                </Button>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="pdf">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF Upload
                </TabsTrigger>
                <TabsTrigger value="image">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Image Analysis
                </TabsTrigger>
                <TabsTrigger value="link">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Link Assistant
                </TabsTrigger>
                <TabsTrigger value="code">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Code Reference
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Uploads"
                    value="42"
                    description="+8 from last week"
                    icon={
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatCard
                    title="Summaries Generated"
                    value="128"
                    description="+21 from last week"
                    icon={
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatCard
                    title="Leaderboard Rank"
                    value="#12"
                    description="Top 5% of users"
                    icon={<Users className="h-5 w-5 text-muted-foreground" />}
                  />
                  <StatCard
                    title="Points Earned"
                    value="860"
                    description="+120 from last week"
                    icon={
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Uploads</CardTitle>
                      <CardDescription>
                        Your most recent resources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentUploads.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <div className="rounded-lg bg-muted p-2">
                              {item.type === "pdf" ? (
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="font-medium leading-none">
                                {item.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.date} · {item.size}
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Profile</CardTitle>
                      <CardDescription>
                        Account and contribution stats
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-lg">
                            AJ
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-lg">Alex Johnson</p>
                          <p className="text-sm text-muted-foreground">
                            Stanford University
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">Student</Badge>
                            <Badge variant="outline" className="bg-primary/10">
                              Top Contributor
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">42</p>
                          <p className="text-xs text-muted-foreground">
                            Uploads
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-xs text-muted-foreground">
                            Referrals
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">860</p>
                          <p className="text-xs text-muted-foreground">
                            Points
                          </p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/leaderboard">View Leaderboard</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <SummaryViewer
                  title="Last Generated Summary"
                  content={mockSummary}
                />
              </TabsContent>

              <TabsContent value="pdf" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
                    <PDFUploader />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Summary Output
                    </h2>
                    <SummaryViewer
                      title="Machine Learning Basics"
                      content={mockSummary}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                    <ImageUploader />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Extracted Text
                    </h2>
                    <SummaryViewer
                      title="Whiteboard Session"
                      content={mockSummary}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="link" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Link Assistant
                    </h2>
                    <LinkAssist />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Generated Summary
                    </h2>
                    <SummaryViewer
                      title="From Web Article"
                      content={mockSummary}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Code Reference</h2>
                  <CodeRefPanel />
                </div>
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
