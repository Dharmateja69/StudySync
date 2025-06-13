import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Users } from 'lucide-react';

export default function RoleSwitch() {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();

  const handleRoleChange = (newRole: string) => {
    const typedRole = newRole as 'user' | 'admin';
    setRole(typedRole);
    
    // Navigate to the corresponding dashboard
    navigate(`/dashboard/${typedRole}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Switch Role</CardTitle>
        <CardDescription>
          Switch between user and admin views
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={role}
          onValueChange={handleRoleChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user" className="relative">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>User</span>
              </div>
              {role === 'user' && (
                <motion.div
                  layoutId="activeRoleIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger value="admin" className="relative">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </div>
              {role === 'admin' && (
                <motion.div
                  layoutId="activeRoleIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button 
            variant="default" 
            onClick={() => navigate(`/dashboard/${role}`)}
            className="gap-2"
          >
            {role === 'user' ? (
              <>
                <User className="h-4 w-4" />
                <span>Go to User Dashboard</span>
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                <span>Go to Admin Dashboard</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}