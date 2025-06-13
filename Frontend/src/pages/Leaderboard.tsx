import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Medal, Trophy, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import LeaderboardTable from '@/components/functional/LeaderboardTable';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('allTime');
  const [institution, setInstitution] = useState('all');

  const topUsers = [
    {
      rank: 1,
      name: 'Alex Johnson',
      avatarUrl: '',
      institution: 'Stanford University',
      points: 860,
      badges: ['Top Contributor', 'PDF Master', 'AI Whiz'],
    },
    {
      rank: 2,
      name: 'Maria Garcia',
      avatarUrl: '',
      institution: 'MIT',
      points: 784,
      badges: ['Top Contributor', 'Code Expert'],
    },
    {
      rank: 3,
      name: 'Raj Patel',
      avatarUrl: '',
      institution: 'Harvard University',
      points: 701,
      badges: ['Image Analysis Pro'],
    },
  ];

  return (
    <Layout>
      <div className="container py-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-primary/10 p-3"
          >
            <Trophy className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Leaderboard
          </motion.h1>
          <motion.p
            className="max-w-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover top contributors and track your position in the StudySync community
          </motion.p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {topUsers.map((user, index) => (
            <TopUserCard key={index} user={user} delay={index * 0.1} />
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Global Rankings</CardTitle>
                <CardDescription>
                  Compare performance across all users
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allTime">All Time</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={institution} onValueChange={setInstitution}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Institutions</SelectItem>
                    <SelectItem value="stanford">Stanford University</SelectItem>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                    <SelectItem value="berkeley">UC Berkeley</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contributions">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="contributions">Total Points</TabsTrigger>
                <TabsTrigger value="uploads">Uploads</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contributions">
                <LeaderboardTable type="contributions" />
              </TabsContent>
              
              <TabsContent value="uploads">
                <LeaderboardTable type="uploads" />
              </TabsContent>
              
              <TabsContent value="referrals">
                <LeaderboardTable type="referrals" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            <Users className="mr-2 h-4 w-4" />
            Find Your Rank
          </Button>
        </div>
      </div>
    </Layout>
  );
}

interface TopUserCardProps {
  user: {
    rank: number;
    name: string;
    avatarUrl: string;
    institution: string;
    points: number;
    badges: string[];
  };
  delay: number;
}

function TopUserCard({ user, delay }: TopUserCardProps) {
  const rankBgColor = 
    user.rank === 1 ? 'bg-yellow-500' :
    user.rank === 2 ? 'bg-gray-400' :
    'bg-amber-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + delay }}
    >
      <Card className="overflow-hidden">
        <div className={`h-2 w-full ${rankBgColor}`} />
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${rankBgColor} text-white font-bold`}>
                {user.rank}
              </div>
              <Avatar className="h-14 w-14">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{user.points}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.institution}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {user.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}