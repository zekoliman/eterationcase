import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Colors from '../theme/Colors';

type EterationRadioButtonProps = {
  isSelected: boolean;
  containerStyle?: ViewStyle;
  size?: number;
  buttonText: string;
};

const EterationRadioButton: React.FC<EterationRadioButtonProps> = ({
  isSelected,
  containerStyle,
  buttonText,
}: EterationRadioButtonProps) => {
  const backgroundColor = isSelected ? Colors.mainColor : Colors.white;
  return (
    <View style={[styles.radioButtonContainer, containerStyle]}>
      <View style={styles.radioView}>
        <View
          style={[styles.radioButton, {backgroundColor: backgroundColor}]}
        />
      </View>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </View>
  );
};

export default EterationRadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    marginRight: 5,
    paddingRight: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
  },
  radioView: {
    width: 16,
    height: 16,
    borderColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
  },
  radioButton: {
    padding: 4,
    borderRadius: 8,
  },
  buttonTextContainer: {
    paddingLeft: 9,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.textDark,
  },
});
