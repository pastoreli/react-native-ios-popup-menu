# react-native-ios-popup-menu

Ios native popup menu for react-native. Falls back to ActionSheet for versions below IOS14.

## Installation

```sh
npm install react-native-ios-popup-menu
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


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
