import { motion } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Crown,
  Medal,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";

interface LeaderboardEntry {
  id: string;
  fullName: string;
  avatar: string;
  totalPoints: number;
  uploadCount: number;
  referralCount: number;
  rank: number;
  badge: string;
  streak: number;
}

export function LeaderboardTable() {
  const [topThree, setTopThree] = useState<LeaderboardEntry[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"points" | "uploads" | "referrals">(
    "points"
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 10;

  // Fetch Top 3
  useEffect(() => {
    const fetchTopThree = async () => {
      try {
        const res = await api.get("/leaderboard/top-three");
        // console.log(res.data);
        setTopThree(res.data.data?.topThree || []);
      } catch (err: any) {
        console.error("Failed to fetch top 3:", err);
        setError("Failed to load top performers");
      }
    };
    fetchTopThree();
  }, []);

  // Fetch Paginated Leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await api.get("/leaderboard", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            sortBy,
          },
        });

        const entries = res.data.data?.entries || [];
        // console.log(entries);

        setLeaderboardData(entries);
        setTotalPages(res.data.data?.pagination?.totalPages || 1);
        setTotalEntries(
          res.data.data?.pagination?.totalEntries || entries.length
        );

        setError("");
      } catch (err: any) {
        console.error("Failed to fetch leaderboard:", err);
        setError("Failed to fetch leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentPage, sortBy]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Diamond":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white";
      case "Platinum":
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case "Gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case "Silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case "Bronze":
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name?: string) => {
    if (!name || typeof name !== "string") return "NA"; // fallback initials
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Performers
          </CardTitle>
          <CardDescription>This month's leading contributors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThree.map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-6 rounded-lg border-2 ${
                  index === 0
                    ? "border-yellow-300 bg-yellow-50"
                    : index === 1
                    ? "border-gray-300 bg-gray-50"
                    : "border-amber-300 bg-amber-50"
                }`}
              >
                <div className="relative mb-4">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>
                      {getInitials(entry.user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(entry.rank)}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {entry.user?.fullName}
                </h3>
                <div className="space-y-2">
                  <Badge className={getBadgeColor(entry.badge)}>
                    {entry.badge}
                  </Badge>
                  <p className="text-2xl font-bold text-gray-900">
                    {entry.stats?.totalPoints}
                  </p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Full Leaderboard</CardTitle>
              <CardDescription>
                Complete ranking of all participants
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {(["points", "uploads", "referrals"] as const).map((type) => (
                <Button
                  key={type}
                  variant={sortBy === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCurrentPage(1); // Reset to first page when sort changes
                    setSortBy(type);
                  }}
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                  <TableHead className="text-center">Uploads</TableHead>
                  <TableHead className="text-center">Referrals</TableHead>
                  <TableHead className="text-center">Badge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry, index) => (
                  <motion.tr
                    key={entry.user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-black transition-colors"
                  >
                    <TableCell className="text-center">
                      {getRankIcon(entry.rank)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={entry.avatar} />
                          <AvatarFallback>
                            {getInitials(entry.user?.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {entry.user?.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {entry.stats?.totalPoints}
                    </TableCell>
                    <TableCell className="text-center">
                      {entry.stats?.uploadCount}
                    </TableCell>
                    <TableCell className="text-center">
                      {entry.stats?.referralCount}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={getBadgeColor(entry.badge)}
                        variant="secondary"
                      >
                        {entry.badge}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
              {totalEntries} entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
