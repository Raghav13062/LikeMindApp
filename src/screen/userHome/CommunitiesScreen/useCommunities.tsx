import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  userAddCommunity,
  UserGetCateoryApi,
  UserGetCommunitiesApi,
} from '../../../Api/apiRequest';

const useCommunities = () => {
  const navigation: any = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [communitiesList, setCommunitiesList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
   const [filteredList, setFilteredList] = useState<any[]>([]);

   useEffect(() => {
    fetchCommunities();
    fetchCategories();
  }, []);

  // Filter list by search keyword
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredList(communitiesList);
    } else {
      const filtered = communitiesList.filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [search, communitiesList]);

  // Fetch all communities
    const fetchCommunities = async () => {
      try {
        setIsLoading(true);
        const response = await UserGetCommunitiesApi(setIsLoading);
        if (response?.data) {
          setCommunitiesList(response.data);
          setFilteredList(response.data);
        } else {
          console.warn("No response or invalid community data.");
        }
      } catch (error) {
        console.error("Community fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await UserGetCateoryApi(setIsLoading);
      if (response?.data) {
        setCategoryList(response.data);
      } else {
        console.warn("No response or invalid category data.");
      }
    } catch (error) {
      console.error("Category fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle community form submission
  const handleSubmit = async (formData: any) => {
    try {
      const params = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        privacy: formData.privacy,
        logo: formData.logo,
      };

      setIsLoading(true);
      const response = await userAddCommunity(params, setIsLoading);

      if (response) {
        setShowCreateModal(false); // Close modal after creation
        fetchCommunities(); // Refresh list
        console.log("Community created:", response);
      }
    } catch (error) {
      console.error("Error creating community:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigation,
    isLoading,
    setIsLoading,
    showCreateModal,
    setShowCreateModal,
    search,
    setSearch,
    communitiesList,
    setCommunitiesList,
    categoryList,
    handleSubmit,
    filteredList,
  };
};

export default useCommunities;
