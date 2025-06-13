import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  UploadCloud, 
  Share2, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  Medal 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  uploads: number;
  referrals: number;
  contributions: number;
  points: number;
  rank: number;
  topContributor: boolean;
  institution?: string;
}

interface LeaderboardTableProps {
  users: User[];
  type?: 'uploads' | 'referrals' | 'contributions';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatarUrl: '',
    uploads: 56,
    referrals: 12,
    contributions: 84,
    points: 860,
    rank: 1,
    topContributor: true,
    institution: 'Stanford University'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatarUrl: '',
    uploads: 42,
    referrals: 23,
    contributions: 68,
    points: 784,
    rank: 2,
    topContributor: true,
    institution: 'MIT'
  },
  {
    id: '3',
    name: 'Raj Patel',
    avatarUrl: '',
    uploads: 38,
    referrals: 8,
    contributions: 62,
    points: 701,
    rank: 3,
    topContributor: true,
    institution: 'Harvard University'
  },
  {
    id: '4',
    name: 'Emily Chen',
    avatarUrl: '',
    uploads: 31,
    referrals: 6,
    contributions: 45,
    points: 598,
    rank: 4,
    topContributor: false,
    institution: 'UC Berkeley'
  },
  {
    id: '5',
    name: 'David Kim',
    avatarUrl: '',
    uploads: 25,
    referrals: 10,
    contributions: 42,
    points: 512,
    rank: 5,
    topContributor: false,
    institution: 'NYU'
  },
  {
    id: '6',
    name: 'Sophia Martinez',
    avatarUrl: '',
    uploads: 22,
    referrals: 4,
    contributions: 38,
    points: 468,
    rank: 6,
    topContributor: false,
    institution: 'University of Michigan'
  },
  {
    id: '7',
    name: 'James Wilson',
    avatarUrl: '',
    uploads: 18,
    referrals: 7,
    contributions: 32,
    points: 422,
    rank: 7,
    topContributor: false
  },
  {
    id: '8',
    name: 'Aisha Mohammed',
    avatarUrl: '',
    uploads: 16,
    referrals: 9,
    contributions: 29,
    points: 396,
    rank: 8,
    topContributor: false,
    institution: 'Georgia Tech'
  },
];

export default function LeaderboardTable({ 
  users = mockUsers, 
  type = 'contributions' 
}: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Award className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-sm font-medium">{rank}</span>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'uploads':
        return <UploadCloud className="h-4 w-4" />;
      case 'referrals':
        return <Share2 className="h-4 w-4" />;
      case 'contributions':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  // Sort users based on the selected type
  const sortedUsers = [...users].sort((a, b) => {
    if (type === 'uploads') return b.uploads - a.uploads;
    if (type === 'referrals') return b.referrals - a.referrals;
    return b.points - a.points;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>
          Top contributors in the StudySync community
        </CardDescription>
        <Tabs defaultValue={type} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contributions">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contributions
            </TabsTrigger>
            <TabsTrigger value="uploads">
              <UploadCloud className="mr-2 h-4 w-4" />
              Uploads
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <Share2 className="mr-2 h-4 w-4" />
              Referrals
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">
                {type === 'uploads' && 'Uploads'}
                {type === 'referrals' && 'Referrals'}
                {type === 'contributions' && 'Points'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <TableCell className="w-12">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full">
                    {getRankIcon(user.rank)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.name}</span>
                        {user.topContributor && (
                          <Badge variant="outline" className="h-5 text-xs">Top 1%</Badge>
                        )}
                      </div>
                      {user.institution && (
                        <span className="text-xs text-muted-foreground">
                          {user.institution}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {getActivityIcon(type)}
                    <span className="font-medium">
                      {type === 'uploads' && user.uploads}
                      {type === 'referrals' && user.referrals}
                      {type === 'contributions' && user.points}
                    </span>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}