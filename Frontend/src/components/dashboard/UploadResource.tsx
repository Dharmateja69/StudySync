import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useUploadStore } from "@/stores/uploadStore";
import { FileText, Image, Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export function UploadResource({ user }: { user: { id: string } }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    semester: "",
    university: "",
    tags: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState("");

  const { isUploading, setUploading } = useUploadStore();
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        toast({
          title: "File rejected",
          description: "Please upload PDF or image files under 4MB",
          variant: "destructive",
        });
        return;
      }

      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      subject: "",
      semester: "",
      university: "",
      tags: [],
    });
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Upload Failed",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title || !formData.subject || !formData.semester) {
      toast({
        title: "Missing Fields",
        description: "Please fill Title, Subject, and Semester fields.",
        variant: "destructive",
      });
      return;
    }

    const form = new FormData();
    form.append("file", selectedFile);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("subject", formData.subject);
    form.append("semester", formData.semester);
    form.append("university", formData.university);

    // Backend expects tags as comma separated string, so join here
    if (formData.tags.length > 0) {
      form.append("tags", formData.tags.join(","));
    }

    try {
      setUploading(true);

      await api.post("/file/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Upload Successful",
        description: "Your file has been uploaded.",
      });

      resetForm();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error?.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Your Resource
        </CardTitle>
        <CardDescription>
          Share your academic resources with the community. Files are reviewed
          before being made available.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>File Upload *</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-300 hover:border-purple-400"
              }`}
            >
              <input {...getInputProps()} />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  {selectedFile.type.includes("pdf") ? (
                    <FileText className="h-8 w-8 text-red-500" />
                  ) : (
                    <Image className="h-8 w-8 text-blue-500" />
                  )}
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">
                    {isDragActive
                      ? "Drop the file here"
                      : "Drag & drop your file here"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Or click to select • PDF, JPG, PNG • Max 4MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="e.g., Mathematics, Physics"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester *</Label>
              <Input
                id="semester"
                value={formData.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                placeholder="e.g., Fall 2024, Semester 3"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={formData.university}
                onChange={(e) =>
                  handleInputChange("university", e.target.value)
                }
                placeholder="Your university name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the resource content"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isUploading || !selectedFile}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload Resource"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
