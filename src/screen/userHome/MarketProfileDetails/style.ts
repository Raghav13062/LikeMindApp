import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  starText: {
    fontSize: 18,
    color: "#FFCC00",
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },

  section: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F39C12",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "justify",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  priceIcon: {
    height: 22,
    width: 22,
  },
  priceLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#555",
  },
  priceValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
  },

  bookButton: {
    backgroundColor: "#F39C12",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  joinedButton: {
    backgroundColor: "#B3B3B3",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  joinedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
