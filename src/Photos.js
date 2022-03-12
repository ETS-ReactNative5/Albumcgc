import React, {Component, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LogBox,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomHeader} from './Component/CustomHeader';
// import { fetchHomeData, } from './redux/actions/HomeAction';
import {connect} from 'react-redux';
import APIService from './Component/APIServices';
import {AddAlbums} from './redux/actions/AddAlbums';
import {AddPhotos} from './redux/actions/AddPhotos';
import FastImage from 'react-native-fast-image';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const width = Dimensions.get("window").width;
const _ = require('lodash');


class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      Photos: [],
      data: '',
      loading: true,
      visible: false,
      imageURL: '',
      EditActive: false
    };
  }

  async componentDidMount() {
    console.log('params', this.props.route.params.Album);
    this.setState({data: this.props.route.params.Album}, () => {
      this.getdata();
    });
  }
  async getdata() {
    var List = await APIService.execute(
      'GET',
      APIService.URL + this.state.data.id + '/photos',
      null,
    );
    if (List.data) {
      this.props.AddPhotos(List);

      this.setState({Photos: List.data, loading: false});
    } else {
    }
  }

  render() {
    console.log('this.props.imageURL::', this.props.Photos);
    if (this.state.visible) {
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.visible}
          onRequestClose={() => {
            this.setState({visible:false})
          }}>
          <CustomHeader
            Left={
              <TouchableOpacity
                onPress={() => {
                  this.setState({visible: false});
                }}
                style={{
                  width: 45,
                  height: 30,
                  marginLeft: 15,
                  // backgroundColor: '#fff',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Image
                  source={require('./resources/left_arrow.png')}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: 'grey',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
            Center={
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                {this.state.EditActive ? (
                  <View
                    style={{
                      width: wp('70%'),
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => {
                        this.setState({searchdata: text}, () => {
                          var responseData = _.map(
                            this.props.Photos.data.data,
                            item => {
                              if (this.state.imageURL.id == item.id) {
                                return {
                                  ...item,
                                  title: text,
                                };
                              } else {
                                return {
                                  ...item,
                                };
                              }
                            },
                          );
                          var newdata = {success: true, data: responseData};

                          console.log('res', newdata);
                          this.props.AddPhotos(newdata);
                        });
                      }}
                      value={this.state.searchdata}
                      placeholder="Enter title"
                      placeholderTextColor="#000"
                      onSubmitEditing={a => {
                        this.setState({EditActive: false, visible: false},()=>{
                            ToastAndroid.showWithGravity(
                                "Updated Successfully",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                              );
                        });
                      }}
                      // onFocus={true}
                      autoFocus={true}
                      // keyboardType="numeric"
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'flex-start',
                      alignSelf: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: 16,
                        fontFamily: 'Corporate Rounded Bold',
                        textTransform: 'capitalize',
                      }}>
                      {this.state.imageURL.title}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            }
            Right={
              this.state.EditActive ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({EditActive: false});
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    flexDirection: 'row',
                    marginRight: 15,
                    // backgroundColor: '#fff',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                  {/* <SvgUri
                                          width={wp('8%')}
                                          height={wp('7%')}
                                          source={require('../../assets/search.svg')}
                                      /> */}
                  <Image
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: 'grey',
                        alignSelf: 'center',
                    }}
                    source={require('./resources/close.png')}
                  />

                  {/* <Image source={require('../resources/ring.png')} style={{ height: 20, width: 20, tintColor: 'grey', alignSelf: 'center' }} resizeMode='contain' /> */}
                  {/* <View style={{backgroundColor:'#6990F0', width:10,height:10, borderRadius:10,marginRight:widthPercentageToDP('-3%')}}/> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      searchdata: this.state.imageURL.title,
                      EditActive: true,
                    });
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    flexDirection: 'row',
                    marginRight: 15,
                    // backgroundColor: '#fff',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                  <Image
                    source={require('./resources/edit.png')}
                    style={{
                      height: 25,
                      width: 25,
                      tintColor: 'grey',
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                  />
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
              )
            }></CustomHeader>
          <View style={styles.modelStyle}>
            {/* <FastImage
              style={styles.fullImageStyle}
              source={{
                uri: this.state.imageURL.thumbnailUrl,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
                //   'https://raw.githubusercontent.com/AboutReact/sampleresource/master/close.png',
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <Image
              source={{uri: this.state.imageURL.url}}
              style={styles.fullImageStyle}
              resizeMode="contain"
            />
          </View>
        </Modal>
      );
    } else {
      return (
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
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{
                  width: 45,
                  height: 30,
                  marginLeft: 15,
                  // backgroundColor: '#fff',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Image
                  source={require('./resources/left_arrow.png')}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: 'grey',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
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
                    Photos
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
          <View style={{flex: 1}}>
            {/* <ScrollView> */}
            {/* <View style={{flex:1}}> */}
            <FlatList
              data={this.props.Photos && this.props.Photos.data.data}
              extraData={this.props.Photos & this.props.Photos.data.data}
              numColumns={4}
              renderItem={item => {
                return (
                  <TouchableOpacity
                    style={{margin: 2}}
                    onPress={() => {
                      this.setState({visible: true, imageURL: item.item});
                    }}>
                    <Image
                      source={{uri: item.item.thumbnailUrl}}
                      style={{
                        height: hp('12%'),
                        width: wp('22.5%'),
                        marginLeft:wp('1%'),
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />
            {/* </View> */}
            {/* </ScrollView> */}
          </View>
          {this.renderModalContent()}
        </SafeAreaView>
      );
    }
  }
  renderModalContent = () => {
    if (this.state.loading) {
      return (
        <View
          style={{
            height:
              Platform.OS === 'android'
                ? Dimensions.get('window').height
                : null,
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.08)',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ActivityIndicator color={'#000'} size="large" />
          {/* <Text style={{ marginTop: 20, fontSize: 14, fontWeight: 'bold', color: '#1D3567' }}>{this.state.progressText}</Text> */}
        </View>
      );
    } else {
      return null;
    }
  };
}

const mapStateToProps = state => {
  console.log('home props', state);
  return {
    Albums: state.Albums.DeviceIp,
    Photos: state.Photos.AddPhotos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AddAlbums: data => dispatch(AddAlbums(data)),
    AddPhotos: data => dispatch(AddPhotos(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Photos);

const styles = StyleSheet.create({
  modelStyle: {
    flex: 1,
    // height: hp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#transparent',
    margin: 10,
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    borderWidth: 1,
    width: '98%',
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    justifyContent: "flex-start",
    alignSelf: "center",
    width: width / 1.7,
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    textTransform: 'capitalize',
  },
});
