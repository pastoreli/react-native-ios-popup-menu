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
  onlyIos13OrBelow?: boolean; // This is used to indicate that the option should only be shown on iOS 13 or below
};

export type IosPopupMenuProps = PropsWithChildren & {
  title?: string;
  options: IosPopupMenuOptionProps[];
  onSelect: (id: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

type NativeMenuButtonProps = PropsWithChildren & {
  title?: string;
  options: IosPopupMenuOptionProps[];
  onOptionSelect?: (event: NativeSyntheticEvent<{ action: string }>) => void;
  onOpen?: () => void;
  onClose?: () => void;
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
  children,
  title,
  options,
  onSelect,
  onClose,
  onOpen,
}) => {
  const iosVersion = parseInt(String(Platform.Version), 10);

  const showActionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options.map((option) => option.title),
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
      (buttonIndex) => onSelect(options[buttonIndex]?.id || '')
    );

  if (Platform.OS !== 'ios') {
    return null;
  }

  if (iosVersion < 14) {
    return (
      <TouchableOpacity onPress={showActionSheet}>{children}</TouchableOpacity>
    );
  }

  return (
    <NativeMenuButton
      title={title}
      options={options.filter((option) => !option.onlyIos13OrBelow)}
      onOptionSelect={(e) => onSelect(e.nativeEvent.action)}
      onClose={() => onClose?.()}
      onOpen={() => onOpen?.()}
    >
      {children}
    </NativeMenuButton>
  );
};

export default IosPopupMenu;
