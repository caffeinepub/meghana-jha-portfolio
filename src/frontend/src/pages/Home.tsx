import Layout from '@/components/Layout';
import Profile from '@/components/Profile';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import ProjectsInternships from '@/components/ProjectsInternships';
import HackathonConcept from '@/components/HackathonConcept';
import Skills from '@/components/Skills';
import Hobbies from '@/components/Hobbies';
import Languages from '@/components/Languages';
import References from '@/components/References';
import MediaGallery from '@/components/MediaGallery';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(74,222,128,0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
                <img
                  src="/assets/generated/profile-photo.dim_400x400.png"
                  alt="Meghana Jha"
                  className="relative w-64 h-64 rounded-full object-cover border-4 border-background shadow-2xl"
                />
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  MEGHANA JHA
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl">
                Student of Biomedical Science at University of Delhi
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Profile />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Education />
        </div>
      </section>

      {/* Projects & Internships Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ProjectsInternships />
        </div>
      </section>

      {/* Hackathon Concept Section */}
      <section id="hackathon" className="py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <HackathonConcept />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Skills />
        </div>
      </section>

      {/* Media Gallery Section */}
      <section id="gallery" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <MediaGallery />
        </div>
      </section>

      {/* Hobbies & Languages Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Hobbies />
            <Languages />
          </div>
        </div>
      </section>

      {/* Contact & References Section */}
      <section id="contact" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Contact />
            <References />
          </div>
        </div>
      </section>
    </Layout>
  );
}
