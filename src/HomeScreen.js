import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  LogBox,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  ActivityIndicator

} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomHeader} from './Component/CustomHeader';
import {connect} from 'react-redux';
import APIService from './Component/APIServices';
import {AddAlbums} from './redux/actions/AddAlbums';
import {AddPhotos} from './redux/actions/AddPhotos';

// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
// ]);

// class HomeScreen extends Component {
//   // let [Album, setAblum] = React.useState([])
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: '',
//       Albums: [],
//       loading: true
//     };
//     this.images = [];
//   }

//   async componentDidMount() {
//     this.getdata();
//   }
//   async getdata() {
//     var List = await APIService.execute('GET', APIService.URL, null);
//     if (List.success) {
//       this.setState({Albums: List.data, loading:false});
//       this.props.AddAlbums(List);
//     } else {
//     }
//     console.log('list', List);
//   }

//   render() {
//     console.log('this.props.Albums::', this.props.Albums);
//     return (
//       <SafeAreaView
//         style={{
//           flex: 1,
//           justifyContent: 'flex-start',
//           alignSelf: 'flex-start',
//           backgroundColor: '#F9F7FC',
//         }}>
//         <CustomHeader
//           Left={
//             <TouchableOpacity
//               onPress={() => {}}
//               style={{
//                 width: 35,
//                 height: 30,
//                 marginLeft: 15,
//                 // backgroundColor: '#fff',
//                 alignSelf: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 8,
//               }}>
//             </TouchableOpacity>
//           }
//           Center={
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignSelf: 'center',
//                 justifyContent: 'center',
//               }}>
//               <TouchableOpacity
//                 style={{justifyContent: 'center', alignItems: 'center'}}>
//                 <Text
//                   style={{
//                     alignSelf: 'center',
//                     justifyContent: 'center',
//                     fontWeight: 'bold',
//                     color: '#000',
//                     fontSize: 19,
//                     fontFamily: 'Corporate Rounded Bold',
//                   }}>
//                   Albums
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           }
//           Right={
//             <TouchableOpacity
//               onPress={() => {}}
//               style={{
//                 width: 35,
//                 flexDirection: 'row',
//                 height: 30,
//                 marginRight: 15,
//                 // backgroundColor: '#fff',
//                 alignSelf: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 8,
//               }}>
//               {/* <Image
//                 source={require('../resources/ring.png')}
//                 style={{
//                   height: 20,
//                   width: 20,
//                   tintColor: 'grey',
//                   alignSelf: 'center',
//                 }}
//                 resizeMode="contain"
//               /> */}
//               {/* <View
//                 style={{
//                   backgroundColor: '#6990F0',
//                   width: 10,
//                   height: 10,
//                   borderRadius: 10,
//                   marginRight: widthPercentageToDP('-3%'),
//                 }}
//               /> */}
//             </TouchableOpacity>
//           }></CustomHeader>
//         <ScrollView>
//           <View
//             style={{flex: 1, flexDirection: 'column', marginBottom: hp('2%')}}>
//             <FlatList
//               data={this.props.Albums && this.props.Albums.data && this.props.Albums.data.data}
//               extraData={this.props.Albums && this.props.Albums.data && this.props.Albums.data.data}
//               // number={2}
//               renderItem={item => {
//                 return (
//                   <TouchableOpacity
//                     style={{
//                       marginHorizontal: wp('5%'),
//                       marginVertical: wp('2%'),
//                       padding: 10,
//                       height: hp('10%'),
//                       // borderWidth: 0.4,
//                       borderRadius: 10,
//                       backgroundColor: '#FFFFFF',
//                       elevation: 20,
//                       shadowColor: '#52006A',
//                       shadowOffset: {width: -2, height: 4},
//                       shadowOpacity: 0.9,
//                       shadowRadius: 3,
//                       flex: 1,
//                       flexDirection: 'row',
//                     }}
//                     onPress={() => {
//                       this.props.AddPhotos('');
//                       this.props.navigation.navigate('Photos', {
//                         Album: item.item,
//                       });
//                     }}>
//                     <Image
//                       source={require('./resources/album.png')}
//                       style={{
//                         height: 30,
//                         width: 30,
//                         tintColor: 'grey',
//                         alignSelf: 'center',
//                       }}
//                       resizeMode="contain" 
//                     />
//                     <Text
//                       numberOfLines={2}
//                       style={{
//                         color: '#000',
//                         flex: 1,
//                         alignSelf: 'center',
//                         fontSize: 16,
//                         textTransform: 'capitalize',
//                         marginHorizontal: 10,
//                       }}>
//                       {item.item.title}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         </ScrollView>
//         {this.renderModalContent()}

//       </SafeAreaView>
//     );
//   }
//   renderModalContent = () => {
//     if (this.state.loading) {
//       return (
//         <View
//           style={{
//             height:
//               Platform.OS === 'android'
//                 ? Dimensions.get('window').height
//                 : null,
//             ...StyleSheet.absoluteFillObject,
//             backgroundColor: 'rgba(0,0,0,0.08)',
//             justifyContent: 'center',
//             alignItems: 'center',
//             alignSelf: 'center',
//           }}>
//           <ActivityIndicator color={'#000'} size="large" />
//           {/* <Text style={{ marginTop: 20, fontSize: 14, fontWeight: 'bold', color: '#1D3567' }}>{this.state.progressText}</Text> */}
//         </View>
//       );
//     } else {
//       return null;
//     }
//   };
// }

// const mapStateToProps = state => {
//   console.log('home props', state);
//   return {
//     Albums: state.Albums.DeviceIp,
//     Photos: state.Photos.AddPhotos,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     AddAlbums: data => dispatch(AddAlbums(data)),
//     AddPhotos: data => dispatch(AddPhotos(data)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


 function HomeScreen() {
  let [Albums, setAlbums] = React.useState([])
  React.useEffect(async() => {
    var List = await APIService.execute('GET', APIService.URL, null);
    if (List.success) {
      setAlbums(List.data)
      // this.setState({Albums: List.data, loading:false});
      this.props.AddAlbums(List);
    } else {
    }
    console.log('Albums', Albums);
  }, [])


    return(
      <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                backgroundColor: '#F9F7FC',
              }}>
              <CustomHeader
                Left={
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      width: 35,
                      height: 30,
                      marginLeft: 15,
                      // backgroundColor: '#fff',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
                  </TouchableOpacity>
                }
                Center={
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: 19,
                          fontFamily: 'Corporate Rounded Bold',
                        }}>
                        Albums
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                Right={
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      width: 35,
                      flexDirection: 'row',
                      height: 30,
                      marginRight: 15,
                      // backgroundColor: '#fff',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
                    {/* <Image
                      source={require('../resources/ring.png')}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: 'grey',
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    /> */}
                    {/* <View
                      style={{
                        backgroundColor: '#6990F0',
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        marginRight: widthPercentageToDP('-3%'),
                      }}
                    /> */}
                  </TouchableOpacity>
                }></CustomHeader>
              <ScrollView>
                <View
                  style={{flex: 1, flexDirection: 'column', marginBottom: hp('2%')}}>
                  <FlatList
                    data={this.props.Albums && this.props.Albums.data && this.props.Albums.data.data}
                    extraData={this.props.Albums && this.props.Albums.data && this.props.Albums.data.data}
                    // number={2}
                    renderItem={item => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginHorizontal: wp('5%'),
                            marginVertical: wp('2%'),
                            padding: 10,
                            height: hp('10%'),
                            // borderWidth: 0.4,
                            borderRadius: 10,
                            backgroundColor: '#FFFFFF',
                            elevation: 20,
                            shadowColor: '#52006A',
                            shadowOffset: {width: -2, height: 4},
                            shadowOpacity: 0.9,
                            shadowRadius: 3,
                            flex: 1,
                            flexDirection: 'row',
                          }}
                          onPress={() => {
                            this.props.AddPhotos('');
                            this.props.navigation.navigate('Photos', {
                              Album: item.item,
                            });
                          }}>
                          <Image
                            source={require('./resources/album.png')}
                            style={{
                              height: 30,
                              width: 30,
                              tintColor: 'grey',
                              alignSelf: 'center',
                            }}
                            resizeMode="contain" 
                          />
                          <Text
                            numberOfLines={2}
                            style={{
                              color: '#000',
                              flex: 1,
                              alignSelf: 'center',
                              fontSize: 16,
                              textTransform: 'capitalize',
                              marginHorizontal: 10,
                            }}>
                            {item.item.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </ScrollView>
              {this.renderModalContent()}
      
            </SafeAreaView>
    )

 }


 export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
