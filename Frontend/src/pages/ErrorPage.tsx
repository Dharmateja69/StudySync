import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10 px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
            <p className="text-muted-foreground max-w-md">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}