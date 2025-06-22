import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Text, View, ActionSheetIOS } from 'react-native';
import { Platform } from 'react-native';
import IosPopupMenu from '../IosPopupMenu';

describe('IosPopupMenu', () => {
  describe('IOS', () => {
    beforeAll(() => {
      jest.replaceProperty(Platform, 'OS', 'ios');
    });
    describe('Ios 14 or later', () => {
      beforeAll(() => {
        jest.spyOn(Platform, 'Version', 'get').mockReturnValue('14');
      });
      it('Should render as normal', () => {
        const { queryByTestId, queryByText } = render(
          <IosPopupMenu
            testIDIos14Later="ios-popup-menu"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        expect(queryByTestId('ios-popup-menu')).toBeTruthy();
        expect(queryByText('Open Menu')).toBeTruthy();
      });
      it('should handle with menu selected', () => {
        let menuSelectedId = '';
        const { getByTestId } = render(
          <IosPopupMenu
            testIDIos14Later="ios-popup-menu"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => (menuSelectedId = id)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        const menuButton = getByTestId('ios-popup-menu');
        fireEvent(menuButton, 'onOptionSelect', {
          nativeEvent: { action: 'copy' },
        });
        expect(menuSelectedId).toBe('copy');
      });
      it('should handle with open menu', () => {
        let menuOpened = false;
        const { getByTestId } = render(
          <IosPopupMenu
            testIDIos14Later="ios-popup-menu"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
            onOpenMenu={() => (menuOpened = true)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        const menuButton = getByTestId('ios-popup-menu');
        fireEvent(menuButton, 'onOpenMenu');
        expect(menuOpened).toBe(true);
      });
      it('should handle with close menu', () => {
        let menuClosed = false;
        const { getByTestId } = render(
          <IosPopupMenu
            testIDIos14Later="ios-popup-menu"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
            onCloseMenu={() => (menuClosed = true)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        const menuButton = getByTestId('ios-popup-menu');
        fireEvent(menuButton, 'onCloseMenu');
        expect(menuClosed).toBe(true);
      });
    });
    describe('Ios 13 or below', () => {
      beforeEach(() => {
        jest.spyOn(Platform, 'Version', 'get').mockReturnValue('13');
      });
      it('should return as normal', () => {
        const { queryByTestId, queryByText } = render(
          <IosPopupMenu
            testIDIos13Below="ios-popup-menu-ios-13"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
          >
            <Text>Open Menu</Text>
          </IosPopupMenu>
        );
        expect(queryByTestId('ios-popup-menu-ios-13')).toBeTruthy();
        expect(queryByText('Open Menu')).toBeTruthy();
      });
      it('should handle with menu selected', () => {
        let menuSelectedId = '';
        const { getByTestId } = render(
          <IosPopupMenu
            testIDIos13Below="ios-popup-menu-ios-13"
            title="Menu Options"
            options={[
              { title: 'Copy', id: 'copy' },
              { title: 'Hide', id: 'hide' },
            ]}
            onOptionSelect={(id) => (menuSelectedId = id)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        const menuButton = getByTestId('ios-popup-menu-ios-13');

        const showActionSheetMock = jest
          .spyOn(ActionSheetIOS, 'showActionSheetWithOptions')
          .mockImplementation((_, callback) => {
            callback(0);
          });

        fireEvent.press(menuButton);

        showActionSheetMock.mockRestore();

        expect(menuSelectedId).toBe('copy');
      });
      it('should handle with open menu', () => {
        let menuOpened = false;
        const { getByTestId } = render(
          <IosPopupMenu
            testIDIos13Below="ios-popup-menu-ios-13"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
            onOpenMenu={() => (menuOpened = true)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        const menuButton = getByTestId('ios-popup-menu-ios-13');

        jest
          .spyOn(ActionSheetIOS, 'showActionSheetWithOptions')
          .mockImplementation((_, callback) => {
            callback(0);
          });

        fireEvent.press(menuButton);

        expect(menuOpened).toBe(true);
      });
      it('should handle with close menu', async () => {
        let menuClosed = false;
        const { getByTestId } = render(
          <IosPopupMenu
            testIDIos13Below="ios-popup-menu-ios-13"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
            onCloseMenu={() => (menuClosed = true)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        const menuButton = getByTestId('ios-popup-menu-ios-13');

        jest
          .spyOn(ActionSheetIOS, 'showActionSheetWithOptions')
          .mockImplementation((_, callback) => {
            callback(0);
          });

        fireEvent.press(menuButton);
        await waitFor(() => {
          expect(menuClosed).toBe(true);
        });
      });
    });
    describe('Android', () => {
      beforeAll(() => {
        jest.replaceProperty(Platform, 'OS', 'android');
      });
      it('should not render on Android', () => {
        const { queryByTestId } = render(
          <IosPopupMenu
            testIDIos14Later="ios-popup-menu-ios-14"
            testIDIos13Below="ios-popup-menu-ios-13"
            title="Menu Options"
            options={[{ title: 'Copy', id: 'copy' }]}
            onOptionSelect={(id) => console.log(`Selected: ${id}`)}
          >
            <View>
              <Text>Open Menu</Text>
            </View>
          </IosPopupMenu>
        );
        expect(queryByTestId('ios-popup-menu-ios-14')).toBeNull();
        expect(queryByTestId('ios-popup-menu-ios-13')).toBeNull();
      });
    });
  });
});
