
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Copy, Download, Share, Brain, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SummaryOutputProps {
  file: {
    id: string;
    name: string;
    summary?: string;
    uploadDate: Date;
    status: string;
  };
  onClose: () => void;
}

export function SummaryOutput({ file, onClose }: SummaryOutputProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { toast } = useToast();
  
  const fullSummary = file.summary || "No summary available.";

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullSummary.length) {
        setDisplayedText(fullSummary.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [fullSummary]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSummary);
    toast({
      title: "Copied to clipboard",
      description: "Summary has been copied to your clipboard.",
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/shared/${file.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Share link copied",
      description: "Share link has been copied to your clipboard.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
      >
        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Summary Results
                </CardTitle>
                <CardDescription className="mt-2">
                  Generated summary for: <span className="font-medium">{file.name}</span>
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {file.uploadDate.toLocaleDateString()}
              </Badge>
              <Badge variant={file.status === 'completed' ? 'default' : 'secondary'}>
                {file.status}
              </Badge>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-600" />
                AI-Generated Summary
                {isTyping && <span className="animate-pulse text-purple-600">|</span>}
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {displayedText}
                </p>
              </div>
            </div>

            {/* Key Insights */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
              <div className="grid gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">Document Type:</span>
                  <span className="text-sm text-blue-700 ml-2">Business Report</span>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm font-medium text-green-900">Confidence Score:</span>
                  <span className="text-sm text-green-700 ml-2">94%</span>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <span className="text-sm font-medium text-orange-900">Word Count:</span>
                  <span className="text-sm text-orange-700 ml-2">~2,150 words</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Summary
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share Link
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Generate Advanced Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
