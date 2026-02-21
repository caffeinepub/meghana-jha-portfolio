import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages as LanguagesIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function Languages() {
  const languages = [
    { name: 'English', level: 'Fluent', progress: 95 },
    { name: 'Hindi', level: 'Native', progress: 100 },
    { name: 'Sanskrit', level: 'Learned', progress: 70 },
  ];

  return (
    <Card className="border-2 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <LanguagesIcon className="w-8 h-8 text-primary" />
          Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {languages.map((language, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">{language.name}</span>
              <span className="text-sm font-medium text-primary">{language.level}</span>
            </div>
            <Progress value={language.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
