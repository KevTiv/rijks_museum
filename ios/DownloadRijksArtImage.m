//
//  DownloadRijksArtImage.m
//  rijks_museum
//
//  Created by Kevin Tivert on 18/12/2023.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DownloadRijksArtImage, NSObject)
RCT_EXTERN_METHOD(downloadImage:(NSString *)urlString
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
