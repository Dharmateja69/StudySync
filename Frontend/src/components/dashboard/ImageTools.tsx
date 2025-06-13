
import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, Brain, Eye, Download, Trash2, Zap } from "lucide-react";

interface ProcessedImage {
  id: string;
  name: string;
  url: string;
  extractedText: string;
  analysis: string;
  status: 'processing' | 'completed' | 'error';
  uploadDate: Date;
}

export function ImageTools() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setIsProcessing(true);
    
    acceptedFiles.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      const newImage: ProcessedImage = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: imageUrl,
        extractedText: "",
        analysis: "",
        status: 'processing',
        uploadDate: new Date()
      };
      
      setImages(prev => [...prev, newImage]);
      
      // Simulate OCR and AI processing
      setTimeout(() => {
        setImages(prev => prev.map(img => 
          img.id === newImage.id 
            ? { 
                ...img, 
                status: 'completed',
                extractedText: "This is sample extracted text from the image using advanced OCR technology. The text recognition captured various elements including headings, body text, and numerical data.",
                analysis: "AI Analysis: This image appears to contain structured document content with clear text elements. The layout suggests it's a formal document or report with good text clarity for extraction."
              }
            : img
        ));
        setIsProcessing(false);
      }, 4000);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    multiple: true
  });

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Image Text Extraction & Analysis
          </CardTitle>
          <CardDescription>
            Upload images to extract text using OCR and get AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
              isDragActive 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-purple-600 font-medium">Drop the images here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Drag & drop images here, or click to select files
                </p>
                <p className="text-sm text-gray-500">
                  Supports PNG, JPG, JPEG, GIF, WebP up to 5MB each
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="font-medium">OCR & AI Analysis in Progress...</span>
              </div>
              <Progress value={75} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">
                Extracting text and analyzing image content...
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Image Results */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processed Images</CardTitle>
            <CardDescription>
              View extracted text and AI analysis results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 truncate">{image.name}</h4>
                          <Badge variant={
                            image.status === 'completed' ? 'default' : 
                            image.status === 'processing' ? 'secondary' : 'destructive'
                          }>
                            {image.status}
                          </Badge>
                        </div>
                        
                        {image.status === 'completed' && (
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-1">Extracted Text:</h5>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
                                {image.extractedText}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-1">AI Analysis:</h5>
                              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-200">
                                {image.analysis}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {image.status === 'completed' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Full Size
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download Text
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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
