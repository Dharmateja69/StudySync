import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Calendar, Download, Eye, FileText, Search, Share } from "lucide-react";
import { useEffect, useState } from "react";

const SearchResources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Stores fetched results
  const [modalData, setModalData] = useState(null); // Stores selected file details
  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ API call to fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        console.log("🔍 Searching for:", searchQuery);
        const { data } = await api.get("/search", {
          params: {
            query: searchQuery,
          },
        });
        console.log("✅ Search results:", data?.data?.files);
        setSearchResults(data?.data?.files || []);
      } catch (error) {
        console.error("❌ Search fetch error:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // ✅ Handle View (open modal with full file details)
  const handleView = async (fileId: string) => {
    try {
      console.log("👁️ Viewing file:", fileId);
      const { data } = await api.get(`/search/file/${fileId}`);
      console.log(data);
      setModalData(data);
      setModalOpen(true);
    } catch (err) {
      console.error("❌ Failed to fetch file details:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* <Navbar /> */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Search className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Search Resources
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Type your query and discover relevant files instantly.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Type any topic, subject, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 dark:text-gray-400">
                {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Card Items */}
            {searchResults.map((item: any) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {item.title}
                            </h3>
                            <Badge variant="secondary">
                              {item.resourceType || "File"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.tags?.map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(
                                item.createdAt || item.date
                              ).toLocaleDateString()}
                            </div>
                            <span>•</span>
                            <span>{item.size || "Unknown Size"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(item._id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const directDownloadUrl =
                              modalData.data.cloudinaryUrl.replace(
                                "/upload/",
                                `/upload/fl_attachment:${
                                  modalData.data.title || "document"
                                }/`
                              );

                            const link = document.createElement("a");
                            link.href = directDownloadUrl;
                            link.download = `${
                              modalData.data.title || "document"
                            }.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* No results */}
            {searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search query
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ✅ Modal Dialog for File Details */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              🏫{modalData?.data.university || "Anonymouse"}
            </DialogTitle>
          </DialogHeader>

          {modalData && (
            <div className="space-y-4 text-gray-700 dark:text-gray-300 p-4 rounded-lg  shadow-md">
              <p>{modalData.data.description}</p>

              <p>
                <strong>Tags:</strong> {modalData.data.tags?.join(", ")}
              </p>

              <p>
                <strong>Uploaded:</strong>{" "}
                {new Date(modalData.data.createdAt).toLocaleDateString()}
              </p>

              <p
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                <strong>Access👉:</strong>{" "}
                <a
                  href={modalData.data.cloudinaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {modalData.data.title}
                </a>
              </p>

              <p>
                <strong>Semester:</strong> {modalData.data.semester}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-3">
                {/* Download Button */}
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={() => {
                    const directDownloadUrl =
                      modalData.data.cloudinaryUrl.replace(
                        "/upload/",
                        `/upload/fl_attachment:${
                          modalData.data.title || "document"
                        }/`
                      );

                    const link = document.createElement("a");
                    link.href = directDownloadUrl;
                    link.download = `${modalData.data.title || "document"}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>

                {/* Share Button */}
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    navigator.clipboard.writeText(modalData.data.cloudinaryUrl);
                    toast({
                      title: "Link Copied!",
                      description: "Resource link copied to clipboard.",
                    });
                  }}
                >
                  <Share className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchResources;
