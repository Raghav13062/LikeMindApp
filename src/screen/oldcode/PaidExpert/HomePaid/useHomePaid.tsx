import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DeleteEvent, GetEventPaid } from "../../../Api/apiPaidExperti";

const useHomePaid = () => {
  const navigation: any = useNavigation();
  const [getEvent, setGetEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ useEffect runs on mount
  useEffect(() => {
    fetchAllApis();
  }, []);

  // ✅ Wrapper function to call all APIs
  const fetchAllApis = async () => {
    setLoading(true);
    try {
      // Example: calling multiple APIs in parallel
      const [eventResponse] = await Promise.all([
        GetEventPaid(setLoading),
        // You can add more API calls here like:
        // AnotherApiCall(),
        // YetAnotherApiCall(),
      ]);

      if (eventResponse?.data) {
        setGetEvent(eventResponse.data);
      } else {
        console.warn("No response or invalid event data.");
      }
    } catch (error) {
      console.error("API fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete handler
  const handleDelete = async (item: any) => {
    setLoading(true);
    try {
      const response = await DeleteEvent(setLoading, item);
      if (response) {
        // Refresh after deletion
        fetchAllApis();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    navigation,
    handleDelete,
    loading,
    getEvent,
    fetchAllApis, // Expose for manual refresh if needed
  };
};

export default useHomePaid;
