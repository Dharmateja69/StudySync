import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Save,
  Settings2,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
// Mock theme context and navbar for demonstration
const useTheme = () => {
  const [theme, setTheme] = useState("light");
  return { theme, setTheme };
};

const Settings = () => {
  const { theme, setTheme } = useTheme();

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Delete account modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const CONFIRM_DELETE_TEXT = "DELETE MY ACCOUNT";

  // Loading states
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    delete: false,
  });

  // Success/error messages
  const [messages, setMessages] = useState({
    profile: "",
    password: "",
    error: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const showMessage = (type, message) => {
    setMessages((prev) => ({ ...prev, [type]: message }));
    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [type]: "" }));
    }, 3000);
  };

  const handleProfileUpdate = async () => {
    setLoading((prev) => ({ ...prev, profile: true }));
    try {
      console.log("Updating profile with:", profile);

      const response = await api.put("/users/profile", {
        fullName: profile.name,
        avatar: profile.avatar,
      });

      console.log("Profile update response:", response.data);
      showMessage("profile", "Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      showMessage("error", "Failed to update profile. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("error", "New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showMessage("error", "Password must be at least 8 characters long!");
      return;
    }

    setLoading((prev) => ({ ...prev, password: true }));
    try {
      console.log("Sending password change request");

      const response = await api.put("/users/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      console.log("Password changed:", response.data);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showMessage("password", "Password changed successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Failed to change password."
      );
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== CONFIRM_DELETE_TEXT) {
      showMessage(
        "error",
        "Please type the confirmation text exactly as shown."
      );
      return;
    }

    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      console.log("Sending delete account request...");

      const response = await api.delete("/users/me");

      console.log("Account deleted:", response.data);

      window.location.href = "/";
    } catch (error) {
      console.error("Delete account error:", error);
      showMessage("error", "Failed to delete account. Please try again.");
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* <Navbar /> */}

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <Settings2 className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account preferences and settings
              </p>
            </div>
          </motion.div>

          {/* Error/Success Messages */}
          {messages.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p className="text-red-600 dark:text-red-400">{messages.error}</p>
            </motion.div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Profile Settings */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.profile && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <p className="text-green-600 dark:text-green-400 text-sm">
                        {messages.profile}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                      <p className="text-xs text-gray-500">
                        Email cannot be changed
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL (Optional)</Label>
                    <Input
                      id="avatar"
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={profile.avatar}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          avatar: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button
                    onClick={handleProfileUpdate}
                    disabled={loading.profile}
                    className="w-full md:w-auto"
                  >
                    {loading.profile ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Theme Settings */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the application looks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Choose your preferred theme
                      </p>
                    </div>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notification Settings */}
            {/* <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          email: checked,
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive browser notifications
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Important security notifications
                      </p>
                    </div>
                    <Switch
                      id="security-alerts"
                      checked={notifications.security}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          security: checked,
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing">Marketing Emails</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive product updates and tips
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          marketing: checked,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* Security Settings */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {messages.password && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <p className="text-green-600 dark:text-green-400 text-sm">
                        {messages.password}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="font-medium">Change Password</h4>

                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handlePasswordChange}
                      disabled={
                        loading.password ||
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        !passwordData.confirmPassword
                      }
                      className="w-full md:w-auto"
                    >
                      {loading.password ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Shield className="h-4 w-4 mr-2" />
                      )}
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400">
                        Delete Account
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <Button
                        variant="destructive"
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full md:w-auto"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                Delete Account
              </h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Warning
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delete-confirm">
                  Please type{" "}
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">
                    {CONFIRM_DELETE_TEXT}
                  </span>{" "}
                  to confirm:
                </Label>
                <Input
                  id="delete-confirm"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={CONFIRM_DELETE_TEXT}
                  className="font-mono"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={
                    loading.delete || deleteConfirmText !== CONFIRM_DELETE_TEXT
                  }
                  className="flex-1"
                >
                  {loading.delete ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Settings;
