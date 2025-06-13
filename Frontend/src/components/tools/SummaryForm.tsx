import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { motion } from "framer-motion";
import { Brain, Eye, Loader2, Trash2 } from "lucide-react";

import { api, apiformdata } from "@/lib/api";
import type { MetaInfo } from "@/stores/Aistore";

interface User {
  id: string;
}

interface SummaryFormProps {
  file?: File;
  url?: string;
  sourceType: "pdf" | "image" | "link";
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  user: User;
}

export function SummaryForm({
  file,
  url,
  sourceType,
  isProcessing,
  setIsProcessing,
  user,
}: SummaryFormProps) {
  const { toast } = useToast();

  const [formData, setFormData] = useState<MetaInfo>({
    summaryStyle: "",
    summaryLength: "",
    summaryFormat: "",
    contentType: "",
  });

  const [result, setResult] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<
    { _id: string; aiSummary: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const summariesPerPage = 3;
  const [viewSummary, setViewSummary] = useState<string | null>(null);

  const fetchSummaries = async () => {
    try {
      const res = await api.get(`/ai/my-summaries`);
      setSummaries(res.data);
    } catch (error) {
      console.error("Error fetching summaries:", error);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/ai/${id}`);
      toast({ title: "Deleted", description: "Summary deleted successfully." });
      fetchSummaries();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete summary.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.summaryStyle ||
      !formData.summaryLength ||
      !formData.summaryFormat ||
      !formData.contentType
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (sourceType !== "link" && !file) {
      toast({
        title: "Missing file",
        description: "Upload a file first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const payload = new FormData();
      if (file) payload.append("file", file);
      payload.append("summaryStyle", formData.summaryStyle);
      payload.append("summaryLength", formData.summaryLength);
      payload.append("summaryFormat", formData.summaryFormat);
      payload.append("taskType", "summary");
      payload.append("contentType", formData.contentType);
      payload.append("sourceType", sourceType);

      const res = await apiformdata.post("/ai/upload", payload);
      const { aiSummary } = res.data;
      setResult(aiSummary);
      fetchSummaries();
      toast({ title: "Success", description: "Summary created!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const indexOfLast = currentPage * summariesPerPage;
  const indexOfFirst = indexOfLast - summariesPerPage;
  const currentSummaries = summaries.slice(indexOfFirst, indexOfLast);
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Style */}
          <div className="space-y-2">
            <Label>Summary Style *</Label>
            <Select
              value={formData.summaryStyle}
              onValueChange={(value: MetaInfo["summaryStyle"]) =>
                setFormData((prev) => ({ ...prev, summaryStyle: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="educator">Educator</SelectItem>
                <SelectItem value="analytical">Analytical</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Length */}
          <div className="space-y-2">
            <Label>Summary Length *</Label>
            <Select
              value={formData.summaryLength}
              onValueChange={(value: MetaInfo["summaryLength"]) =>
                setFormData((prev) => ({ ...prev, summaryLength: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Format */}
          <div className="space-y-2">
            <Label>Summary Format *</Label>
            <Select
              value={formData.summaryFormat}
              onValueChange={(value: MetaInfo["summaryFormat"]) =>
                setFormData((prev) => ({ ...prev, summaryFormat: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essay">Essay</SelectItem>
                <SelectItem value="bullet">Bullet Points</SelectItem>
                <SelectItem value="report">Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Content Type *</Label>
            <Select
              value={formData.contentType}
              onValueChange={(value: MetaInfo["contentType"]) =>
                setFormData((prev) => ({ ...prev, contentType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="visual">Visual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Summary...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Generate Summary
            </>
          )}
        </Button>
      </form>

      {/* Result Display */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Generated Summary
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                  {result}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" /> AI Generated
                Summary
              </h3>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {summaries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Previous Summaries
          </h2>
          {currentSummaries.map((item) => (
            <Card key={item._id}>
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm truncate w-3/4">
                    {item.aiSummary.slice(0, 100)}...
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewSummary(item.aiSummary)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between pt-2">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <Button
              disabled={indexOfLast >= summaries.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {viewSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mt-6">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Viewed Summary
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{viewSummary}</pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
