import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {RectButton, GestureHandlerRootView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  example: {
    marginBottom: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

const GHRVInsideModal: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Open (it's RN button) - it works</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={visible}
      >
        <View style={styles.modal}>
          <RectButton onPress={() => setVisible(false)}>
            <Text>Close (it's RNGH button outside GestureHandlerRootView) - it does not work</Text>
          </RectButton>

          <GestureHandlerRootView>
            <RectButton onPress={() => setVisible(false)}>
              <Text>Close (it's RNGH button inside GestureHandlerRootView) - it works</Text>
            </RectButton>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
  );
};

const NestedGHRV: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <GestureHandlerRootView>
      <RectButton onPress={() => setVisible(true)}>
        <Text>Open (it's RNGH button) - it works</Text>
      </RectButton>

      <Modal
        animationType="slide"
        transparent
        visible={visible}
      >
        <View style={styles.modal}>
          <GestureHandlerRootView>
            <RectButton onPress={() => setVisible(false)}>
              <Text>Close (it's RNGH button inside GestureHandlerRootView) - it does not work</Text>
            </RectButton>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text>Close (it's RN button) - it works</Text>
            </TouchableOpacity>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const Example: React.FC = ({children}) => (
  <View style={styles.example}>{children}</View>
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <Example>
      <Text>
        The first example. GestureHandlerRootView wraps only the content of the
        Modal. RNGH button inside a Modal works.
      </Text>
      <GHRVInsideModal />
    </Example>

    <Example>
      <Text>
        The second example. Used nested GestureHandlerRootView. RNGH button
        inside a Modal does not work.
      </Text>
      <NestedGHRV />
    </Example>
  </SafeAreaView>
);

export default App;
