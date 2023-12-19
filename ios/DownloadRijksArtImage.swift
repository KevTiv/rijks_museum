//
//  DownloadRijksArtImage.swift
//  rijks_museum
//
//  Created by Kevin Tivert on 18/12/2023.
//  Download Riks Museum Art Piece assets to photo gallery

import Foundation
import Photos
import React

@objc(DownloadRijksArtImage)
class DownloadRijksArtImage: RCTEventEmitter {

  @objc
  func downloadImage(_ urlString: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let url = URL(string: urlString) else {
      reject("URL_ERROR", "Invalid URL", nil)
      return
    }

    let task = URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
      guard let self = self else { return }

      if let error = error {
        reject("DOWNLOAD_ERROR", "Could not download the image: \(error.localizedDescription)", error)
        return
      }

      guard let data = data, let image = UIImage(data: data) else {
        reject("DATA_ERROR", "No data or data could not be converted to image", nil)
        return
      }

      self.saveImageToPhotos(image, resolve: resolve, reject: reject)
    }
    task.resume()
  }
  
  // MARK: - Save image to photo gallery
  private func saveImageToPhotos(_ image: UIImage, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if #available(iOS 14, *) {
      PHPhotoLibrary.requestAuthorization(for: .addOnly) { status in
        switch status {
        case .authorized, .limited:
          self.performSave(image, resolve: resolve, reject: reject)
        default:
          reject("PERMISSION_DENIED", "Access to the photo library was denied", nil)
        }
      }
    } else {
      // Fallback on earlier versions
      PHPhotoLibrary.requestAuthorization { status in
        if status == .authorized {
          self.performSave(image, resolve: resolve, reject: reject)
        } else {
          reject("PERMISSION_DENIED", "Access to the photo library was denied", nil)
        }
      }
    }
  }

  // MARK: - Retrieve Image URL
  func getURLFromLocalIdentifier(_ localIdentifier: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
      // Extracting only the UUID part of the localIdentifier
      let identifierComponents = localIdentifier.components(separatedBy: "/")
      guard let uuidString = identifierComponents.first else {
          reject("INVALID_IDENTIFIER", "Invalid local identifier format.", nil)
          return
      }

      let fetchResult = PHAsset.fetchAssets(withLocalIdentifiers: [uuidString], options: nil)
      if let asset = fetchResult.firstObject {
          let options = PHImageRequestOptions()
          options.version = .original
          options.isSynchronous = true
          options.deliveryMode = .highQualityFormat

          let targetSize = CGSize(width: asset.pixelWidth, height: asset.pixelHeight)
          PHImageManager.default().requestImage(for: asset, targetSize: targetSize, contentMode: .aspectFill, options: options) { image, _ in
              guard let image = image, let data = image.jpegData(compressionQuality: 1.0) else {
                  reject("IMAGE_CONVERSION_ERROR", "Could not convert the asset to JPEG data.", nil)
                  return
              }

              // Saving image to temporary directory
              let fileManager = FileManager.default
              let tempDirectory = NSTemporaryDirectory()
              let fileName = UUID().uuidString + ".jpg"
              let fileURL = URL(fileURLWithPath: tempDirectory).appendingPathComponent(fileName)

              do {
                  try data.write(to: fileURL)
                  resolve(fileURL.absoluteString)
              } catch {
                  reject("FILE_WRITE_ERROR", "Could not write image file: \(error.localizedDescription)", nil)
              }
          }
      } else {
          reject("NO_ASSET", "No asset found for the provided identifier.", nil)
      }
  }


  private func performSave(_ image: UIImage, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    var localIdentifier: String?
    PHPhotoLibrary.shared().performChanges({
      let creationRequest = PHAssetChangeRequest.creationRequestForAsset(from: image)
      localIdentifier = creationRequest.placeholderForCreatedAsset?.localIdentifier
    }, completionHandler: { success, error in
      if let error = error {
        reject("SAVE_ERROR", "Could not save the image: \(error.localizedDescription)", error)
        return
      }
      if let savedLocalIdentifier = localIdentifier {
        self.getURLFromLocalIdentifier(savedLocalIdentifier, resolver: resolve, rejecter: reject)
              } else {
        reject("SAVE_ERROR", "Could not save the image", nil)
      }
    })
  }

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return []
  }

}
