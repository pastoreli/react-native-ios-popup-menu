import type { PropsWithChildren } from 'react';
import type { HostComponent, NativeSyntheticEvent } from 'react-native';
import {
  ActionSheetIOS,
  Platform,
  requireNativeComponent,
  TouchableOpacity,
} from 'react-native';

export type IosPopupMenuOptionProps = {
  id: string;
  title: string;
  titleColor?: string;
  icon?: string;
  iconColor?: string;
  disabled?: boolean;
  destructiveButton?: boolean;
  cancelButton?: boolean;
  onlyIos13OrBelow?: boolean;
};

export type IosPopupMenuProps = PropsWithChildren & {
  testIDIos14Later?: string;
  testIDIos13Below?: string;
  title?: string;
  options: IosPopupMenuOptionProps[];
  userInterfaceStyle?: 'light' | 'dark';
  menuItemColor?: string;
  onOptionSelect: (id: string) => void;
  onOpenMenu?: () => void;
  onCloseMenu?: () => void;
};

type NativeMenuButtonProps = Pick<
  IosPopupMenuProps,
  | 'title'
  | 'options'
  | 'onOpenMenu'
  | 'onCloseMenu'
  | 'children'
  | 'userInterfaceStyle'
> & {
  testID?: string;
  onOptionSelect?: (event: NativeSyntheticEvent<{ action: string }>) => void;
};

const globalWithMenu = globalThis as typeof globalThis & {
  __UIMenuButtonView?: HostComponent<NativeMenuButtonProps>;
};

let NativeMenuButton: HostComponent<NativeMenuButtonProps>;
if (Platform.OS === 'ios') {
  if (!globalWithMenu.__UIMenuButtonView) {
    globalWithMenu.__UIMenuButtonView =
      requireNativeComponent<NativeMenuButtonProps>('UIMenuButton');
  }
  NativeMenuButton = globalWithMenu.__UIMenuButtonView;
}

const IosPopupMenu: React.FC<IosPopupMenuProps> = ({
  testIDIos14Later,
  testIDIos13Below,
  children,
  title,
  options,
  userInterfaceStyle,
  menuItemColor,
  onOptionSelect,
  onCloseMenu,
  onOpenMenu,
}) => {
  const iosVersion = parseInt(String(Platform.Version), 10);
  const showActionSheet = () => {
    onOpenMenu?.();
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: title,
        tintColor: menuItemColor,
        userInterfaceStyle: userInterfaceStyle,
        options: options.map((option) => option.title),
        disabledButtonIndices: options.reduce(
          (res: number[], option, index) => {
            if (option.disabled) {
              res.push(index);
            }
            return res;
          },
          []
        ),
        destructiveButtonIndex: options.reduce(
          (res: number[], option, index) => {
            if (option.destructiveButton) {
              res.push(index);
            }
            return res;
          },
          []
        ),
        cancelButtonIndex: options.findIndex((option) => option.cancelButton),
      },
      (buttonIndex) => {
        onOptionSelect(options[buttonIndex]?.id || '');
        setTimeout(() => {
          onCloseMenu?.();
        }, 100);
      }
    );
  };

  if (Platform.OS !== 'ios') {
    return null;
  }

  if (iosVersion < 14) {
    return (
      <TouchableOpacity testID={testIDIos13Below} onPress={showActionSheet}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <NativeMenuButton
      testID={testIDIos14Later}
      title={title}
      options={options.filter((option) => !option.onlyIos13OrBelow)}
      userInterfaceStyle={userInterfaceStyle}
      onOptionSelect={(e) => onOptionSelect(e.nativeEvent.action)}
      onCloseMenu={() => onCloseMenu?.()}
      onOpenMenu={() => onOpenMenu?.()}
    >
      {children}
    </NativeMenuButton>
  );
};

export default IosPopupMenu;
