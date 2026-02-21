import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";



actor {
  include MixinStorage();

  type PhotoData = {
    id : Text;
    image : Storage.ExternalBlob;
    description : Text;
  };

  type CertificateData = {
    id : Text;
    file : Storage.ExternalBlob;
    title : Text;
  };

  let photoStore = Map.empty<Text, PhotoData>();
  let certificateStore = Map.empty<Text, CertificateData>();

  public shared ({ caller }) func addPhoto(photoData : PhotoData) : async () {
    photoStore.add(photoData.id, photoData);
  };

  public shared ({ caller }) func addCertificate(certData : CertificateData) : async () {
    certificateStore.add(certData.id, certData);
  };

  public query ({ caller }) func getPhoto(id : Text) : async ?PhotoData {
    photoStore.get(id);
  };

  public query ({ caller }) func getCertificate(id : Text) : async ?CertificateData {
    certificateStore.get(id);
  };

  public query ({ caller }) func getAllPhotos() : async [PhotoData] {
    photoStore.values().toArray();
  };

  public query ({ caller }) func getAllCertificates() : async [CertificateData] {
    certificateStore.values().toArray();
  };
};

