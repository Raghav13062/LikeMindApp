import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const JoinCommunityModal = ({ visible, data, onClose }: any) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={localStyles.modalBG}>
        <View style={localStyles.modalBox}>
          {data && (
            <>
              <MaterialIcons
                name={data.icon || "local-cafe"}
                size={50}
                color="#6750A4"
                style={{ alignSelf: "center" }}
              />

              <Text style={localStyles.modalTitle}>{data.name}</Text>

              <Text style={localStyles.modalSub}>
                Unread Messages: {data.unread || 0}
              </Text>

              <TouchableOpacity style={localStyles.joinBtn}>
                <Text style={localStyles.joinText}>Join Community</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={localStyles.closeBtn}>
                <Text style={localStyles.closeTxt}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  modalBG: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 18,
    padding: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  modalSub: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 15,
  },
  joinBtn: {
    backgroundColor: "#6750A4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  joinText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
  closeBtn: {
    backgroundColor: "#E4DDF1",
    padding: 12,
    borderRadius: 10,
  },
  closeTxt: {
    textAlign: "center",
    fontWeight: "600",
  },
});
