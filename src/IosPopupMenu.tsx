import type { PropsWithChildren } from 'react';
import type { HostComponent, NativeSyntheticEvent } from 'react-native';
import {
  ActionSheetIOS,
  Platform,
  requireNativeComponent,
  TouchableOpacity,
} from 'react-native';

export type IosPopupMenuOptionProps = {
  title: string;
  icon?: string;
  id: string;
};

export type IosPopupMenuProps = PropsWithChildren & {
  options: IosPopupMenuOptionProps[];
  oldIosVersionCancelIndex?: number;
  oldIosVersionDestructiveIndex?: number;
  onSelect: (id: string) => void;
};

type NativeMenuButtonProps = PropsWithChildren & {
  options: IosPopupMenuOptionProps[];
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
  children,
  options,
  oldIosVersionCancelIndex,
  oldIosVersionDestructiveIndex,
  onSelect,
}) => {
  const iosVersion = parseInt(String(Platform.Version), 10);

  const showActionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options.map((option) => option.title),
        destructiveButtonIndex: oldIosVersionDestructiveIndex,
        cancelButtonIndex: oldIosVersionCancelIndex,
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
      options={options}
      onOptionSelect={(e) => onSelect(e.nativeEvent.action)}
    >
      {children}
    </NativeMenuButton>
  );
};

export default IosPopupMenu;
