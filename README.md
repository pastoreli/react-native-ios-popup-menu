# react-native-ios-popup-menu

Ios native popup menu for react-native. Falls back to ActionSheet for versions below IOS14.

## Installation

Using npm:

```sh
npm install react-native-ios-popup-menu
```

Using yarn:

```sh
yarn add react-native-ios-popup-menu
```

## Usage


```js
import { IosPopupMenu } from "react-native-ios-popup-menu";

// ...

<IosPopupMenu
  options={[
    { title: "Copy", icon: "doc.on.doc", id: "copy" },
    { title: "Hide", icon: "eye.slash", id: "hide" },
  ]}
  oldIosVersionCancelIndex={1}
  onSelect={(id) => console.log(`Selected: ${id}`)}
>
  <View
    style={{
      backgroundColor: "#007aff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
    }}
  >
    <Text style={{ color: "white" }}>Open Menu</Text>
  </View>
</IosPopupMenu>
```


## Reference

#### IosPopupMenuProps

| Property | Type     | Required | Description               | Version |
| :-------- | :------- | :----- | :------------------------- | :-----  |
| `testIDIos14Later` | `string` | false | TestID for ios14 or later version | IOS14+ |
| `testIDIos14Later` | `string` | false | TestID for ios13 or below version | IOS13- |
| `title` | `string` | false | Menu title |  All |
| `options` | `IosPopupMenuOptionProps[]` | true | List of menu options |  All |
| `userInterfaceStyle` | `enum('light', 'dark')	` | false | Menu theme color, if not provided, will use the system color |  All |
| `menuItemColor` | `string` | false | Menu text color, if not provided, will use the system color |  IOS13- |
| `onOptionSelect` | `(id: string) => void` | true | Callback when menu option is selected Returns the selected option id |  All |
| `onOpenMenu` | `() => void` | false | Callback when menu is opened |  All |
| `onCloseMenu` | `() => void` | false | Callback when menu is closed. Note: In IOS14+ this callback is called only when an option is selected |  All |

#### IosPopupMenuOptionProps

| Property | Type     | Required | Description               | Version |
| :-------- | :------- | :----- | :------------------------- | :-----  |
| `id` | `string` | true | Menu option identify | All |
| `title` | `string` | true | Menu option text | All |
| `titleColor` | `string` | false | Menu option text color, if not provided, will use the system color | IOS14+ |
| `icon` | `string` | false | Menu option icon. Note: only SF Symbols (Apple icons system) | IOS14+ |
| `iconColor` | `string` | false | Menu option icon color, if not provided, will use the system color | ISO14+ |
| `disabled` | `boolean` | false | Menu option disable | All |
| `destructiveButton` | `boolean` | false | Menu option destructive style | IOS13- |
| `cancelButton` | `boolean` | false | Menu option cancel style. Note: if this is not set in any option, the menu will not close without choosing an option | IOS13- |
| `onlyIos13OrBelow` | `boolean` | false | Menu option will onlly be shown on IOS13- version | IOS13- |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

