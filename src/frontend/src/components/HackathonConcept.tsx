import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Zap, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HackathonConcept() {
  const features = [
    {
      title: 'Real-Time Attendance Tracking',
      description: 'Automated attendance system using QR codes and biometric verification for accurate student presence monitoring',
    },
    {
      title: 'Learning Analytics Dashboard',
      description: 'Comprehensive analytics showing student engagement, performance trends, and learning patterns',
    },
    {
      title: 'Personalized Learning Paths',
      description: 'AI-driven recommendations for study materials and resources based on individual student performance',
    },
    {
      title: 'Parent-Teacher Integration',
      description: 'Seamless communication portal connecting parents, teachers, and students for better collaboration',
    },
    {
      title: 'Performance Insights',
      description: 'Detailed reports and visualizations helping educators identify at-risk students early',
    },
    {
      title: 'Mobile-First Design',
      description: 'Accessible on any device with responsive design ensuring usability across platforms',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Lightbulb className="w-10 h-10 text-primary" />
          Hackathon Concept
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </div>

      {/* Main Concept Card */}
      <Card className="border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-accent/5 mb-8">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="text-3xl mb-2 flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                TrackEd
              </CardTitle>
              <p className="text-lg text-primary font-semibold">Student Attendance & Learning Tracking System</p>
            </div>
            <Badge className="bg-primary text-lg px-4 py-2">
              EduThon 2025 Winner
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Problem Statement */}
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Problem Statement
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Traditional attendance systems are time-consuming, prone to errors, and lack integration with learning outcomes. 
              Educational institutions struggle to correlate student attendance with academic performance, making it difficult 
              to identify at-risk students early and provide timely interventions. There is a critical need for a unified 
              platform that not only tracks attendance efficiently but also provides actionable insights into student learning patterns.
            </p>
          </div>

          {/* Solution Overview */}
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Our Solution
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              TrackEd is an innovative, comprehensive platform that revolutionizes how educational institutions manage 
              attendance and monitor student learning. By combining automated attendance tracking with advanced learning 
              analytics, TrackEd provides educators with real-time insights into student engagement and performance. 
              The system uses modern technology including QR codes, biometric verification, and AI-powered analytics to 
              create a seamless experience for students, teachers, and parents alike.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Features Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">Key Features & Innovation</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 shadow-lg hover:shadow-xl transition-all hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact Statement */}
      <Card className="border-2 shadow-lg mt-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3">Expected Impact</h3>
          <p className="text-muted-foreground leading-relaxed">
            TrackEd aims to transform educational institutions by reducing administrative overhead, improving student 
            outcomes through early intervention, and fostering better communication between all stakeholders. By providing 
            data-driven insights, the platform empowers educators to make informed decisions that directly impact student 
            success and institutional effectiveness.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
