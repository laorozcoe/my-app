import { useState } from "react";

import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";

import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import * as Haptics from "expo-haptics";

import { Modal, Portal, Button, Icon } from "react-native-paper";
import { router } from "expo-router";

type ScannerProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const Scanner = ({ visible, setVisible }: ScannerProps) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const [iconFlash, setIconFlash] = useState("flash-off");
  const [flash, setFlash] = useState(false);

  const toggleDrawer = () => setVisible(!visible);

  const scanner = async (data: any) => {
    console.log(data);
    if (busy) return;
    setBusy(true);
    setVisible(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push(`/sfisdata?serial=${data.raw}`);
    setBusy(false);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    if (flash) {
      setFlash(false);
      setIconFlash("flash-off");
    } else {
      setFlash(true);
      setIconFlash("flash");
    }
  }

  if (!permission) {
    // Cargando permisos de la cámara.
    return <View />;
  }

  if (!permission.granted) {
    // Permisos de cámara no otorgados aún.
    return (
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={toggleDrawer}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.message}>
              Necesitamos tu permiso para mostrar la cámara.
            </Text>
            <Button onPress={requestPermission}>Conceder permiso</Button>
          </Modal>
        </Portal>
      </View>
    );
  }

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleDrawer}
          contentContainerStyle={styles.modalContainer}
        >
          <CameraView
            onBarcodeScanned={busy ? undefined : scanner} // Deshabilitar escáner si está ocupado.
            style={styles.camera}
            facing={facing}
            enableTorch={flash}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleFlash}>
                <Icon source={iconFlash} size={30}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
          <View
            style={{
              padding: 4,
            }}
          >
            <Button mode="contained" onPress={toggleDrawer}>
              Close
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal:20,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems:'center'
  },
  button: {
    alignSelf:'flex-end'
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Scanner;
