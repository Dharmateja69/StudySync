import EditUploadModal from "@/components/EditUploadModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useUploadStore } from "@/stores/uploadStore";
import { motion } from "framer-motion";
import { AlertTriangle, Edit, Eye, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// Glassmorphism Tooltip Component for Rejection Reason
const RejectionTooltip = ({ reason, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80"
        >
          <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl">
            {/* Fixed-color glass effect overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-semibold text-red-400">
                  Rejection Reason
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {reason || "No specific reason provided"}
              </p>

              <div className="pt-2 border-t border-white/20 dark:border-gray-700/30">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Please delete this file and upload quality study materials
                  only. Ensure your materials meet our community guidelines.
                </p>
              </div>
            </div>

            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20 dark:border-t-gray-700/30" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export function MyUploads({ user }) {
  const { toast } = useToast();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { setCurrentUpload } = useUploadStore();

  useEffect(() => {
    if (!user?.id) return;
    const loadUploads = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/file/user/uploads`);
        setUploads(res.data.uploads || res.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch uploads",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadUploads();
  }, [user?.id]);

  const handleEdit = (upload) => {
    setCurrentUpload(upload);
    setIsEditOpen(true);
  };

  const handleSave = async (id) => {
    try {
      const { currentUpload } = useUploadStore.getState();

      if (!currentUpload) {
        toast({
          title: "Error",
          description: "No upload selected to save",
          variant: "destructive",
        });
        return;
      }

      const updatedData = {
        ...currentUpload,
        tags: Array.isArray(currentUpload.tags)
          ? currentUpload.tags.join(",")
          : currentUpload.tags || "",
      };

      await api.put(`/file/${id}`, updatedData);
      toast({
        title: "Updated",
        description: "Upload updated successfully",
      });

      const res = await api.get(`/file/user/uploads`);
      setUploads(res.data.uploads || res.data);
      setIsEditOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update upload",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/file/${id}`);
      setUploads((prev) => prev.filter((u) => u._id !== id));
      toast({
        title: "Deleted",
        description: "Upload removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete",
        variant: "destructive",
      });
    }
  };

  const handleView = (upload) => {
    if (upload.cloudinaryUrl) {
      window.open(upload.cloudinaryUrl, "_blank");
    } else {
      toast({
        title: "Unavailable",
        description: "File URL not available.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          My Uploads
        </CardTitle>
        <CardDescription>
          Manage your uploaded resources and track their approval status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : uploads.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No uploads yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start sharing your academic resources with the community
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploads.map((upload) => (
                  <motion.tr
                    key={upload._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <TableCell className="font-medium">
                      {upload.title}
                    </TableCell>
                    <TableCell>{upload.subject}</TableCell>
                    <TableCell>{upload.semester}</TableCell>
                    <TableCell>
                      {upload.status === "rejected" ? (
                        <RejectionTooltip reason={upload.rejectionReason}>
                          <Badge
                            variant={getStatusColor(upload.status)}
                            className="cursor-help"
                          >
                            {upload.status}
                          </Badge>
                        </RejectionTooltip>
                      ) : (
                        <Badge variant={getStatusColor(upload.status)}>
                          {upload.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{upload.university}</TableCell>
                    <TableCell>{upload.tags?.join(", ")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(upload)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(upload)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Upload</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{upload.title}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(upload._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <EditUploadModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </Card>
  );
}
