// useCommunities.ts
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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [communitiesList, setCommunitiesList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCommunities();
    fetchCategories();
  }, []);

  // ✅ Smart Filter Logic
  useEffect(() => {
    let filtered = [...communitiesList];

    // Search filter
    if (search.trim()) {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(item =>
        item?.name?.toLowerCase().includes(keyword) ||
        item?.description?.toLowerCase().includes(keyword)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        selectedCategories.includes(item.category)
      );
    }

    setFilteredList(filtered);
  }, [search, communitiesList, selectedCategories]);

  // ✅ Fetch Communities
  const fetchCommunities = async () => {
    try {
      setIsLoading(true);
      const response = await UserGetCommunitiesApi(setIsLoading);
      const data = response?.data || [];
      setCommunitiesList(data);
      setFilteredList(data);
    } catch (error) {
      console.error('Community fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await UserGetCateoryApi(setIsLoading);
      if (response?.data) setCategoryList(response.data);
    } catch (error) {
      console.error('Category fetch error:', error);
    }
  };

  // ✅ Toggle Category
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  // ✅ Clear Filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearch('');
  };

  // ✅ Add Community
  const handleSubmit = async (formData: any) => {
    try {
      setIsLoading(true);
      const params = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        privacy: formData.privacy,
        logo: formData.logo,
      };
      const response = await userAddCommunity(params, setIsLoading);
      if (response) {
        fetchCommunities();
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigation,
    isLoading,
    search,
    setSearch,
    showCreateModal,
    setShowCreateModal,
    showFilterModal,
    setShowFilterModal,
    categoryList,
    communitiesList,
    filteredList,
    selectedCategories,
    handleCategorySelect,
    handleClearFilters,
    handleSubmit,
  };
};

export default useCommunities;
