import { View, StyleSheet, Text } from 'react-native';
import { IosPopupMenu } from 'react-native-ios-popup-menu';

export default function App() {
  return (
    <View style={styles.container}>
      <IosPopupMenu
        options={[
          { title: 'Copy', icon: 'doc.on.doc', id: 'copy' },
          { title: 'Hide', icon: 'eye.slash', id: 'hide' },
        ]}
        oldIosVersionCancelIndex={1}
        onSelect={(id) => console.log(`Selected: ${id}`)}
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
