import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Trophy, Presentation, Users, BookOpen, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProjectsInternships() {
  const items = [
    {
      title: 'Winner, EduThon 2025',
      organization: 'Unnat Bharat Abhiyan',
      description: 'Proposed TrackEd - a student Attendance & Learning Tracking System',
      icon: Trophy,
      highlight: true,
    },
    {
      title: 'Summer Intern',
      organization: 'Yashoda Superspeciality Hospital, Kaushambi',
      description: 'Department of Microbiology and Pathology',
      icon: Briefcase,
      highlight: false,
    },
    {
      title: 'Student of Biomedical Science',
      organization: 'Bhaskaracharya College Of Applied Sciences (BCAS), New Delhi',
      description: 'Active participation in academic and research activities',
      icon: BookOpen,
      highlight: false,
    },
    {
      title: 'Published Articles',
      organization: 'Times of India',
      description: 'Two articles found a place in the Times of India newspaper',
      icon: Newspaper,
      highlight: false,
    },
  ];

  const activities = [
    'Gave presentations on current topics relevant to the curriculum',
    'Demonstrated excellent organizational skills while managing multiple tasks simultaneously',
    'Attended workshops and scientific seminars to enhance learning beyond the classroom',
    'Participated actively in group projects, contributing to successful outcomes',
    'Engaged in classroom discussions, demonstrated critical thinking skills',
    'Prepared and delivered presentations on subject-specific topics',
    'Met regularly with academic advisors to ensure progress toward educational goals',
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Briefcase className="w-10 h-10 text-primary" />
          Projects & Internships
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className={`border-2 shadow-lg transition-all hover:shadow-xl ${
                item.highlight ? 'border-primary bg-gradient-to-br from-primary/5 to-accent/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${item.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                    <p className="text-sm font-medium text-primary">{item.organization}</p>
                  </div>
                  {item.highlight && (
                    <Badge className="bg-primary">Featured</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            Academic Activities & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{activity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
