import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import {
  Code,
  FileText,
  FolderOpen,
  Image,
  Link,
  LogOut,
  Search,
  Settings,
  Trophy,
  Upload,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const userMenuItems = [
  {
    title: "Upload",
    value: "upload",
    icon: Upload,
  },
  {
    title: "My Uploads",
    value: "my-uploads",
    icon: FolderOpen,
  },
  {
    title: "PDF Tools",
    value: "pdf",
    icon: FileText,
  },
  {
    title: "Image Tools",
    value: "image",
    icon: Image,
  },
  {
    title: "Link Assist",
    value: "link",
    icon: Link,
  },
  {
    title: "Refer Code",
    value: "refer",
    icon: Code,
  },
  {
    title: "Leaderboard",
    value: "leaderboard",
    icon: Trophy,
  },
];

const utilityMenuItems = [
  {
    title: "Search Resources",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar({
  user,
  activeTab,
  setActiveTab,
}: {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setTimeout(() => {
        toast({
          title: "Logging out...",
          description: "Please wait while we log you out.",
          duration: 2000,
        });
      }, 100);

      await api.post("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            StudySync
          </span>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs font-semibold mb-3">
            Dashboard Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors ${
                        activeTab === item.value
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab(item.value)}
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs font-semibold mb-3">
            Utilities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityMenuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (userMenuItems.length + index) * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors`}
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 p-3 rounded-lg"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <User className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {user?.fullName ?? "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    Points: {user?.totalCredits ?? 0}
                  </p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg w-full"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
