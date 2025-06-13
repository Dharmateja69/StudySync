import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadStore } from "@/stores/uploadStore";
import React, { useEffect, useState } from "react";

interface EditUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string) => void;
}

const EditUploadModal: React.FC<EditUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { currentUpload, setCurrentUpload } = useUploadStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    semester: "",
    university: "",
    tags: "",
  });

  useEffect(() => {
    if (currentUpload) {
      setFormData({
        title: currentUpload.title || "",
        description: currentUpload.description || "",
        subject: currentUpload.subject || "",
        semester: currentUpload.semester || "",
        university: currentUpload.university || "",
        tags: Array.isArray(currentUpload.tags)
          ? currentUpload.tags.join(", ")
          : currentUpload.tags || "",
      });
    } else {
      // Clear form when no current upload
      setFormData({
        title: "",
        description: "",
        subject: "",
        semester: "",
        university: "",
        tags: "",
      });
    }
  }, [currentUpload]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!currentUpload?._id) return;

    // Update currentUpload in store with form data and tags array
    setCurrentUpload({
      ...currentUpload,
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    });

    // Call onSave with current upload id
    onSave(currentUpload._id);

    // Close modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Upload</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
          <Input
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="Semester"
          />
          <Input
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
          />
          <Input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUploadModal;
