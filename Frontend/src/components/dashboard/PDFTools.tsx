
import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Brain, Download, Eye, Trash2 } from "lucide-react";
import { SummaryOutput } from "./SummaryOutput";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'processing' | 'completed' | 'error';
  summary?: string;
  uploadDate: Date;
}

export function PDFTools() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setIsProcessing(true);
    
    acceptedFiles.forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'processing',
        uploadDate: new Date()
      };
      
      setFiles(prev => [...prev, newFile]);
      
      // Simulate AI processing
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { 
                ...f, 
                status: 'completed',
                summary: `AI Summary for ${file.name}: This document contains important information about business processes and strategic planning. Key insights include operational efficiency improvements and market analysis data.`
              }
            : f
        ));
        setIsProcessing(false);
      }, 3000);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Document Processor
          </CardTitle>
          <CardDescription>
            Upload PDF files to extract text and generate AI-powered summaries
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
              <p className="text-purple-600 font-medium">Drop the PDF files here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Drag & drop PDF files here, or click to select files
                </p>
                <p className="text-sm text-gray-500">
                  Supports multiple files up to 10MB each
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
                <Brain className="h-5 w-5 text-purple-600 animate-pulse" />
                <span className="font-medium">AI Processing in Progress...</span>
              </div>
              <Progress value={66} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">
                Analyzing document structure and generating insights...
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>
              Manage your processed PDF files and view AI summaries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-8 w-8 text-red-500" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{file.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                        <Badge variant={
                          file.status === 'completed' ? 'default' : 
                          file.status === 'processing' ? 'secondary' : 'destructive'
                        }>
                          {file.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'completed' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFile(file)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Summary
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Output */}
      {selectedFile && (
        <SummaryOutput 
          file={selectedFile} 
          onClose={() => setSelectedFile(null)} 
        />
      )}
    </div>
  );
}
