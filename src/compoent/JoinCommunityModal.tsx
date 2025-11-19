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
import { useSelector } from "react-redux";
import { base_url } from "../Api";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../routes/screenName.enum";

const THEME = {
  primary: "#F39C12",
  secondary: "#34495E",
  background: "#FFFFFF",
  textDark: "#2C3E50",
  textMuted: "#7F8C8D",
  success: "#2ECC71",
  border: "rgba(44, 62, 80, 0.1)",
  danger: "#E74C3C",
};

export const JoinCommunityModal = ({ visible, data, onClose, onJoined }: any) => {
  const [loadingJoin, setLoadingJoin] = React.useState(false);

  const isLogin: any = useSelector<any>((state) => state?.auth?.userData);
const nav = useNavigation()
  // ✔ Check owner
  const isOwner = isLogin?.user_data?.id == data?.user_id;

  if (!data) return null;

  const isFree = data?.price == "0" || data?.price == 0;
  const priceDisplay = isFree ? "Free" : `₹ ${data.price}`;

  // ================= JOIN API =================
  const onJoin = async () => {
    try {
      setLoadingJoin(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) return setLoadingJoin(false);

      const response = await fetch(
        "https://onetenbd.com/likemind/api/join-community",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ community_id: data.id }),
        }
      );

      const result = await response.json();
      setLoadingJoin(false);

      if (result.success) {
        successToast(result.message);

        // Mark as joined without refreshing
        data.joined = true; 

        onJoined && onJoined(); // optional callback
        onClose();
      }
    } catch (error) {
      console.log("Join API Error:", error);
      setLoadingJoin(false);
    }
  };

   const onDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://onetenbd.com/likemind/api/delete-communities",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: data.id }),
        }
      );

      const result = await response.json();
      if (result.success) {
        nav.goBack()
        successToast("Community Deleted Successfully");
        onClose();
      }
    } catch (error) {
      console.log("Delete API Error:", error);
    }
  };
// ================= DELETE API =================
 
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

          {data.tags && <Text style={styles.tag}>#{data.tags.toUpperCase()}</Text>}

          <Text style={[styles.price, isFree && styles.priceFree]}>
            {priceDisplay}
          </Text>

          <View style={styles.separator} />

          <Text style={styles.desc}>
            {data.description ||
              "Join this community and connect with like-minded people."}
          </Text>

          {/* ================= BUTTON AREA ================= */}
          <View style={styles.row}>

            {/* ---------- OWNER OPTIONS ---------- */}
            {isOwner ? (
              <>
                <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
                  <Text style={styles.deleteTxt}>Delete Community 🗑️</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={styles.chatBtn}
                  onPress={() => console.log("Owner Chat")}
                >
                  <Text style={styles.chatTxt}>Chat Now 💬</Text>
                </TouchableOpacity> */}
              </>
            ) : (
              <>
                {/* ---------- IF JOINED SHOW CHAT ---------- */}
                {data?.joined ? (
                  <TouchableOpacity
                    
                    
 
                  >
                    <Text style={styles.chatTxt}>Joined</Text>
                  </TouchableOpacity>
                ) : (
                  /* ---------- IF NOT JOINED SHOW JOIN ---------- */
                  <TouchableOpacity
                    style={[styles.joinBtn, loadingJoin && { opacity: 0.6 }]}
                    onPress={onJoin}
                    disabled={loadingJoin}
                  >
                    {loadingJoin ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.joinTxt}>Join Community</Text>
                    )}
                  </TouchableOpacity>
                )}
              </>
            )}

            {/* CANCEL */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeTxt}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};

// ============ STYLES ==================================

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
    gap: 12,
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

  chatBtn: {
    backgroundColor: THEME.success,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  chatTxt: {
    fontWeight: "800",
    fontSize: 16,
    color: "#4CAF50",
    textAlign:"center"
  },

  deleteBtn: {
    backgroundColor: THEME.danger,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteTxt: {
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
