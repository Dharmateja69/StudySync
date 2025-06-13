import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Code, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { CodingForm } from "./CodingForm";

interface LinkAssistTabProps {
  user: any; // You can replace `any` with your actual user type if defined
}

export function LinkAssistTab({ user }: LinkAssistTabProps) {
  const [url, setUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isValidUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Link Input
          </CardTitle>
          <CardDescription>
            Enter a URL for AI-powered content analysis and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
              />
            </div>
            {url && !isValidUrl(url) && (
              <p className="text-sm text-red-500">Please enter a valid URL</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Processing Options */}
      {url && isValidUrl(url) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Processing Options</CardTitle>
              <CardDescription>
                Choose how you want to process the linked content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="coding" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="coding"
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    Coding
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="coding">
                  <CodingForm
                    url={url}
                    sourceType="link"
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
