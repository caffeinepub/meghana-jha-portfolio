import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Image, Upload, Trash2, LogIn } from 'lucide-react';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { useGetAllPhotos } from '@/hooks/useQueries';
import { useDeletePhoto } from '@/hooks/useDeletePhoto';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function MediaGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState<string | null>(null);

  const { handlePhotoUpload } = useMediaUpload();
  const { data: photos = [], isLoading: photosLoading } = useGetAllPhotos();
  const { mutate: deletePhoto, isPending: isDeleting } = useDeletePhoto();
  const { identity, login, isLoggingIn } = useInternetIdentity();

  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

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
      setUploadProgress(percentage);
    });
    
    setIsUploading(false);
    setUploadProgress(0);
    e.target.value = '';
  };

  const handleDeleteConfirm = () => {
    if (deletePhotoId) {
      deletePhoto(deletePhotoId, {
        onSuccess: () => {
          toast.success('Photo deleted successfully!');
          setDeletePhotoId(null);
        },
        onError: () => {
          toast.error('Failed to delete photo');
        },
      });
    }
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
          <CardTitle className="text-2xl">Photos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <div className="text-center space-y-3">
                <p className="text-muted-foreground text-sm">
                  Please log in to upload photos
                </p>
                <Button
                  onClick={login}
                  disabled={isLoggingIn}
                  className="gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  {isLoggingIn ? 'Logging in...' : 'Log In'}
                </Button>
              </div>
            )}
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
                  return null;
                }
                const imageUrl = photo.image.getDirectURL();
                return (
                  <div
                    key={photo.id}
                    className="relative group rounded-lg overflow-hidden border-2 hover:border-primary transition-all aspect-square"
                  >
                    <img
                      src={imageUrl}
                      alt={photo.description}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300"
                      onClick={() => setSelectedImage(imageUrl)}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                      <p className="text-white text-sm font-medium text-center mb-3">
                        {photo.description}
                      </p>
                      {isAuthenticated && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletePhotoId(photo.id);
                          }}
                          disabled={isDeleting}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePhotoId} onOpenChange={() => setDeletePhotoId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the photo from your gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
