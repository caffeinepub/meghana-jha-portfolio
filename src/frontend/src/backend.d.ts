import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PhotoData {
    id: string;
    description: string;
    image: ExternalBlob;
}
export interface CertificateData {
    id: string;
    title: string;
    file: ExternalBlob;
}
export interface backendInterface {
    addCertificate(certData: CertificateData): Promise<void>;
    addPhoto(photoData: PhotoData): Promise<void>;
    getCertificate(id: string): Promise<CertificateData | null>;
    getPhoto(id: string): Promise<PhotoData | null>;
}
