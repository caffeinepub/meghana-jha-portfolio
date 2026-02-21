import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <Card className="border-2 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <Mail className="w-8 h-8 text-primary" />
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
            <a
              href="tel:7879010587"
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              +91 7879010587
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
            <a
              href="mailto:meghana250306@gmail.com"
              className="text-lg font-semibold hover:text-primary transition-colors break-all"
            >
              meghana250306@gmail.com
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
