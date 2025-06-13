import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummaryViewerProps {
  title: string;
  content: string;
  originalText?: string;
}

export default function SummaryViewer({ title, content, originalText }: SummaryViewerProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied to clipboard',
      description: 'The summary has been copied to your clipboard.',
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, '-')}-summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content,
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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {originalText ? (
          <Tabs defaultValue="summary">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="original">Original</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="original">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {originalText.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-4">
              {content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}