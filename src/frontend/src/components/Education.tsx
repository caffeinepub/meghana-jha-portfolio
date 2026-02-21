import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Education() {
  const education = [
    {
      institution: 'Bhaskaracharya College Of Applied Sciences',
      location: 'Delhi University',
      degree: 'BSc Hons. Biomedical Science',
      period: '2024 - present',
      grade: 'CGPA 8.09',
      highlight: false,
    },
    {
      institution: 'Kendriya Vidyalaya No.2 AFS Gwalior',
      degree: 'Class XII',
      period: '2023',
      grade: '88%',
      highlight: false,
    },
    {
      institution: 'Kendriya Vidyalaya No.2 AFS Gwalior',
      degree: 'Class X',
      period: '2021',
      grade: '98%',
      achievement: 'Awarded a certificate and prize money for being in the top 1.5% of students',
      highlight: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <GraduationCap className="w-10 h-10 text-primary" />
          Education
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card
            key={index}
            className={`border-2 shadow-lg transition-all hover:shadow-xl ${
              edu.highlight ? 'border-primary/50 bg-primary/5' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <GraduationCap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">{edu.institution}</h3>
                      {edu.location && (
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-medium text-primary ml-9">{edu.degree}</p>
                  {edu.achievement && (
                    <div className="flex items-start gap-2 mt-3 ml-9 p-3 bg-accent/20 rounded-lg">
                      <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{edu.achievement}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 md:ml-4">
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {edu.period}
                  </Badge>
                  <Badge className="text-sm font-bold">{edu.grade}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
