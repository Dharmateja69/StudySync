import { motion } from "framer-motion";
import { Brain, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Dashboard", href: "/dash/u" },
        { name: "AI Assist", href: "/dash/u" },
        { name: "Pricing", href: "/pricing" },
        { name: "Features", href: "#features" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "API Docs", href: "#" },
        { name: "Status", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">DocuMind</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transform documents with AI. Upload, analyze, and unlock insights
              using our advanced assistant.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4 text-base">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8"
        >
          <div className="text-center text-sm text-gray-400 space-y-2">
            <p>
              © 2024{" "}
              <motion.span
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-semibold cursor-pointer"
              >
                Dharma Teja
              </motion.span>
              . All rights reserved.
            </p>
            <p>
              Made with 💙 using{" "}
              <motion.span
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-medium cursor-pointer"
              >
                React.js
              </motion.span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
