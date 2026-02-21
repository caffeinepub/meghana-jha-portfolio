import Map "mo:core/Map";
import Text "mo:core/Text";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  // Types for photo and certificate data
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

  // Store photo data
  public shared ({ caller }) func addPhoto(photoData : PhotoData) : async () {
    photoStore.add(photoData.id, photoData);
  };

  // Store certificate data
  public shared ({ caller }) func addCertificate(certData : CertificateData) : async () {
    certificateStore.add(certData.id, certData);
  };

  // Retrieve photo data
  public query ({ caller }) func getPhoto(id : Text) : async ?PhotoData {
    photoStore.get(id);
  };

  // Retrieve certificate data
  public query ({ caller }) func getCertificate(id : Text) : async ?CertificateData {
    certificateStore.get(id);
  };
};
