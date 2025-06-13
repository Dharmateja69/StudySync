import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api, apiformdata } from "@/lib/api";
import { motion } from "framer-motion";
import { Code, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
}

interface CodingFormProps {
  file?: File;
  url?: string;
  sourceType: "pdf" | "image" | "link";
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  user: User;
}

export function CodingForm({
  file,
  url,
  sourceType,
  isProcessing,
  setIsProcessing,
  user,
}: CodingFormProps) {
  const [formData, setFormData] = useState({
    language: "",
    codingStyle: "",
    complexity: "",
    codingTaskType: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();
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

    const { language, codingStyle, complexity, codingTaskType } = formData;

    if (!language || !codingStyle || !complexity || !codingTaskType) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
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
      let res;

      if (sourceType === "link") {
        // ✅ JSON payload for link-based analysis
        const payload = {
          sourceUrl: url, // Make sure `url` is coming from props or state
          language,
          codingStyle,
          complexity,
          taskType: "coding",
          codingTaskType,
          sourceType,
        };

        res = await api.post("/ai/public", payload);
        const { aiSummary } = res.data;
        setResult(aiSummary);
      } else {
        // ✅ FormData payload for file-based processing
        const payload = new FormData();
        if (file) payload.append("file", file);
        payload.append("Language", language);
        payload.append("Style", codingStyle);
        payload.append("Complexity", complexity);
        payload.append("taskType", "coding");
        payload.append("contentType", codingTaskType);
        payload.append("sourceType", sourceType);

        res = await apiformdata.post("/ai/upload", payload);
        const { aiSummary } = res.data;
        setResult(aiSummary);
        fetchSummaries?.(); // Optional chaining for safety
      }

      toast({ title: "Success", description: "Code created!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Programming Language *</Label>
            <Input
              placeholder="e.g., Python, JavaScript, Java"
              value={formData.language}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, language: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Coding Style *</Label>
            <Select
              value={formData.codingStyle}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, codingStyle: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clean and well-commented">
                  Clean and Well-commented
                </SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="beginner-friendly">
                  Beginner-friendly
                </SelectItem>
                <SelectItem value="efficient">Efficient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Complexity Level *</Label>
            <Select
              value={formData.complexity}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, complexity: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Task Type *</Label>
            <Select
              value={formData.codingTaskType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, codingTaskType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="detailed view">Detailed View</SelectItem>
                <SelectItem value="function implementation">
                  Function Implementation
                </SelectItem>
                <SelectItem value="query analysis">Query Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Code...
            </>
          ) : (
            <>
              <Code className="h-4 w-4 mr-2" />
              Generate Code
            </>
          )}
        </Button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                AI Generated Code
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {result}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Previous Summaries Section */}
      {summaries.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Previous Summaries</h3>

          {summaries
            .slice(
              (currentPage - 1) * summariesPerPage,
              currentPage * summariesPerPage
            )
            .map((summary) => (
              <Card key={summary._id}>
                <CardContent className="pt-4 pb-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-medium">
                      Summary ID: {summary._id.slice(0, 6)}...
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setViewSummary((prev) =>
                            prev === summary._id ? null : summary._id
                          )
                        }
                      >
                        {viewSummary === summary._id ? "Hide" : "View"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(summary._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {viewSummary === summary._id && (
                    <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md mt-2 text-sm font-mono whitespace-pre-wrap">
                      {summary.aiSummary}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of{" "}
              {Math.ceil(summaries.length / summariesPerPage)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setCurrentPage((p) =>
                  p < Math.ceil(summaries.length / summariesPerPage) ? p + 1 : p
                )
              }
              disabled={
                currentPage >= Math.ceil(summaries.length / summariesPerPage)
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
