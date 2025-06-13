import { Link } from 'react-router-dom';
import { ArrowRight, Book, Brain, Code, FileText, Image, Medal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Next-gen learning platform
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Supercharge your learning with <span className="text-primary">AI</span> & collaboration
            </motion.h1>
            
            <motion.p
              className="max-w-2xl text-lg text-muted-foreground mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              StudySync is a revolutionary platform that combines AI-powered learning tools with collaborative features to help students, professionals, and organizations excel.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to excel
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Our platform combines AI-powered tools with collaborative features to create a comprehensive learning environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="PDF AI Summarization"
              description="Upload PDFs and get AI-powered summaries instantly. Extract key information without reading everything."
              delay={0}
            />
            <FeatureCard
              icon={<Image className="h-8 w-8 text-primary" />}
              title="Image Analysis"
              description="Extract text from images and diagrams. Perfect for notes, whiteboards, and textbook pages."
              delay={0.1}
            />
            <FeatureCard
              icon={<Code className="h-8 w-8 text-primary" />}
              title="Code Sharing"
              description="Share and reference code snippets. Get explanations and optimizations for better understanding."
              delay={0.2}
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-primary" />}
              title="AI Learning Assistant"
              description="Ask questions, get explanations, and receive personalized learning paths."
              delay={0.3}
            />
            <FeatureCard
              icon={<Medal className="h-8 w-8 text-primary" />}
              title="Leaderboard System"
              description="Gamified learning with points, badges, and rewards. Compete with peers and track progress."
              delay={0.4}
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Collaboration Tools"
              description="Work together with classmates or colleagues. Share resources and insights effortlessly."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Trusted by thousands
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              See what our users are saying about StudySync and how it's transformed their learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="StudySync has completely changed how I prepare for exams. The AI summaries save me hours of reading time."
              name="Alex Johnson"
              role="Computer Science Student"
              delay={0}
            />
            <TestimonialCard
              quote="As a CEO, I use StudySync to quickly digest industry reports and stay ahead of trends. Invaluable tool."
              name="Sarah Williams"
              role="CEO, TechVision Inc."
              delay={0.1}
            />
            <TestimonialCard
              quote="The leaderboard feature motivates our entire class to contribute and stay engaged. Learning has never been so fun!"
              name="Michael Chen"
              role="Engineering Student"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to transform your learning?
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Join thousands of students and professionals who are already leveraging StudySync to accelerate their learning and productivity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/login">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  delay: number;
}

function TestimonialCard({ quote, name, role, delay }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="mb-4">
            <Book className="h-6 w-6 text-primary mb-4" />
            <p className="italic">"{quote}"</p>
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}