import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Code,
  FileText,
  Image,
  Link as LinkIcon,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  role: "user" | "admin";
}

export default function DashboardSidebar({ role }: SidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userItems = [
    {
      title: "Overview",
      href: "/dashboard/user",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      title: "Search Resources",
      href: "/dashboard/user/search-resources",
      icon: <Search className="h-4 w-4" />,
    },
    {
      title: "Upload PDF",
      href: "/dashboard/user/pdf",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Image Analysis",
      href: "/dashboard/user/image",
      icon: <Image className="h-4 w-4" />,
    },
    {
      title: "Link Assistant",
      href: "/dashboard/user/link",
      icon: <LinkIcon className="h-4 w-4" />,
    },
    {
      title: "Code Reference",
      href: "/dashboard/user/code",
      icon: <Code className="h-4 w-4" />,
    },
    {
      title: "AI Chat",
      href: "/dashboard/user/chat",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/dashboard/user/profile",
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/user/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const adminItems = [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Resources",
      href: "/dashboard/admin/resources",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const items = role === "admin" ? adminItems : userItems;

  const SidebarContent = () => (
    <>
      <div className="flex h-14 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              className="h-4 w-4 text-primary-foreground"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="font-bold">StudySync</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="grid gap-2">
          {items.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "flex h-10 items-center justify-start gap-3 px-4 text-sm font-medium",
                location.pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              asChild
              onClick={() => setMobileOpen(false)}
            >
              <Link to={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-64 border-r lg:block">
        <div className="flex h-full flex-col">
          <SidebarContent />
        </div>
      </aside>

      <div className="flex h-14 items-center border-b px-4 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              className="h-4 w-4 text-primary-foreground"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="font-bold">StudySync</span>
        </Link>
      </div>
    </>
  );
}
