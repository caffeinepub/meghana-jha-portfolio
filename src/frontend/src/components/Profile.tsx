import { Card, CardContent } from '@/components/ui/card';
import { Microscope } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Microscope className="w-10 h-10 text-primary" />
          Profile
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </div>

      <Card className="border-2 shadow-lg">
        <CardContent className="p-8">
          <p className="text-lg leading-relaxed text-muted-foreground text-center">
            Biomedical Science Student with a strong commitment to skill development and professional growth. 
            Seeking an opportunity to gain practical exposure in clinical laboratory settings and build 
            foundational biomedical skills.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
