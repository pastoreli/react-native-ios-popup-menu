import UIKit
import React

@objc(UIMenuButton)
class UIMenuButton: UIView {
    @objc var onOptionSelect: RCTBubblingEventBlock?
    
    @objc var options: [[String: Any]] = [] {
        didSet {
            setupMenu()
        }
    }

    private let menuButton = UIButton(type: .system)

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

        addSubview(menuButton)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        // Ensure menu button fills the whole area and stays on top
        menuButton.frame = bounds
        bringSubviewToFront(menuButton)
    }

    private func setupMenu() {
        print("Setting up UIMenu with options:", options)

        let actions = options.map { option -> UIAction in
            let title = option["title"] as? String ?? "Untitled"
            let id = option["id"] as? String ?? ""
            let iconName = option["icon"] as? String
            let image = iconName != nil ? UIImage(systemName: iconName!) : nil

            return UIAction(title: title, image: image) { _ in
                self.onOptionSelect?(["action": id])
            }
        }

        menuButton.menu = UIMenu(title: "", children: actions)
    }

    // Optional: Make sure touches are hitting the button
    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        let hitView = super.hitTest(point, with: event)
        return hitView
    }
}