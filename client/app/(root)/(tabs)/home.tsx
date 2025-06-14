import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bookmark,
  NotificationSvg,
  SearchDark,
  ThreeAllows,
} from "@/assets/svgs";
import SearchInput from "@/components/SearchInput";
import { data } from "@/constants";
import { useAppSelector } from "@/redux/store";
import {
  useGetAllExpensesQuery,
} from "@/react-query/queriesAndMutations";

const Home = () => {
 
const { user } = useAppSelector((state) => state.user);
  console.log(user);

  // State for search input and selected filter
 const[searchValue,setSearchValue]= useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");


  const {
    data: expenses,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllExpensesQuery();


  const expenseFilters = ["All", ...data.categories.map((c) => c.title)];


  const handleSelectFilter = (title: string) => {
    setSelectedFilter(title);
  };

  return (
    <SafeAreaView className="bg-secondary flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="h-full w-full px-6 pt-6 pb-8">
          {/* Header */}
          <View className="w-full flex-row items-center justify-between mb-10">
            <View className="flex-col gap-2">
              <Text className="text-dark text-2xl font-semibold">
                Hi {user?.username || "User"}!, 
              </Text>
              <View className="flex-col gap-0">
                <Text className="font-semibold text-[13px] text-gray-5">
                  Welcome to your Expense Tracker
                </Text>
                <Text className="font-semibold text-[13px] text-gray-5">
                  Search Below.
                </Text>
              </View>
            </View>
            <TouchableOpacity className="h-[40px] w-[40px] items-center justify-center rounded-full border-[2px] border-success p-3">
              <NotificationSvg />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <SearchInput
            iconLeft={<SearchDark />}
            iconRight={<ThreeAllows />}
            placeholder="Search for.."
            containerStyle="mb-10"
            onChangeText={(text)=>setSearchValue(text)}
          />

          {/* Banner */}
          <View className="w-full min-h-[180px] overflow-hidden relative mb-6">
            <Image
              className="w-full rounded-3xl object-contain"
              source={require("@/assets/images/home.png")}
            />
            <View className="absolute top-6 left-6 w-full">
              <Text className="text-white text-[15px] font-semibold">
                25% Off*
              </Text>
              <Text className="text-white text-[22px] font-semibold">
                Today’s Special
              </Text>
              <View className="justify-start mt-4 w-[60%]">
                <Text className="text-white text-[14px] font-semibold">
                  Get  a clear view of your expenses with our new feature.
                </Text>
              </View>
            </View>
          </View>

          {/* Filter Chips */}
          <Text className="text-xl font-bold mb-3">Expenses history For You</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {expenseFilters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectFilter(filter)}
                className={`px-6 py-1 max-h-[35px] rounded-full justify-center items-center mr-3 ${
                  selectedFilter === filter
                    ? "bg-success"
                    : "bg-light-gray-2"
                }`}
              >
                <Text
                  className={`font-bold text-[13px] ${
                    selectedFilter === filter ? "text-white" : "text-dark"
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Parking List */}
          {isLoadingAll ? (
            <Text className="text-center text-gray-500 mt-4">Loading...</Text>
          
          ) : (
            <FlatList
              data={expenses}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent:
                  expenses?.length === 1 ? "center" : "flex-start",
              }}
              className="mb-6"
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View className="min-w-[280px] min-h-[240px] bg-white rounded-[20px] mr-4 overflow-hidden shadow-secondary shadow-sm">
                    <Image
                      source={require("@/assets/images/course-placeholder.png")}
                      resizeMode="contain"
                    />
                    <View className="w-full px-3 py-2">
                      <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-orange-1 font-semibold">
                          {item.name}
                        </Text>
                        <Bookmark />
                      </View>
                      <Text className="text-dark font-semibold text-[16px] mb-2">
                        {item.amount}
                      </Text>
                      <View className="flex-row gap-3 items-center">
                        <Text className="font-bold text-[15px] text-primary">
                          ${item.description}
                        </Text>
                        <View className="h-[16px] w-[2px] bg-black" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
