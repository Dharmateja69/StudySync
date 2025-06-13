
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, History, Sparkles, FileText, Image, Link, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Navbar } from "@/components/Navbar";
import { FloatingShapes } from "@/components/FloatingShapes";

interface AIHistory {
  id: string;
  type: 'text' | 'file' | 'image' | 'link';
  input: string;
  output: string;
  timestamp: Date;
}

const AIAssist = () => {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<AIHistory[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const response = `AI Response: Based on your input "${input}", here's a comprehensive analysis with actionable insights and recommendations. This response demonstrates the AI's ability to understand context and provide valuable information.`;
      
      const newEntry: AIHistory = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'text',
        input: input,
        output: response,
        timestamp: new Date()
      };
      
      setHistory(prev => [newEntry, ...prev]);
      setCurrentResponse(response);
      setInput("");
      setIsProcessing(false);
    }, 2000);
  };

  const onDrop = (acceptedFiles: File[]) => {
    // Handle file uploads
    console.log("Files uploaded:", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <FloatingShapes />
      <Navbar />
      
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-4">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI Assistant</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Centralized AI Interface
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant AI assistance for any task. Upload files, analyze content, or ask questions.
            </p>
          </motion.div>

          {/* Main Interface */}
          <div className="grid gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI Chat Interface
                </CardTitle>
                <CardDescription>
                  Type your question, paste content, or upload files for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Ask me anything or paste content for analysis..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  
                  {/* Upload Area */}
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {isDragActive ? 'Drop files here...' : 'Drag & drop files or click to upload'}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        PDF
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Image className="h-3 w-3" />
                        Images
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Link className="h-3 w-3" />
                        URLs
                      </Badge>
                    </div>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!input.trim() || isProcessing}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isProcessing ? (
                        <Brain className="h-4 w-4 animate-pulse mr-2" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      {isProcessing ? "Processing..." : "Send"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Response */}
            {currentResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-green-600" />
                      AI Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{currentResponse}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Processing Indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-3 py-8">
                      <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
                      <div className="text-center">
                        <p className="font-medium text-gray-900">AI is thinking...</p>
                        <p className="text-sm text-gray-600">Analyzing your request and generating response</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* History */}
            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Conversation History
                  </CardTitle>
                  <CardDescription>
                    Your recent AI interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {history.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-gray-200 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{item.type}</Badge>
                          <span className="text-xs text-gray-500">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Your input:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{item.input}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">AI response:</p>
                          <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">{item.output}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssist;
