import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { successToast } from "../utils/customToast";

const THEME = {
  primary: "#F39C12",
  secondary: "#34495E",
  background: "#FFFFFF",
  textDark: "#2C3E50",
  textMuted: "#7F8C8D",
  success: "#2ECC71",
  border: "rgba(44, 62, 80, 0.1)",
};

export const JoinCommunityModal = ({ visible, data, onClose }: any) => {
  const [loading, setLoading] = React.useState(false);

  if (!data) return null;

  const isFree = data?.price == "0" || data?.price == 0;
  const priceDisplay = isFree ? "Free" : `₹ ${data.price}`;

  const onJoin = async () => {
    try {
      setLoading(true); // START LOADER

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("Token not found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://onetenbd.com/likemind/api/join-community",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            community_id: data.id,
          }),
        }
      );

      const result = await response.json();
      setLoading(false); // STOP LOADER

      if (result.success == true) {
        successToast(result.message);
        onClose();
      }
    } catch (error) {
      console.log("Join API Error:", error);
      setLoading(false);
    }
  };

    const onDei = async () => {
    try {
      setLoading(true); // START LOADER

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("Token not found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://onetenbd.com/likemind/api/delete-communities",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data.id,
          }),
        }
      );

      const result = await response.json();
      setLoading(false); // STOP LOADER

      if (result.success == true) {
        successToast(result.message);
        onClose();
      }
    } catch (error) {
      console.log("Join API Error:", error);
      setLoading(false);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.card}>

          <View style={styles.closeIndicator} />

          <Image
            source={{
              uri: data.image || "https://via.placeholder.com/150?text=Community",
            }}
            style={styles.image}
            resizeMode="cover"
          />

          <Text style={styles.title}>{data.name}</Text>

          {data.tags ? (
            <Text style={styles.tag}>#{data.tags.toUpperCase()}</Text>
          ) : null}

          <Text style={[styles.price, isFree && styles.priceFree]}>
            {priceDisplay}
          </Text>

          <View style={styles.separator} />

          <Text style={styles.desc}>
            {data.description ||
              "Join this thriving community to connect with like-minded individuals."}
          </Text>

          {/* BUTTONS */}
          <View style={styles.row}>
            
            {/* JOIN BUTTON WITH LOADER */}
            <TouchableOpacity
              style={[styles.joinBtn, loading && { opacity: 0.7 }]}
              onPress={onJoin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.joinTxt}>
                  {/* {isFree ? "Join Community" : "Enroll Now"} */}
                                 Join Community

                </Text>
              )}
            </TouchableOpacity>

            {/* CANCEL BUTTON */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeTxt}>Cancel / Close</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
};


// ============================
//        STYLES
// ============================

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: THEME.background,
    borderRadius: 20,
    padding: 25,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  closeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: THEME.border,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: THEME.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: THEME.textDark,
  },
  tag: {
    textAlign: "center",
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: "700",
    marginBottom: 10,
  },
  price: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "900",
    color: THEME.secondary,
    textAlign: "center",
  },
  priceFree: {
    color: THEME.success,
  },
  separator: {
    height: 1,
    backgroundColor: THEME.border,
    marginVertical: 15,
  },
  desc: {
    textAlign: "center",
    fontSize: 14,
    color: THEME.textMuted,
    marginBottom: 20,
    lineHeight: 20,
  },
  row: {
    flexDirection: "column",
    gap: 10,
  },
  joinBtn: {
    backgroundColor: THEME.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  joinTxt: {
    fontWeight: "800",
    fontSize: 16,
    color: "#fff",
  },
  closeBtn: {
    backgroundColor: THEME.background,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: THEME.border,
    alignItems: "center",
  },
  closeTxt: {
    fontWeight: "700",
    fontSize: 16,
    color: THEME.textMuted,
  },
});
