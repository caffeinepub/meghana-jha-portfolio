import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type Photo = {
    id : Text;
    image : Storage.ExternalBlob;
    description : Text;
  };

  let photos = Map.empty<Text, Photo>();

  // This function adds a new photo. It requires authentication.
  public shared ({ caller }) func addPhoto(photo : Photo) : async () {
    if (caller.isAnonymous()) {
      // Trap messages are errors that terminate execution.
      // The called function cannot be continued.
      // Message is shown to the user.
      // "Unauthorized" is the default message and should be kept for security reasons.
      // Never tell users why they are unauthorized.
      // Otherwise, they could use that information to hack your system.
      // No data is returned, so rare ! is used.
      assert false;
    };
    photos.add(photo.id, photo);
  };

  // This function deletes a photo by its identifier. It requires authentication.
  public shared ({ caller }) func deletePhoto(id : Text) : async () {
    if (caller.isAnonymous()) {
      assert false;
    };
    photos.remove(id);
  };

  // This function retrieves a photo by its identifier.
  public query ({ caller }) func getPhoto(id : Text) : async ?Photo {
    photos.get(id);
  };

  // This function retrieves all the photos from the photo store.
  public query ({ caller }) func getAllPhotos() : async [Photo] {
    photos.values().toArray();
  };
};
