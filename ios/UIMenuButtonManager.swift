import Foundation
import React

@objc(UIMenuButtonManager)
class UIMenuButtonManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> UIView! {
        return UIMenuButton()
    }
}