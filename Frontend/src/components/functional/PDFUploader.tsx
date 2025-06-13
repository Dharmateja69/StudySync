import { useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function PDFUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        toast({
          variant: 'destructive',
          title: 'Invalid file format',
          description: 'Please upload a PDF file.',
        });
        return;
      }
      
      if (selectedFile.size > 1024 * 1024) { // 1MB
        setError('File size exceeds 1MB limit');
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload a file smaller than 1MB.',
        });
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setSuccess(true);
          toast({
            title: 'Upload successful',
            description: 'Your PDF has been uploaded and is being processed.',
          });
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const resetUpload = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setSuccess(false);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          {!file && !success && (
            <div className="relative w-full">
              <label
                htmlFor="pdf-upload"
                className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/25 px-5 py-6 text-center transition-colors hover:bg-muted/50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="rounded-full bg-background p-3 shadow-sm">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-medium">Drag & drop your PDF</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse (max 1MB)
                    </p>
                  </div>
                </motion.div>
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center text-destructive text-sm"
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {error}
                </motion.div>
              )}
            </div>
          )}

          {file && !success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <File className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetUpload}
                  disabled={uploading}
                >
                  Change
                </Button>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-xs text-muted-foreground text-right">
                    {progress.toFixed(0)}%
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleUpload}
                  className="w-full"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload PDF'}
                </Button>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <div className="rounded-full bg-success/20 p-3">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div className="space-y-1 text-center">
                <p className="text-lg font-medium">Upload Successful</p>
                <p className="text-sm text-muted-foreground">
                  Your PDF is now being processed for AI analysis
                </p>
              </div>
              <Button
                onClick={resetUpload}
                variant="outline"
                className="mt-2"
              >
                Upload Another
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}