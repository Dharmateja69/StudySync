import { ImageSwiper } from "@/components/image-swiper";

import { FloatingShapes } from "@/components/FloatingShapes";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Code,
  FileText,
  Globe,
  Image,
  Info,
  Lightbulb,
  Link,
  LogIn,
  Rocket,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UploadCloud,
  UserPlus,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// Typewriter component
const TypewriterText = ({
  phrases,
  delay = 0,
  speed = 100,
  loop = true,
  cursor = "|",
  cursorClassName = "animate-pulse",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    let i = 0;
    const currentPhrase = phrases[currentPhraseIndex];

    if (isTyping) {
      const timer = setInterval(() => {
        if (i < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setTimeout(() => setIsTyping(false), 1500);
        }
      }, speed);

      return () => clearInterval(timer);
    } else {
      const timer = setInterval(() => {
        if (i > 0) {
          setDisplayText(currentPhrase.slice(0, i - 1));
          i--;
        } else {
          clearInterval(timer);
          setCurrentPhraseIndex((prev) =>
            loop
              ? (prev + 1) % phrases.length
              : Math.min(prev + 1, phrases.length - 1)
          );
          setIsTyping(true);
        }
      }, speed / 2);

      return () => clearInterval(timer);
    }
  }, [phrases, speed, startTyping, isTyping, currentPhraseIndex, loop]);

  return (
    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      {displayText}
      <span className={cursorClassName}>{cursor}</span>
    </span>
  );
};
const professionalPhrases = [
  "Transform Learning",
  "Access PDFs Instantly",
  "Share Your Notes",

  "Boost Productivity",
  "AI-Powered Learning",
];
const Writer = ({ text, delay = 0, speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, startTyping]);
  return (
    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
const Index = () => {
  const imageUrls =
    "https://img.freepik.com/premium-photo/3d-cartoon_975306-1.jpg?w=2000,https://img.freepik.com/premium-photo/3d-cartoon-boy-avatar_113255-5540.jpg,https://th.bing.com/th/id/OIP.OmBLyKbo8iixJ2SeS12xxwHaE7?w=626&h=417&rs=1&pid=ImgDetMain,https://thumbs.dreamstime.com/b/animated-academic-cheerful-cartoon-scholar-301088562.jpg,https://img.freepik.com/premium-psd/3d-cute-young-business-man-character-generative-ai_43614-1027.jpg,https://img.freepik.com/premium-photo/arafed-cartoon-man-suit-tie-standing-with-his-hands-his-hips_988987-15581.jpg";

  const features = [
    {
      icon: FileText,
      title: "PDF Processing",
      description: "Upload and analyze PDF documents with AI-powered insights",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Image,
      title: "Image Analysis",
      description: "Extract text and meaning from images using advanced OCR",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Link,
      title: "Link Assistant",
      description: "Paste any link and get AI-generated helpful information",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Compete with others and climb the ranks",
      color: "from-orange-500 to-red-500",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process documents in seconds",
    },
    {
      icon: Brain,
      title: "AI Powered",
      description: "Integrated AI for smarter learning",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Your data is always protected",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content:
        "StudySync has revolutionized how I study. The AI insights help me understand complex topics faster.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Educator",
      content:
        "The PDF analysis feature saves me hours every week. Best tool for educational content.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Researcher",
      content:
        "Outstanding OCR capabilities and the link assistant is a game-changer for my research workflow.",
      avatar: "ER",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Students Helped" },
    { number: "100+", label: "Documents Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Learning Support" },
  ];

  const aboutUs = [
    {
      icon: Globe,
      title: "Global Learning",
      description:
        "Serving students across 50+ countries with our AI-powered learning platform",
    },
    {
      icon: Code,
      title: "Advanced AI Technology",
      description:
        "Built with the latest AI models and modern learning methodologies",
    },
    {
      icon: Lightbulb,
      title: "Learning Innovation",
      description: "Constantly pushing the boundaries of AI-powered education",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* <SplashCursor />Fp */}
      <FloatingShapes />
      <Navbar />

      {/* Hero Section with Enhanced Animations */}
      <section className="relative pt-20 pb-16 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {" "}
            {/* Changed to flex column and centered */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-3xl" // Added max width and full width
            >
              {/* AI-Powered Learning Platform Badge - Coming from top */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  AI-Powered Learning Platform
                </span>
              </motion.div>

              {/* Main Title with Typewriter Effect */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 dark:from-white dark:via-purple-200 dark:to-violet-200 bg-clip-text text-transparent"
              >
                With StudySync
                <br />
                <TypewriterText
                  phrases={professionalPhrases}
                  delay={1500}
                  speed={100}
                  loop={true}
                  cursor="|"
                  cursorClassName="text-pink-500 animate-blink"
                />
              </motion.h1>

              {/* Description Text - Directly visible in center */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed pl-8"
              >
                <span className="absolute left-0 top-0 text-5xl font-serif text-purple-400 dark:text-purple-300 leading-none">
                  "
                </span>
                <p className="pt-4">
                  Upload PDFs, analyze images, process links, and unlock
                  learning insights with our advanced AI assistant.
                </p>
                <p className="font-medium text-purple-500 dark:text-purple-400">
                  Join thousands of students accelerating their education.
                </p>
              </motion.div>
              {/* Buttons with directional animations */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Start Learning Free Button - Coming from left */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <RouterLink to="/login">
                      Start Learning Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouterLink>
                  </Button>
                </motion.div>

                {/* Learn More Button - Coming from right */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-2 border-purple-200 hover:border-purple-300 dark:border-purple-700 dark:hover:border-purple-600 px-8 py-6 rounded-xl"
                  >
                    <RouterLink to="/about">Learn More</RouterLink>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Enhanced 3D Model */}
      <section className="py-16 px-4 sm:px-6 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Powerful Learning{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Features
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
            >
              <Writer
                text="Everything you need to transform your study workflow"
                delay={1500}
                speed={100}
              />
            </motion.p>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Features Cards - Left Side */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="w-full lg:w-1/2"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <CardHeader className="text-center pb-2">
                        <div
                          className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Swiper - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 h-full flex items-center justify-center"
            >
              <ImageSwiper images={imageUrls} />
            </motion.div>
          </div>
        </div>
      </section>
      {/* About StudySync Section with Enhanced 3D Model */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left-aligned text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Revolutionizing Learning With{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI-Powered Tools
                  </span>
                </h2>

                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  <p className="text-lg leading-relaxed">
                    StudySync harnesses cutting-edge AI to transform how
                    students learn. Our platform instantly summarizes PDFs,
                    explains complex concepts, and even helps you code - making
                    study sessions more productive than ever.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                      <p>AI-powered document processing for faster learning</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-3 h-3 rounded-full bg-pink-500 flex-shrink-0"></div>
                      <p>
                        Interactive coding environment with real-time feedback
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <p>Community-driven knowledge sharing platform</p>
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed">
                    We're building a community where top performers can share
                    resources and mentor others, creating a powerful network of
                    collaborative learning.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right-aligned visual elements */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {aboutUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Maximize Your Learning With{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StudySync
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              Follow these simple steps to unlock the full potential of our
              AI-powered learning platform
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transform -translate-x-1/2"></div>

            {/* Steps */}
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      1. Create Your Account
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sign up to access all features.{" "}
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      Pro Tip:
                    </span>{" "}
                    Apply a referral code during registration to earn bonus
                    points that can be redeemed for premium features.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                  <LogIn className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      2. Access Your Dashboard
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    After logging in, you'll land on your personalized dashboard
                    where you can manage all your learning resources and AI
                    tools.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                  <UploadCloud className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      3. Share Your Resources
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Upload your study notes as PDFs (max 4MB). Remember:{" "}
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      Quality matters!
                    </span>{" "}
                    Your genuine, well-prepared documents help other students
                    immensely.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                    <Info className="h-4 w-4" />
                    <span>
                      Documents will be reviewed before appearing publicly
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      4. Approval Process
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your uploaded documents will initially show as{" "}
                    <span className="font-medium">"Pending"</span>. Our admin
                    team or verified mentors will review them for quality and
                    relevance before approval.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      5. Access AI Tools
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Use our powerful AI tools for:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 bg-purple-50/50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">PDF Summarization</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get concise summaries of lengthy documents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-purple-50/50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <Link className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Link Analysis</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Extract key information from web resources
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-purple-50/50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <Image className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Image Processing</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Extract text and insights from images
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-purple-50/50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <Code className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Code Assistance</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get explanations and optimizations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      6. Boost Your Productivity
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simply click "Generate" on any tool to get instant,
                    AI-powered insights. The more you use StudySync, the more
                    you'll discover how it can transform your learning workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StudySync?
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                What Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Users Say
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of satisfied learners worldwide
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students using StudySync to accelerate their
              education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 rounded-xl font-semibold"
              >
                <RouterLink to="/login">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouterLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl"
              >
                <RouterLink to="/pricing">View Pricing</RouterLink>
              </Button>
            </div>
          </motion.section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
