import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image, FileText, Upload, X } from 'lucide-react';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function MediaGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const {
    photos,
    certificates,
    uploadProgress,
    isUploading,
    handlePhotoUpload,
    handleCertificateUpload,
  } = useMediaUpload();

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const description = prompt('Enter a description for this photo:') || 'Untitled';
    await handlePhotoUpload(file, description);
    e.target.value = '';
  };

  const handleCertificateFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const title = prompt('Enter a title for this certificate:') || 'Untitled Certificate';
    await handleCertificateUpload(file, title);
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

              {photos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No photos uploaded yet. Upload your first photo!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group cursor-pointer rounded-lg overflow-hidden border-2 hover:border-primary transition-all aspect-square"
                      onClick={() => setSelectedImage(photo.imageUrl)}
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.description}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium px-2 text-center">
                          {photo.description}
                        </p>
                      </div>
                    </div>
                  ))}
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

              {certificates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No certificates uploaded yet. Upload your first certificate!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <Card
                      key={cert.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
                      onClick={() => setSelectedCertificate(cert.fileUrl)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">{cert.title}</h4>
                            <p className="text-sm text-muted-foreground">Click to view</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
