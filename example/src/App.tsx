import { View, StyleSheet, Text } from 'react-native';
import { IosPopupMenu } from 'react-native-ios-popup-menu';

export default function App() {
  return (
    <View style={styles.container}>
      <IosPopupMenu
        title="Menu Options"
        options={[
          {
            title: 'Copy',
            titleColor: '#F9B02B',
            iconColor: '#F9B02B',
            icon: 'doc.on.doc',
            id: 'copy',
            // destructiveButton: true,
          },
          {
            title: 'Save',
            titleColor: '#FF9C98',
            iconColor: '#FF9C98',
            icon: 'bookmark',
            id: 'save',
            destructiveButton: true,
          },
          {
            title: 'Share',
            titleColor: '#00D35C',
            iconColor: '#00D35C',
            icon: 'square.and.arrow.up',
            id: 'share',
          },
          {
            title: 'Cancel',
            id: 'cancel',
            cancelButton: true,
            onlyIos13OrBelow: true,
          },
        ]}
        onSelect={(id) => console.log(`Selected: ${id}`)}
        onClose={() => console.log('Menu closed')}
        onOpen={() => console.log('Menu opened')}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Open Menu</Text>
        </View>
      </IosPopupMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
