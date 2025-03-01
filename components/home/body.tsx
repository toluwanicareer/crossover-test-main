import { Pressable, StyleSheet, Text, View } from "react-native";
import { YoutubeIcon } from "../general-icons/youtube-icon";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontBold, FontMedium, FontRegular } from "@/constants/style";
import { Stat } from "./Stat";
import { CustomText } from "../shared/custom-text";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import Animated, { Easing, makeMutable, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import OutlinedText from "@kdn0325/react-native-outlined-text";

interface IAnswer {
  id: number;
  correct_options: {
    id: string;
    answer: string;
  }[];
}

export const OptionButton = ({
  option,
  isDisabled,
  onPress,
  progress,
  isCorrect,
}: {
  option: any;
  isDisabled: boolean;
  onPress: () => void;
  progress: Animated.SharedValue<number>;
  isCorrect: boolean;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    right: 0,
    backgroundColor: isCorrect ? "#28B18FB2" : "#DC5F5FB2",
  }));
  const gifPosition = useSharedValue(100);

  const gifAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: gifPosition.value }, isCorrect ? { scaleX: -1 } : { scaleY: -1 }],
  }));

  const handlePress = () => {
    onPress();
    gifPosition.value = withTiming(0, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <Pressable onPress={handlePress} style={[styles.optionButton, { backgroundColor: "rgba(255, 255, 255, 0.5)" }]} disabled={isDisabled}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />

      <Animated.Image source={isCorrect ? require("../../assets/gifs/correct.gif") : require("../../assets/gifs/wrong.gif")} style={[styles.gif, gifAnimatedStyle]} />

      <OutlinedText
        align={"left"}
        text={option.answer}
        color="#fff"
        fontSize={17}
        fontWeight={"500"}
        outlineColor={"#000"}
        shadowLine={2}
        fontFamily={FontMedium}
        customStyle={{ paddingRight: 50, paddingHorizontal: 12 }}
      />
    </Pressable>
  );
};

export const Body = (props: IQuestion) => {
  const { data } = useQuery({
    queryKey: ["answer", props.id],
    queryFn: () => axios.get(`https://cross-platform.rp.devfactory.com/reveal?id=${props.id}`).then((res) => res.data as IAnswer),
  });

  const [showResult, setShowResult] = useState(false);

  const correctAnswer = data?.correct_options[0]?.id;

  const progressValues = useMemo(() => {
    /**
     * @link https://docs.swmansion.com/react-native-reanimated/docs/advanced/makeMutable/#remarks
     * see usage above
     */
    return props.options.map(() => makeMutable(0)); // similar to useSharedValue
  }, [props.options]);

  const animateOption = useCallback(
    (id: string) => {
      if (showResult) return;

      setShowResult(true);

      const selectedOptionIndex = props.options.findIndex((option) => option.id === id);
      const isCorrect = id === correctAnswer;
      console.log(selectedOptionIndex, correctAnswer, isCorrect, id);

      // Animate the selected option's progress
      progressValues[selectedOptionIndex].value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });

      // If the selected option is incorrect, animate the correct answer's progress
      if (!isCorrect && correctAnswer) {
        const correctOptionIndex = props.options.findIndex((option) => option.id === correctAnswer);
        progressValues[correctOptionIndex].value = withTiming(1, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        });
      }
    },
    [showResult, correctAnswer, props.options, progressValues]
  );

  return (
    <View style={styles.body}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <CustomText style={styles.questionText}>{props.question}</CustomText>
          </View>
          <View style={{ gap: 24 }}>
            <View style={styles.optionContainer}>
              {props.options.map((option, index) => (
                <OptionButton
                  key={option.id}
                  option={option}
                  isDisabled={showResult}
                  onPress={() => animateOption(option.id)}
                  progress={progressValues[index]}
                  isCorrect={option.id === correctAnswer}
                />
              ))}
            </View>
            <View style={{ gap: 6 }}>
              <CustomText style={{ fontSize: 13, fontFamily: FontBold }}>{props.user.name}</CustomText>
              <CustomText style={{ fontSize: 13, fontFamily: FontRegular }}>
                {props.description.split("#")[0]} <Text style={{ fontFamily: FontBold }}>#apush</Text>
              </CustomText>
            </View>
          </View>
        </View>

        <Stat avatar={props.user.avatar} />
      </View>

      <Pressable style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <YoutubeIcon />
          <Text style={styles.footerText}>Playlist • Unit 5: {props.playlist}</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={16} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    gap: 16,
  },
  mainContainer: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flex: 1,
  },
  optionContainer: {
    gap: 8,
  },
  optionButton: {
    paddingVertical: 16,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    bottom: 0,
    right: 0,
  },
  optionText: {
    fontSize: 17,
    paddingRight: 50,
    position: "relative",
    paddingHorizontal: 12,
    zIndex: 1,
  },
  questionContainer: {
    backgroundColor: "#00000099",
    padding: 6,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 22,
    lineHeight: 26,
    flexWrap: "wrap",
  },
  footer: {
    backgroundColor: "#161616",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  footerText: {
    color: "white",
    fontFamily: FontBold,
  },
  gif: {
    position: "absolute",
    right: 0, // Align to the right edge of the container
    top: 0,
    width: 50,
    height: 50,
    zIndex: 2,
  },
});
