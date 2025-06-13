import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Brain, Code, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CodingForm } from "./CodingForm";
import { SummaryForm } from "./SummaryForm";

export function ImageToolsTab({ user }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    multiple: false,
  });

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Image Upload
          </CardTitle>
          <CardDescription>
            Upload your image for AI-powered analysis and text extraction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
              isDragActive
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-300 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <input {...getInputProps()} />
            {selectedFile ? (
              <div className="flex items-center justify-center gap-2">
                <ImageIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-purple-600 font-medium">
                    Drop the image here...
                  </p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drag & drop your image here, or click to select
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, JPEG, GIF, WebP up to 5MB
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Processing Options */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Processing Options</CardTitle>
              <CardDescription>
                Choose how you want to process your image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="summary"
                    className="flex items-center gap-2"
                  >
                    <Brain className="h-4 w-4" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger
                    value="coding"
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    Coding
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  <SummaryForm
                    file={selectedFile}
                    sourceType="image"
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    user={user}
                  />
                </TabsContent>

                <TabsContent value="coding">
                  <CodingForm
                    file={selectedFile}
                    sourceType="image"
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    user={user}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
