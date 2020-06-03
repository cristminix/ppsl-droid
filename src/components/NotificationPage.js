import React from 'react';
import { Dimensions,SectionList,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Session from '../app/Session';
import Store from '../app/Store';
import { NavigationEvents } from '@react-navigation/compat';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import HTML from 'react-native-render-html';
import ExamplePush from './ExamplePush';

function ___require(Row){
    console.log(row)
};
 
loadImages=(row)=>{
    console.log(row)
    return '';
}
class NotificationPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('DashboardPage');
    };
    state = {
        spinner:false,
        user_id: null,
        page: 1,
        pager: null,
        loadedPage:[],
        tableData:[],
        isLoading:false,
        photoProfiles:{}
    };
    componentDidMount(){
        console.log('did mount')
        this.onRefresh();
    }
    componentDidUpdate(){
        console.log('did update')
    }
    createNotificationItemInfo=(row,index)=>{
        // console.log(row)
         return (
             <View style={{margin:0,flexDirection:'row',backgroundColor:'#d8dce6',paddingHorizontal:20,paddingVertical:10,borderBottomColor:'#aaa',borderBottomWidth:1}}>
                <View style={{padding:5}}>
                    <Image style={{width:40,height:40,borderRadius:15}} source={{uri:row.admin_photo_64}}/>
                </View>
                    
                
                <View style={{paddingRight:30,paddingLeft:10}}>
         <Text style={{fontWeight:'bold'}}>Admin mengirim Informasi {row.title}</Text>
                    <Text>{row.time_ago}</Text>
                    {/* <Text>{row.data.lampiran}</Text> */}
                    
                    {/* <HTML html={row.data.body} imagesMaxWidth={Dimensions.get('window').width}/> */}
                </View>
            </View>
            
        )
    }
    createNotificationItem = (row,index) =>{
        if(row.topic == 'informasi'){
            return this.createNotificationItemInfo(row,index);
        }
        return (
            <View >
                <Text>{row.topic}</Text>
                <Text>{row.title}</Text>
            </View>
        )
    }
    createRowData=(row,index)=>{
        return [
            this.createNotificationItem(row,index)
        ]
    }
    loadNotification = () =>{
        if(this.state.loadedPage.indexOf(this.state.page) !== -1){
            console.log('dont load page '+ this.state.page);
            return;
        }
        const isLoading = this.state.isLoading;
        if(isLoading){
            // dont fetch if there is another fetch
            console.log('we still load the page ');

            return;
        }
        const rowDataEmpty = [`Tidak Ada data`, '' ];
        this.setState({isLoading:true});

        Store.Notifikasi.getList(this.state.user_id, this.state.page, (res)=>{
            // console.log(res)
            // const data = res.data;
            if(res.success){
                const tableData = [...this.state.tableData];
                const loadedPage = [...this.state.loadedPage];

                for(let id in res.data.records){
                    let row = res.data.records[id];
                    row.id = id; 
                    tableData.push(this.createRowData(row,id));
                }
               
                if(res.data.pager.totalRecords == 0){
                    tableData.push(rowDataEmpty);
                }
                loadedPage.push(res.data.pager.page);
                this.setState({
                    tableData:tableData,
                    pager: res.data.pager,
                    loadedPage: loadedPage
                });
            }
            // console.log(res)
        },(err)=>{
            console.log(err)
        })
    }

    onRefresh = ()=>{
        Session.getProfile((profile)=>{
            // console.log(profile)
            if(profile != null){
                this.setState({user_id:profile.user_id});

                setTimeout(()=>{
                    this.loadNotification();
                },100);
            }
        })
    }
    render(){
        let icons = {
            back :  require('../../assets/icon/chevron-left.png') 
        };
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                
                <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/>
                <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                <View>
                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Notifikasi</Text>
                    </View>
                    </LinearGradient>
                </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:0}} 
                    pagingEnabled={true}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}>
                    <ExamplePush/>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                    {
                        this.state.tableData.map((rowData, index) => {
                            return (
                            <Row data={rowData} style={styles.body} textStyle={styles.bodyText} key={index}/>
                            )
                        })
                    }
                     </Table> 
                        
                    </ScrollView>
                    </SafeAreaView>

                    </KeyboardAvoidingView>    
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
       },
       sectionHeader: {
         paddingTop: 2,
         paddingLeft: 10,
         paddingRight: 10,
         paddingBottom: 2,
         fontSize: 14,
         fontWeight: 'bold',
         backgroundColor: 'rgba(247,247,247,1.0)',
       },
       item: {
         padding: 10,
         fontSize: 18,
         height: 44,
       },
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        // flex:1,
        flexDirection:'row',
        backgroundColor:'#00A4F6',
        // color:'#FFF'
    },
    content:{
        flex:2,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius: 25,
        padding:0,
        paddingBottom:0
    }
       
});

export default NotificationPage;