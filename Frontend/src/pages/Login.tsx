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
import { Separator } from "@/components/ui/separator";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@/hooks/useGSAP";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Brain, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    referralCode: "",
  });
  const { setRole } = useRole();
  const navigate = useNavigate();
  const { fadeIn, slideIn } = useGSAP();
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    if (cardRef.current) {
      fadeIn(cardRef.current, 0.2);
    }
    if (logoRef.current) {
      slideIn(logoRef.current, "down", 0);
    }
  }, []);

  // assuming you set withCredentials: true globally

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // === LOGIN FLOW ===
        const response = await api.post(
          "/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true } // ✅ Ensure JWT cookie is accepted
        );

        console.log("Login success:", response.data);
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully!",
        });

        setRole(formData.email.includes("admin") ? "admin" : "user");
        navigate("/dash/u");
      } else {
        // === SIGNUP FLOW ===
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        // Signup API
        const signupRes = await api.post(
          "/auth/signup",
          {
            email: formData.email,
            password: formData.password,
            fullName: formData.name,
            referralCode: formData.referralCode.trim(),
          },
          { withCredentials: true } // ✅ Accept JWT cookie
        );

        console.log("Signup success:", signupRes.data);
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully!",
        });

        // Generate referral code after signup
        const referralRes = await api.get("/referrals/generate", {
          withCredentials: true, // ✅ Send cookie with request
        });

        console.log("Referral code:", referralRes.data);
        setRole("user");
        navigate("/dash/u");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive", // red toast
      });

      // alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handlegooglesignup = () => {
    console.log("Google signup initiated");
    window.location.href =
      "https://studysync-backend-9obr.onrender.com//api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div ref={logoRef} className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              StudySync
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {isLogin ? "Welcome back" : "Join StudySync"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin
              ? "Log in to your account"
              : "Create your learning account"}
          </p>
        </div>

        <Card ref={cardRef} className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{isLogin ? "Login In" : "Sign Up"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your account"
                : "Create a new account to start learning"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required={!isLogin}
                  />
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  ></motion.div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
              {/* Google Sign-In */}
              {!isLogin && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handlegooglesignup()}
                >
                  <FcGoogle className="h-5 w-5" />
                  Continue with Google
                </Button>
              )}
            </form>

            <div className="text-center">
              <Separator className="my-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Demo: Use any email ending with "admin" to get admin access</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
