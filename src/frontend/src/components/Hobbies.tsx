import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Pen, BookOpen, Feather, Crown, Palette } from 'lucide-react';

export default function Hobbies() {
  const hobbies = [
    { name: 'Article Writing', icon: Pen },
    { name: 'Journal Writing', icon: BookOpen },
    { name: 'Novel reading', icon: BookOpen },
    { name: 'Poetry', icon: Feather },
    { name: 'Chess', icon: Crown },
    { name: 'Painting', icon: Palette },
  ];

  return (
    <Card className="border-2 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <Heart className="w-8 h-8 text-primary" />
          Hobbies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{hobby.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
