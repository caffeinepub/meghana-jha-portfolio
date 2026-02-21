import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function Skills() {
  const skills = [
    'Microsoft Excel',
    'Laboratory techniques',
    'Research methods',
    'Presentation skills',
    'Team collaboration',
    'Writing proficiency',
    'Document scanning',
    'Social media management',
    'Active learning',
    'Research and analysis',
    'Positive attitude',
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-primary" />
          Skills
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </div>

      <Card className="border-2 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-base px-5 py-2.5 font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
