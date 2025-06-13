
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Link as LinkIcon, Send, Brain, ExternalLink, Copy, Bookmark, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkAnalysis {
  id: string;
  url: string;
  title: string;
  description: string;
  summary: string;
  keyPoints: string[];
  category: string;
  processingTime: string;
  timestamp: Date;
}

export function LinkAssist() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<LinkAnalysis[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to analyze the link
    setTimeout(() => {
      const newAnalysis: LinkAnalysis = {
        id: Math.random().toString(36).substr(2, 9),
        url: url,
        title: "Sample Article Title - AI Generated",
        description: "This is a sample description extracted from the webpage content.",
        summary: "AI-generated summary: This article discusses important topics related to technology and innovation. The content covers various aspects of modern web development, user experience design, and emerging trends in the digital landscape. Key insights include best practices for implementation and future considerations.",
        keyPoints: [
          "Comprehensive overview of modern technology trends",
          "Practical implementation strategies",
          "Future market predictions and analysis",
          "Case studies and real-world examples"
        ],
        category: "Technology",
        processingTime: "2.3 seconds",
        timestamp: new Date()
      };
      
      setAnalyses(prev => [newAnalysis, ...prev]);
      setUrl("");
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Link has been successfully analyzed!",
      });
    }, 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Content copied to clipboard.",
    });
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Link Assistant
          </CardTitle>
          <CardDescription>
            Paste any URL and get AI-powered insights, summaries, and key information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !isValidUrl(url)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isAnalyzing ? (
                  <Brain className="h-4 w-4 animate-pulse" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
            
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Brain className="h-4 w-4 animate-pulse text-purple-600" />
                AI is processing the webpage content...
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
            <CardDescription>
              Your recent link analyses and AI-generated insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analyses.map((analysis) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {analysis.title}
                        </h3>
                        <a 
                          href={analysis.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{analysis.url}</p>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary">{analysis.category}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {analysis.processingTime}
                        </span>
                        <span className="text-xs text-gray-500">
                          {analysis.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {analysis.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">AI Summary</h4>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {analysis.summary}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Points</h4>
                      <ul className="space-y-2">
                        {analysis.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopy(analysis.summary)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Summary
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopy(analysis.keyPoints.join('\n'))}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Key Points
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
