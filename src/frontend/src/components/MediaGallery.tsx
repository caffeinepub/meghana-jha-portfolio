import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image, FileText, Upload } from 'lucide-react';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { useGetAllPhotos, useGetAllCertificates } from '@/hooks/useQueries';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function MediaGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { handlePhotoUpload, handleCertificateUpload } = useMediaUpload();
  const { data: photos = [], isLoading: photosLoading } = useGetAllPhotos();
  const { data: certificates = [], isLoading: certificatesLoading } = useGetAllCertificates();

  useEffect(() => {
    console.log('[MediaGallery] Render with data:', {
      photosCount: photos.length,
      certificatesCount: certificates.length,
      photosLoading,
      certificatesLoading,
      photos: photos.map(p => ({
        id: p.id,
        description: p.description,
        hasImage: !!p.image,
        imageType: typeof p.image
      })),
      certificates: certificates.map(c => ({
        id: c.id,
        title: c.title,
        hasFile: !!c.file,
        fileType: typeof c.file
      }))
    });
  }, [photos, certificates, photosLoading, certificatesLoading]);

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const description = prompt('Enter a description for this photo:') || 'Untitled';
    
    setIsUploading(true);
    setUploadProgress(0);
    
    await handlePhotoUpload(file, description, (percentage) => {
      console.log('[MediaGallery] Upload progress:', percentage);
      setUploadProgress(percentage);
    });
    
    setIsUploading(false);
    setUploadProgress(0);
    e.target.value = '';
  };

  const handleCertificateFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const title = prompt('Enter a title for this certificate:') || 'Untitled Certificate';
    
    setIsUploading(true);
    setUploadProgress(0);
    
    await handleCertificateUpload(file, title, (percentage) => {
      console.log('[MediaGallery] Upload progress:', percentage);
      setUploadProgress(percentage);
    });
    
    setIsUploading(false);
    setUploadProgress(0);
    e.target.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Image className="w-10 h-10 text-primary" />
          Gallery
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Photos & Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Certificates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="space-y-6">
              <div className="flex justify-center">
                <label htmlFor="photo-upload">
                  <Button
                    type="button"
                    disabled={isUploading}
                    onClick={() => document.getElementById('photo-upload')?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="hidden"
                />
              </div>

              {isUploading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {photosLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Loading photos...</p>
                </div>
              ) : photos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No photos uploaded yet. Upload your first photo!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo) => {
                    if (!photo.image || typeof photo.image.getDirectURL !== 'function') {
                      console.error('[MediaGallery] Invalid photo image:', photo);
                      return null;
                    }
                    const imageUrl = photo.image.getDirectURL();
                    console.log('[MediaGallery] Rendering photo:', {
                      id: photo.id,
                      description: photo.description,
                      imageUrl
                    });
                    return (
                      <div
                        key={photo.id}
                        className="relative group cursor-pointer rounded-lg overflow-hidden border-2 hover:border-primary transition-all aspect-square"
                        onClick={() => {
                          console.log('[MediaGallery] Opening photo modal:', imageUrl);
                          setSelectedImage(imageUrl);
                        }}
                      >
                        <img
                          src={imageUrl}
                          alt={photo.description}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            console.error('[MediaGallery] Image failed to load:', imageUrl);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium px-2 text-center">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <div className="flex justify-center">
                <label htmlFor="certificate-upload">
                  <Button
                    type="button"
                    disabled={isUploading}
                    onClick={() => document.getElementById('certificate-upload')?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Certificate
                  </Button>
                </label>
                <input
                  id="certificate-upload"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleCertificateFileChange}
                  className="hidden"
                />
              </div>

              {isUploading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {certificatesLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Loading certificates...</p>
                </div>
              ) : certificates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No certificates uploaded yet. Upload your first certificate!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {certificates.map((cert) => {
                    if (!cert.file || typeof cert.file.getDirectURL !== 'function') {
                      console.error('[MediaGallery] Invalid certificate file:', cert);
                      return null;
                    }
                    const fileUrl = cert.file.getDirectURL();
                    console.log('[MediaGallery] Rendering certificate:', {
                      id: cert.id,
                      title: cert.title,
                      fileUrl
                    });
                    return (
                      <div
                        key={cert.id}
                        className="relative group cursor-pointer rounded-lg overflow-hidden border-2 hover:border-primary transition-all aspect-square"
                        onClick={() => {
                          console.log('[MediaGallery] Opening certificate modal:', fileUrl);
                          setSelectedCertificate(fileUrl);
                        }}
                      >
                        <img
                          src={fileUrl}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            console.error('[MediaGallery] Certificate image failed to load:', fileUrl);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium px-2 text-center">
                            {cert.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Photo Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Photo</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Certificate Dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <img
              src={selectedCertificate}
              alt="Certificate"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
