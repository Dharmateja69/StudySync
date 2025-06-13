"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReasonChange = (value: string) => {
    setFormData({ ...formData, reason: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: `Thanks for reaching out. You're currently in ${
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      } mode.`,
    });
    setFormData({ name: "", email: "", message: "", reason: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're here to help. Let us know how we can support your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-md dark:bg-gray-800 transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail
                      className="text-purple-600 dark:text-purple-400"
                      aria-label="Email icon"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        contact@docgpt.io
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Phone
                      className="text-purple-600 dark:text-purple-400"
                      aria-label="Phone icon"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Phone
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin
                      className="text-purple-600 dark:text-purple-400"
                      aria-label="Location icon"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Address
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-md dark:bg-gray-800 transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="name" className="dark:text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="dark:text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason" className="dark:text-white">
                      Reason for Contact
                    </Label>
                    <Select
                      value={formData.reason}
                      onValueChange={handleReasonChange}
                    >
                      <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                        <SelectValue placeholder="Choose a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="dark:text-white">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all"
                  >
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
