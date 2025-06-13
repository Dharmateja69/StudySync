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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Eye,
  FileText,
  Image,
  Loader2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface FileData {
  _id: string;
  title: string;
  subject: string;
  semester: string;
  description?: string;
  university?: string;
  tags: string[];
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  status: "pending" | "approved" | "rejected";
  uploadedBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
  rejectionReason?: string;
  cloudinaryUrl?: string;
  resourceType?: string;
}

interface RejectReasonModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  loading: boolean;
}

const RejectReasonModal: React.FC<RejectReasonModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      setReason(""); // reset
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <X className="h-5 w-5" />
              Reject File
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this file. This will help
              the uploader understand why their submission was declined.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Textarea
              placeholder="Enter reason for rejection (e.g., inappropriate content, poor quality, wrong format, etc.)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={loading}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="ghost" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit}
              disabled={loading || !reason.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Reject File
                </>
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export function AdminFileApproval() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Separate state for different file categories
  const [pendingFiles, setPendingFiles] = useState<FileData[]>([]);
  const [approvedFiles, setApprovedFiles] = useState<FileData[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileData[]>([]);
  const [allFiles, setAllFiles] = useState<FileData[]>([]);

  // Fetch pending files
  const fetchPendingFiles = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/files/pending");
      console.log(response.data);
      setPendingFiles(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch pending files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch approved files
  const fetchApprovedFiles = async () => {
    try {
      const response = await api.get("/admin/files/approved");
      console.log(response.data);
      setApprovedFiles(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch approved files",
        variant: "destructive",
      });
    }
  };

  // Fetch rejected files
  const fetchRejectedFiles = async () => {
    try {
      const response = await api.get("/admin/files/rejected");
      setRejectedFiles(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch rejected files",
        variant: "destructive",
      });
    }
  };

  // Fetch all files
  const fetchAllFiles = async () => {
    try {
      const response = await api.get("/admin/all");
      console.log(response.data.files);
      setAllFiles(response.data.files);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch all files",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPendingFiles();
    fetchApprovedFiles();
    fetchRejectedFiles();
    fetchAllFiles();
  }, []);

  const handleApprove = async (fileId: string) => {
    try {
      setActionLoading(fileId);
      await api.post(`/admin/files/${fileId}/approve`);

      // Update local state
      const fileToMove = pendingFiles.find((f) => f._id === fileId);
      if (fileToMove) {
        setPendingFiles((prev) => prev.filter((f) => f._id !== fileId));
        setApprovedFiles((prev) => [
          ...prev,
          { ...fileToMove, status: "approved" },
        ]);
        setAllFiles((prev) =>
          prev.map((f) => (f._id === fileId ? { ...f, status: "approved" } : f))
        );
      }

      toast({
        title: "File approved",
        description:
          "The resource has been approved and is now available to users",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to approve file",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (fileId: string, reason?: string) => {
    try {
      setActionLoading(fileId);
      await api.post(`/admin/files/${fileId}/reject`, { reason });

      // Update local state
      const fileToMove = pendingFiles.find((f) => f._id === fileId);
      if (fileToMove) {
        setPendingFiles((prev) => prev.filter((f) => f._id !== fileId));
        setRejectedFiles((prev) => [
          ...prev,
          {
            ...fileToMove,
            status: "rejected",
            rejectionReason: reason || "No reason provided",
          },
        ]);
        setAllFiles((prev) =>
          prev.map((f) =>
            f._id === fileId
              ? {
                  ...f,
                  status: "rejected",
                  rejectionReason: reason || "No reason provided",
                }
              : f
          )
        );
      }

      toast({
        title: "File rejected",
        description:
          "The resource has been rejected and uploader has been notified",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to reject file",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
      setModalOpen(false);
      setSelectedFileId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const FilePreviewModal = ({ file }: { file: FileData }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {file.title}
            </DialogTitle>
            <DialogDescription>
              {file.subject} • {file.semester} • Uploaded by{" "}
              {file.uploadedBy.fullName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="font-medium">Description:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {file.description || "No description provided"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-medium">University:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {file.university || "Not specified"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {file.tags.map((tag: string, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="font-medium">File Info:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatDate(file.createdAt)}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="font-medium">Uploader Email:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {file.uploadedBy.email}
                </p>
                {file.cloudinaryUrl && (
                  <>
                    <span className="font-medium">URL: </span>
                    <a
                      href={file.cloudinaryUrl}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.subject}
                    </a>
                  </>
                )}
              </motion.div>

              {file.rejectionReason && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="col-span-2"
                >
                  <span className="font-medium">Rejection Reason:</span>
                  <p className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                    {file.rejectionReason}
                  </p>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center justify-center h-64">
                {file.resourceType?.includes("raw") ? (
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-red-500 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">
                      PDF Preview
                    </p>
                    <p className="text-sm text-gray-500">
                      {file.fileName || file.subject}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="h-16 w-16 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Image Preview
                    </p>
                    <p className="text-sm text-gray-500">{file.subject}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {file.status === "pending" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-2"
              >
                <Button
                  onClick={() => handleApprove(file._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 transition-colors"
                  disabled={actionLoading === file._id}
                >
                  {actionLoading === file._id ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Approve
                </Button>
                <Button
                  onClick={() => {
                    setSelectedFileId(file._id);
                    setModalOpen(true);
                  }}
                  variant="destructive"
                  className="flex-1 transition-colors"
                  disabled={actionLoading === file._id}
                >
                  {actionLoading === file._id ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <X className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );

  const FileTable = ({
    files,
    showActions = true,
  }: {
    files: FileData[];
    showActions?: boolean;
  }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-500"
                >
                  No files found
                </motion.div>
              </TableCell>
            </TableRow>
          ) : (
            files.map((file, index) => (
              <motion.tr
                key={file._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {file.resourceType?.includes("raw") ? (
                      <FileText className="h-5 w-5 text-red-500" />
                    ) : (
                      <Image className="h-5 w-5 text-blue-500" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {file.subject.length > 15
                        ? `${file.subject.substring(0, 15)}...`
                        : file.subject}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{file.title}</TableCell>
                <TableCell>{file.subject}</TableCell>
                <TableCell>{file.semester}</TableCell>
                <TableCell>{file.uploadedBy?.fullName}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {formatDate(file.createdAt)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      file.status === "approved"
                        ? "default"
                        : file.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {file.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <FilePreviewModal file={file} />
                    {showActions && file.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleApprove(file._id)}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                          disabled={actionLoading === file._id}
                        >
                          {actionLoading === file._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedFileId(file._id);
                            setModalOpen(true);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          disabled={actionLoading === file._id}
                        >
                          {actionLoading === file._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center"
          >
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading files...</span>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              File Management
            </CardTitle>
            <CardDescription>
              Review and manage user-uploaded resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="pending"
                  className="flex items-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Pending ({pendingFiles.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  <Check className="h-4 w-4 mr-2" />
                  Approved ({approvedFiles.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  <X className="h-4 w-4 mr-2" />
                  Rejected ({rejectedFiles.length})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All Files ({allFiles.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                {pendingFiles.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No pending uploads
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      All uploaded files have been reviewed
                    </p>
                  </motion.div>
                ) : (
                  <FileTable files={pendingFiles} />
                )}
              </TabsContent>

              <TabsContent value="approved" className="mt-6">
                <FileTable files={approvedFiles} showActions={false} />
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <FileTable files={rejectedFiles} showActions={false} />
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                <FileTable files={allFiles} showActions={false} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reject Reason Modal */}
      <RejectReasonModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedFileId(null);
        }}
        loading={actionLoading === selectedFileId}
        onSubmit={(reason) => {
          if (selectedFileId) {
            handleReject(selectedFileId, reason);
          }
        }}
      />
    </>
  );
}
