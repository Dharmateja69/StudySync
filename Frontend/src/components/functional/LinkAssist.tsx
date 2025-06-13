import { useState } from 'react';
import { Link as LinkIcon, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function LinkAssist() {
  const [url, setUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleProcess = () => {
    if (!url || !isValidUrl(url)) {
      toast({
        variant: 'destructive',
        title: 'Invalid URL',
        description: 'Please enter a valid URL to analyze.',
      });
      return;
    }
    
    setProcessing(true);
    setProgress(0);
    
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setSuccess(true);
          toast({
            title: 'Link processed',
            description: 'The content from the URL has been successfully analyzed.',
          });
          return 100;
        }
        return prev + 4;
      });
    }, 100);
  };

  const resetProcess = () => {
    setUrl('');
    setProgress(0);
    setProcessing(false);
    setSuccess(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        {!success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <LinkIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Link Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze content from any URL
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Paste a URL to analyze"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={processing}
                className="flex-1"
              />
              <Button 
                onClick={handleProcess} 
                disabled={processing || !url}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {processing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2 w-full" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Analyzing content...</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-4"
          >
            <div className="rounded-full bg-success/20 p-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-lg font-medium">Analysis Complete</p>
              <p className="text-sm text-muted-foreground mb-2">
                The content from the URL has been successfully analyzed
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                {url}
              </p>
            </div>
            <Button
              onClick={resetProcess}
              variant="outline"
              className="mt-2"
            >
              Analyze Another
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}