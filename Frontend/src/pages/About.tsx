import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Users, Zap, Award, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const About = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former AI researcher at Google with 10+ years in machine learning",
      avatar: "/placeholder.svg",
      skills: ["AI Strategy", "Product Vision", "Leadership"],
    },
    {
      name: "Alex Rodriguez",
      role: "CTO & Co-founder",
      bio: "Ex-Tesla engineer specializing in scalable AI systems",
      avatar: "/placeholder.svg",
      skills: ["System Architecture", "AI Engineering", "Scaling"],
    },
    {
      name: "Emily Davis",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from MIT, published researcher in NLP",
      avatar: "/placeholder.svg",
      skills: ["Research", "NLP", "Machine Learning"],
    },
    {
      name: "Mike Johnson",
      role: "Head of Design",
      bio: "Design leader from Airbnb with focus on AI-human interfaces",
      avatar: "/placeholder.svg",
      skills: ["UX Design", "AI Interfaces", "User Research"],
    },
  ];

  const values = [
    {
      icon: Brain,
      title: "AI-First Innovation",
      description:
        "We believe AI should augment human intelligence, not replace it. Every feature is designed to make you more productive and insightful.",
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description:
        "Our users are at the heart of everything we do. We build tools that are powerful yet intuitive, complex yet simple to use.",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description:
        "Time is precious. We're obsessed with making document processing faster, more accurate, and more efficient than ever before.",
    },
    {
      icon: Globe,
      title: "Accessible Technology",
      description:
        "Advanced AI shouldn't be limited to big corporations. We're democratizing access to enterprise-grade document intelligence.",
    },
  ];

  const stats = [
    { label: "Documents Processed", value: "2M+", icon: "📄" },
    { label: "Happy Users", value: "50K+", icon: "😊" },
    { label: "Countries Served", value: "120+", icon: "🌍" },
    { label: "AI Accuracy", value: "99.7%", icon: "🎯" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Revolutionizing Document Intelligence with
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                AI
              </span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
              Unlock powerful insights with our AI-powered document processing
              platform designed to simplify, accelerate, and scale content
              understanding for everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="text-center border border-border shadow-xl"
              >
                <CardContent className="py-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border border-border shadow-lg">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-7 w-7 text-purple-600" />
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground">
                    To democratize AI-powered document understanding, empowering
                    everyone to extract knowledge and make decisions efficiently
                    regardless of their technical background.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full border border-border shadow-lg">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-7 w-7 text-pink-600" />
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground">
                    A seamless AI-human collaboration where document processing
                    is intelligent, intuitive, and inspires creativity and
                    innovation across industries.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="h-full border border-border shadow-md hover:shadow-xl transition-shadow">
                    <CardContent className="py-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <value.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet the Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card className="border border-border shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
                    <CardContent className="pt-6 text-center">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold mb-1">{member.name}</h3>
                      <p className="text-sm text-purple-600 font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {member.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
