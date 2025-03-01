import { Header } from "@/components/home";
import { Question } from "@/components/home/question";
import { Error } from "@/components/shared/error";
import { Loading } from "@/components/shared/loading";
import { useTimer } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View, ViewToken } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

async function getQuestion() {
  return axios.get("https://cross-platform.rp.devfactory.com/for_you").then((res) => res.data as IQuestion);
}

export default function Home() {
  const { formattedTime, resetTimer } = useTimer();
  const insets = useSafeAreaInsets();
  const [questions, setQuestion] = useState<IQuestion[]>([]);
  const isLoadingMore = useRef(false);
  const { data, isLoading, refetch, isFetching, error } = useQuery<IQuestion>({
    queryKey: ["question"],
    queryFn: async () => {
      const data = await getQuestion();
      setQuestion([data]);
      return data;
    },
  });

  const loadMore = useCallback(async () => {
    if (!data || isLoadingMore.current) return;

    isLoadingMore.current = true;
    try {
      const data = await getQuestion();
      setQuestion((prevItems) => [...prevItems, data]);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      isLoadingMore.current = false;
    }
  }, [data]);

  const handleScroll = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const lastVisibleIndex = info.viewableItems[info.viewableItems.length - 1]?.index ?? 0;

      // Reset timer when scrolling to a new question
      if (info.changed.length > 0) {
        resetTimer();
      }

      if (lastVisibleIndex >= questions.length - 1) {
        loadMore();
      }
    },
    [loadMore, questions.length]
  );

  if (error) return <Error refetching={isFetching} onRefetch={refetch} error="Something went wrong" />;

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Header formattedTime={formattedTime} style={[styles.headerStyle, { top: insets.top }]} />
      <FlatList
        keyExtractor={(item, index) => index.toString()} //there were repeated questions, so index is being used as the key
        onViewableItemsChanged={handleScroll}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 100,
        }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        data={questions}
        renderItem={({ item }) => <Question {...(item as IQuestion)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerStyle: {
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: 20,
  },
});
