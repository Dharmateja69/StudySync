import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { EnhancedReferral } from "@/components/dashboard/EnhancedReferral";
import { LeaderboardTable } from "@/components/dashboard/LeaderboardTable";
import { MyUploads } from "@/components/dashboard/MyUploads";
import { UploadResource } from "@/components/dashboard/UploadResource";

import { ImageToolsTab } from "@/components/tools/ImageToolsTab";
import { LinkAssistTab } from "@/components/tools/LinkAssistTab";
import { PDFToolsTab } from "@/components/tools/PDFToolsTab";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { motion } from "framer-motion";

import { Code, FolderOpen, Image, Link, Trophy, Upload } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchProfile();
  }, []);
  // console.table(user);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <DashboardSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your AI-powered document tools
                  </p>
                </div>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabsList className="grid w-full grid-cols-7 mb-8 bg-white dark:bg-gray-800 shadow-sm">
                  <TabsTrigger
                    value="upload"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger
                    value="my-uploads"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <FolderOpen className="h-4 w-4" />
                    My Uploads
                  </TabsTrigger>
                  <TabsTrigger
                    value="pdf"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <span className="text-sm font-medium">PDF Tools</span>
                    <span className="text-[10px] font-semibold text-white px-1 py-0.5 rounded bg-violet-100 dark:bg-violet-900">
                      AI
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="image"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <Image className="h-4 w-4" />
                    <span className="text-sm font-medium">Image</span>
                    <span className="text-[10px] font-semibold text-white px-1 py-0.5 rounded bg-violet-100 dark:bg-violet-900">
                      AI
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="link"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <Link className="h-4 w-4" />
                    <span className="text-sm font-medium">Link Assist</span>
                    <span className="text-[10px] font-semibold text-white px-1 py-0.5 rounded bg-violet-100 dark:bg-violet-900">
                      AI
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="refer"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <Code className="h-4 w-4" />
                    Refer & Earn
                  </TabsTrigger>
                  <TabsTrigger
                    value="leaderboard"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900"
                  >
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TabsContent value="pdf">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PDFToolsTab user={user} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="image">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageToolsTab user={user} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="link">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LinkAssistTab user={user} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="upload">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UploadResource user={user} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="my-uploads">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MyUploads user={user} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="refer">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EnhancedReferral user={user} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="leaderboard">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LeaderboardTable />
                  </motion.div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
