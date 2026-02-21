import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Mail } from 'lucide-react';

export default function References() {
  const references = [
    {
      name: 'Prof. Uma Choudhry',
      title: 'Professor at BCAS',
      email: 'uma.chaudhry@bcas.du.ac.in',
    },
    {
      name: 'Dr. Kapil Rao',
      title: 'Professor at BCAS',
      email: 'kapil.rao@bcas.du.ac.in',
    },
    {
      name: 'Dr. Neha Singh',
      title: 'Assistant Professor at BCAS',
      email: 'neha.singh@bcas.du.ac.in',
    },
  ];

  return (
    <Card className="border-2 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <UserCheck className="w-8 h-8 text-primary" />
          References
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {references.map((reference, index) => (
          <div key={index} className="p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
            <h4 className="font-bold text-lg mb-1">{reference.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{reference.title}</p>
            <a
              href={`mailto:${reference.email}`}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              {reference.email}
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
