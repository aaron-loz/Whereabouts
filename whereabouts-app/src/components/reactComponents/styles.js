import { StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list_container: {
      flex: 1,
      backgroundColor: '#D2EAFF'
    },
    //This is a temporary stuff:
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#8EC9FB'
    },
    title: {
      marginTop: 60,
      marginBottom: 20,
      fontSize: 20,
      textAlign: 'center',
      //backgroundColor: 'white',
      color: 'white'
    },
    itemInput: {
      height: 40,
      padding: 4,
      marginRight: 5,
      fontSize: 17,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    //___________________________ input styles ________________________//
    buttonText: {
      fontSize: 15,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 35,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    //___________________________ input styles ________________________//
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: DEVICE_WIDTH - 40,
      height: 40,
      marginHorizontal: 20,
      paddingLeft: 45,
      borderRadius: 20,
      color: '#ffffff',
    },
    inputWrapper: {
      flex: 1,
    },
    inlineImg: {
      position: 'absolute',
      zIndex: 99,
      width: 22,
      height: 22,
      left: 35,
      top: 9,
    },
    //___________________________ BG Image style ________________________//
    picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
    //___________________________ Signup styles ________________________//
    signUp_container: {
      flex: 1,
      top: 65,
      width: DEVICE_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    signUp_text: {
      color: 'white',
      backgroundColor: 'transparent',
    },
    //___________________________ Logo styles ________________________//
    logo_container: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo_image: {
      width: 160,
      height: 160,
    },
    //___________________________ Login Button styles ________________________//
    logo_text: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      marginTop: 20,
    },
    L_button_container: {
        flex: 2,
        top: -95,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    L_button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#159CDC',
      height: 40, //WIDTH
      borderRadius: 20,
      zIndex: 100,
    },
    circle: {
      height: 40, //WIDTH
      width: 40, //WIDTH
      marginTop: -40, //-WIDTH
      borderWidth: 1,
      borderColor: '#F035E0',
      borderRadius: 100,
      alignSelf: 'center',
      zIndex: 99,
      backgroundColor: '#3BA3F8',
    },
    L_text: {
      color: 'white',
      backgroundColor: 'transparent',
    },
    L_image: {
      width: 24,
      height: 24,
    },
    //________________________________row style____________________________//
    r_container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#3BA3F8',
        elevation: 2,
    },
    r_title: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold'
    },
    r_container_text: {
        flex: 1,
        color: '#FFF',
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    r_description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    r_photo: {
        height: 50,
        width: 50,
    },
    r_location: {
      fontSize: 16,
      color: '#EC1561',
      fontWeight: 'bold'
    },
    r_like:{
      height: 50,
      width: 50,
    }
  });
