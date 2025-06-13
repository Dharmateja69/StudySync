import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useReferralStore } from "@/stores/referralStore";
import { Copy, DollarSign, Gift, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

export function EnhancedReferral({ user }) {
  const { referralCode, credits, referrals, generateReferralCode, setCredits } =
    useReferralStore();
  const [formData, setFormData] = useState({ referralCode: "" });

  const handleReferralCheck = async () => {
    const code = formData.referralCode.trim();
    if (!code) return;

    try {
      const response = await api.post(`/referrals/use`, { referralCode: code });

      toast({
        title: "Referral Applied!",
        description: "You've received bonus credits.",
      });

      setFormData({ referralCode: "" });
    } catch (error) {
      toast({
        title: "⛔ Invalid referral code",
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!referralCode) {
      generateReferralCode();
    }
    // Mock credits for demo - this would come from backend
    setCredits(150);
  }, [referralCode, generateReferralCode, setCredits]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=Join%20DocuMind%20with%20my%20referral%20code:%20${referralCode}`,
      color: "bg-green-500",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=Join%20DocuMind%20with%20my%20referral%20code:%20${referralCode}`,
      color: "bg-blue-500",
    },
    {
      name: "Facebook",
      url: `https://facebook.com/sharer/sharer.php?u=https://documind.app?ref=${referralCode}`,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Credits
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {user.totalCredits}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Successful Referrals
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {user.referralCount}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pending Referrals
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {referrals.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Your Referral Code
          </CardTitle>
          <CardDescription>
            Share your unique code and earn credits for every successful
            referral
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={user.referralCode}
              readOnly
              className="font-mono text-lg text-center bg-gray-50 dark:bg-gray-800"
            />
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Share on Social Media</h4>
            <div className="flex gap-2">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(option.url, "_blank")}
                  className="flex-1"
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Referrals Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Share Your Code</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your unique referral code with friends and classmates
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">They Join</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When someone signs up using your code, they get bonus credits
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Earn Credits</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You earn 50 credits for each successful referral
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Apply Referral Code
          </CardTitle>
          <CardDescription>
            Already referred by a friend? Enter their code below to receive
            bonus credits.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-3">
          <Input
            placeholder="Enter referral code"
            value={formData.referralCode}
            onChange={(e) =>
              setFormData({ ...formData, referralCode: e.target.value })
            }
            className="md:flex-1"
          />
          <Button
            onClick={handleReferralCheck}
            disabled={!formData.referralCode.trim()}
          >
            Apply
          </Button>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      {referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.slice(0, 5).map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{referral.referredUser}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {referral.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        referral.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {referral.status}
                    </Badge>
                    <span className="text-green-600 font-medium">
                      +{referral.creditsEarned} credits
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
