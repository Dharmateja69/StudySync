import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Code as CodeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CodeRefPanel() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard',
      description: 'The code has been copied to your clipboard.',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Code Snippet',
        text: code,
      }).catch(() => {
        toast({
          title: 'Sharing failed',
          description: 'Unable to share this content.',
          variant: 'destructive',
        });
      });
    } else {
      toast({
        title: 'Sharing not supported',
        description: 'Your browser does not support the Web Share API.',
        variant: 'destructive',
      });
    }
  };

  const handleAnalyze = () => {
    if (!code.trim()) {
      toast({
        title: 'No code provided',
        description: 'Please enter some code to analyze.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Code analyzed',
      description: 'Your code has been analyzed.',
    });
  };

  const getPlaceholder = () => {
    switch (language) {
      case 'javascript':
        return '// Enter your JavaScript code here\nfunction example() {\n  return "Hello World";\n}';
      case 'python':
        return '# Enter your Python code here\ndef example():\n  return "Hello World"';
      case 'java':
        return '// Enter your Java code here\npublic class Example {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}';
      case 'csharp':
        return '// Enter your C# code here\nusing System;\n\npublic class Example {\n  public static void Main() {\n    Console.WriteLine("Hello World");\n  }\n}';
      default:
        return '// Enter your code here';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5" />
            Code Reference
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!code}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} disabled={!code}>
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="javascript" 
          value={language}
          onValueChange={setLanguage}
          className="w-full"
        >
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="csharp">C#</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={getPlaceholder()}
              className="font-mono h-[300px]"
            />
            
            <div className="flex justify-end">
              <Button onClick={handleAnalyze} disabled={!code.trim()}>
                Analyze Code
              </Button>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}