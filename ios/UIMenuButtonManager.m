#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(UIMenuButtonManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(options, NSArray)
RCT_EXPORT_VIEW_PROPERTY(onOptionSelect, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOpen, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClose, RCTBubblingEventBlock)
@end
