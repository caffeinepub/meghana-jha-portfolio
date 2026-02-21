import { Mail, Phone } from 'lucide-react';
import { SiLinkedin, SiGithub } from 'react-icons/si';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'meghana-portfolio';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MJ
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#profile" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </a>
              <a href="#education" className="text-sm font-medium hover:text-primary transition-colors">
                Education
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
                Skills
              </a>
              <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="mailto:meghana250306@gmail.com"
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:7879010587"
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Meghana Jha. All rights reserved.
            </div>
            
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <span className="text-red-500">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
