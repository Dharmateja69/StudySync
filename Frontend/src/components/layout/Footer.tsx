import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-12">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                className="h-4 w-4 text-primary-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="font-bold">StudySync</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Making education accessible and collaborative for students and professionals.
          </p>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Platform</h3>
          <nav className="grid gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link to="/ai-assist" className="text-sm text-muted-foreground hover:text-foreground">
              AI Tools
            </Link>
            <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">
              Leaderboard
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Resources</h3>
          <nav className="grid gap-2">
            <Link to="/dashboard/user" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Documentation
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Guides
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Help Center
            </a>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Legal</h3>
          <nav className="grid gap-2">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Cookie Policy
            </a>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
      <Separator className="mt-8" />
      <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:py-8">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} With your loves, Dharma Teja ❣️
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}