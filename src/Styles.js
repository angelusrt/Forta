import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const lightTheme = {
  darkGrey: "#505050",
  notSoDarkGrey: "rgba(80,80,80,.75)",
  notSoLightGrey: "#C4C4C4",
  kindOfLightGrey: "#EBEBEB",
  ligthGrey: "#F9F9F9",
  white: "#FFFFFF",
  red: "#BF2E2E",
  green: "#2DCC54",
  yellow: "#D9B225"
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: { 
      backgroundColor: "#F9F9F9"
    },
    card: {
      marginHorizontal: wp("5%"),
      marginVertical: wp("2.5%"),
      borderRadius: 30,
      backgroundColor: lightTheme.white,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    cardContentWrapper: {
      padding: wp("5%")
    },
    bottomWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rigthButtonsWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: "flex-end",
    },
    title: {
      fontFamily: "Poppins",
      fontSize: wp("4.5%"),
      color: lightTheme.darkGrey
    },
    bodyText: {
      fontFamily: "Roboto-Regular",
      fontSize: wp("4%"),
      marginBottom: wp("5%"),
      lineHeight: 20,
      color: lightTheme.notSoDarkGrey
    },
    nameText: {
      fontFamily: "Poppins",
      fontSize: wp("4%"),
      color: lightTheme.notSoDarkGrey
    },
    forumText: {
      fontFamily: "Roboto-Bold",
      fontSize: wp("3.5%"),
      color: lightTheme.notSoLightGrey
    },
    rateText: {
      fontFamily: "Poppins",
      fontSize: wp("4.5%")
    },
    iButton: {
      flexDirection: "row",
      alignItems: "center",

      paddingTop: wp("2.5%"),
      paddingBottom: wp("2.5%"),
      paddingLeft: wp("2.5%"),
      paddingRight: wp("5%"),

      borderRadius: 20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,

      borderWidth: wp(".5%"),
      borderLeftWidth: 0,
      borderColor: lightTheme.notSoLightGrey,
      backgroundColor: lightTheme.white,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,

      position: "absolute",
      bottom: wp("5%")
    }
});