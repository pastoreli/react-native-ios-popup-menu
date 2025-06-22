import UIKit
import React

@objc(UIMenuButton)
class UIMenuButton: UIView {
    @objc var onOptionSelect: RCTBubblingEventBlock?
    @objc var onOpenMenu: RCTBubblingEventBlock?
    @objc var onCloseMenu: RCTBubblingEventBlock?

    @objc var title: String = "" {
        didSet {
            setupMenu()
        }
    }

    @objc var options: [[String: Any]] = [] {
        didSet {
            setupMenu()
        }
    }

    @objc var userInterfaceStyle: String? {
    didSet {
            applyMenuStyle()
        }
    }

    private let menuButton = UIButton(type: .system)

    private func applyMenuStyle() {
        guard let style = userInterfaceStyle?.lowercased() else { return }

        switch style {
          case "dark":
              menuButton.overrideUserInterfaceStyle = .dark
          case "light":
              menuButton.overrideUserInterfaceStyle = .light
          default:
              menuButton.overrideUserInterfaceStyle = .unspecified
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }

    private func commonInit() {
        menuButton.showsMenuAsPrimaryAction = true
        menuButton.backgroundColor = .clear
        menuButton.tintColor = .clear
        menuButton.setTitle("", for: .normal)

        menuButton.addTarget(self, action: #selector(menuWillOpen), for: .touchDown)

        addSubview(menuButton)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        menuButton.frame = bounds
        bringSubviewToFront(menuButton)
    }

    @objc private func menuWillOpen() {
        onOpenMenu?(["event": "openMenu"])
    }

    func hexToUIColor(_ hex: String) -> UIColor {
      var cString = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

      if cString.hasPrefix("#") {
          cString.remove(at: cString.startIndex)
      }

      if cString.count == 3 {
          cString = cString.map { "\($0)\($0)" }.joined()
      }

      guard cString.count == 6 else {
          return UIColor.label;
      }

      var rgbValue: UInt64 = 0
      Scanner(string: cString).scanHexInt64(&rgbValue)

      return UIColor(
          red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
          green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
          blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
          alpha: 1.0
      )
    }

    private func setupMenu() {
        let actions = options.map { option -> UIAction in
            let title = option["title"] as? String ?? "Untitled"
            let id = option["id"] as? String ?? ""
            let iconName = option["icon"] as? String
            let iconColor = option["iconColor"] as? String
            let isDisabled = option["disabled"] as? Bool ?? false

            var image: UIImage? = nil
            if let iconName = iconName {
                image = UIImage(systemName: iconName)
                if isDisabled {
                    image = image?.withRenderingMode(.alwaysTemplate)
                } else if let iconColor = iconColor {
                    image = image?.withTintColor(hexToUIColor(iconColor), renderingMode: .alwaysOriginal)
                }
            }
            let titleColor = option["titleColor"] as? String ?? ""

            let action = UIAction(
              title: title,
              image: image,
              attributes: isDisabled ? [.disabled] : []
            ) { _ in
                self.onOptionSelect?(["action": id])
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                    self.onCloseMenu?(["event": "closeMenu"])
                }
            }

            let attributes: [NSAttributedString.Key: Any] = [
                .foregroundColor: hexToUIColor(titleColor),
                .font: UIFont.systemFont(ofSize: 16)
            ]

            let attributed = NSAttributedString(string: title, attributes: attributes)
            action.setValue(attributed, forKey: "attributedTitle")
            return action
        }

        menuButton.menu = UIMenu(title: title, children: actions)
    }

    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        let hitView = super.hitTest(point, with: event)
        return hitView
    }
}
