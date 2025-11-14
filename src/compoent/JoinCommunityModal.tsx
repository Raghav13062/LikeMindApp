import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";

// --- Theme Definition ---
const THEME = {
  primary: "#F39C12", // Accent color (Orange/Amber)
  secondary: "#34495E", // Darker text/button color (Navy/Slate)
  background: "#FFFFFF", // Card background
  textDark: "#2C3E50", // Main text color
  textMuted: "#7F8C8D", // Description/muted text color
  success: "#2ECC71", // Used for 'Free' price
  border: "rgba(44, 62, 80, 0.1)", // Light border for subtle separation
};

export const JoinCommunityModal = ({ visible, data, onClose, onJoin }: any) => {
  if (!data) return null;

  const isFree = data?.price == "0" || data?.price == 0;
  const priceDisplay = isFree ? "Free" : `₹ ${data.price}`;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.card}>
          
          {/* Close Indicator (optional, but good practice) */}
          <View style={styles.closeIndicator} />

          {/* Community Image */}
          <Image
            source={{
              uri: data.image || "https://via.placeholder.com/150?text=Community",
            }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Title */}
          <Text style={styles.title}>{data.name}</Text>

          {/* Tag */}
          {data.tags ? <Text style={styles.tag}>#{data.tags.toUpperCase()}</Text> : null}

          {/* Price */}
          <Text style={[styles.price, isFree && styles.priceFree]}>
            {priceDisplay}
          </Text>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Description */}
          <Text style={styles.desc}>
            {data.description || "Join this thriving community to connect with like-minded individuals, share insights, and grow together. No description available."}
          </Text>

          {/* Buttons */}
          <View style={styles.row}>
            {/* Primary Action Button: Join */}
            <TouchableOpacity style={styles.joinBtn} onPress={onJoin}>
              <Text style={styles.joinTxt}>
                {isFree ? "Join Community" : "Enroll Now"}
              </Text>
            </TouchableOpacity>

            {/* Secondary Action Button: Close */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeTxt}>Cancel / Close</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

// --- Enhanced Styles ---

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)", // Darker overlay for better focus
    justifyContent: "center",
    alignItems: "stretch", // Stretch to the edges of the padding
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: THEME.background,
    borderRadius: 20, // Slightly more rounded
    padding: 25,
    elevation: 15, // Stronger shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  closeIndicator: {
    // Subtle grip bar often seen in modals
    width: 40,
    height: 4,
    backgroundColor: THEME.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100, // Slightly larger image
    height: 100,
    borderRadius: 50, // Perfect circle
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3, // Add a border matching the theme
    borderColor: THEME.primary,
  },
  title: {
    fontSize: 24, // Larger title
    fontWeight: "800",
    textAlign: "center",
    color: THEME.textDark,
    marginBottom: 4,
  },
  tag: {
    textAlign: "center",
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  price: {
    marginTop: 8,
    fontSize: 20, // Prominent price
    fontWeight: "900",
    color: THEME.secondary,
    textAlign: "center",
  },
  priceFree: {
    color: THEME.success, // Use a success color for 'Free'
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
    lineHeight: 22,
    marginBottom: 20, // More space before buttons
  },
  row: {
    flexDirection: "column", // Stack buttons for better mobile experience
    gap: 10, // Use gap for spacing between stacked elements
  },
  joinBtn: {
    // Primary Button (Join/Enroll)
    backgroundColor: THEME.primary,
    paddingVertical: 14, // Taller button
    borderRadius: 12,
    alignItems: "center",
  },
  joinTxt: {
    fontWeight: "800",
    fontSize: 16,
    color: THEME.background, // White text on colored background
  },
  closeBtn: {
    // Secondary Button (Cancel/Close)
    backgroundColor: THEME.background, // White background
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2, // Stronger border to define the button
    borderColor: THEME.border,
    alignItems: "center",
  },
  closeTxt: {
    fontWeight: "700",
    fontSize: 16,
    color: THEME.textMuted,
  },
});