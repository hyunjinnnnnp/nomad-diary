import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useDB } from "../context";
import colors from "../colors";

const View = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0px 30px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;
const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.btnColor};
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;
const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Emotion = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? "rgba(0,0,0,0.3)" : "white"};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  elevation: 5;
  padding: 2px;
  border-radius: 25px;
`;
const EmotionText = styled.Text`
  font-size: 36px;
`;

const emotions = ["🤯", "😞", "😌", "😆", "😃", "😱", "😵‍💫"];

const Write = ({ navigation: { goBack } }) => {
  const realm = useDB();
  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");
  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setEmotion(face);
  const onSubmit = () => {
    if (feelings === "" || selectedEmotion === null) {
      return Alert.alert("Please complete form.");
    }
    realm.write(() => {
      const feeling = realm.create("Feeling", {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });
    goBack();
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
            key={index}
          >
            <EmotionText key={index}>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        value={feelings}
        placeholder="Write your feelings"
        placeholderTextColor={colors.btnColor}
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
