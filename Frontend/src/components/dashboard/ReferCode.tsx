
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Tag, Share, Copy, Bookmark, Search, Plus, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  description: string;
  createdDate: Date;
  shareLink: string;
  bookmarked: boolean;
}

export function ReferCode() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([
    {
      id: "1",
      title: "React useEffect Hook Example",
      code: `import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return <div>{data?.title}</div>;
}`,
      language: "javascript",
      tags: ["react", "hooks", "useEffect"],
      description: "Basic example of using useEffect hook for data fetching",
      createdDate: new Date(),
      shareLink: "https://codeshare.app/abc123",
      bookmarked: true
    }
  ]);
  
  const [newSnippet, setNewSnippet] = useState({
    title: "",
    code: "",
    language: "javascript",
    tags: "",
    description: ""
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const { toast } = useToast();

  const languages = [
    "javascript", "typescript", "python", "java", "cpp", "csharp", 
    "php", "ruby", "go", "rust", "html", "css", "sql", "json"
  ];

  const allTags = Array.from(new Set(snippets.flatMap(s => s.tags)));

  const handleSave = () => {
    if (!newSnippet.title || !newSnippet.code) {
      toast({
        title: "Error",
        description: "Please fill in title and code fields.",
        variant: "destructive",
      });
      return;
    }

    const snippet: CodeSnippet = {
      id: Math.random().toString(36).substr(2, 9),
      title: newSnippet.title,
      code: newSnippet.code,
      language: newSnippet.language,
      tags: newSnippet.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      description: newSnippet.description,
      createdDate: new Date(),
      shareLink: `https://codeshare.app/${Math.random().toString(36).substr(2, 9)}`,
      bookmarked: false
    };

    setSnippets(prev => [snippet, ...prev]);
    setNewSnippet({ title: "", code: "", language: "javascript", tags: "", description: "" });
    
    toast({
      title: "Success",
      description: "Code snippet saved successfully!",
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  const handleShare = (shareLink: string) => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Share link copied",
      description: "Share link has been copied to clipboard.",
    });
  };

  const toggleBookmark = (id: string) => {
    setSnippets(prev => prev.map(snippet => 
      snippet.id === id ? { ...snippet, bookmarked: !snippet.bookmarked } : snippet
    ));
  };

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || snippet.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Add New Snippet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Add Code Snippet
          </CardTitle>
          <CardDescription>
            Save and organize your code snippets with tags and descriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Snippet title"
                value={newSnippet.title}
                onChange={(e) => setNewSnippet({...newSnippet, title: e.target.value})}
              />
              <Select value={newSnippet.language} onValueChange={(value) => setNewSnippet({...newSnippet, language: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Textarea
              placeholder="Enter your code here..."
              value={newSnippet.code}
              onChange={(e) => setNewSnippet({...newSnippet, code: e.target.value})}
              rows={8}
              className="font-mono text-sm"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Tags (comma separated)"
                value={newSnippet.tags}
                onChange={(e) => setNewSnippet({...newSnippet, tags: e.target.value})}
              />
              <Input
                placeholder="Description (optional)"
                value={newSnippet.description}
                onChange={(e) => setNewSnippet({...newSnippet, description: e.target.value})}
              />
            </div>
            
            <Button onClick={handleSave} className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Save Snippet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Snippets List */}
      {filteredSnippets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Code Snippets</CardTitle>
            <CardDescription>
              {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredSnippets.map((snippet) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate mb-1">
                          {snippet.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{snippet.language}</Badge>
                          <span className="text-xs text-gray-500">
                            {snippet.createdDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {snippet.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {snippet.description && (
                          <p className="text-sm text-gray-600">{snippet.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(snippet.id)}
                          className={snippet.bookmarked ? "text-yellow-600" : "text-gray-400"}
                        >
                          <Bookmark className={`h-4 w-4 ${snippet.bookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopy(snippet.code)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Code
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare(snippet.shareLink)}
                      >
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Full
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
