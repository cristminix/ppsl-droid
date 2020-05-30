import React from 'react';
import { ActivityIndicator,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomNavigation from './BottomNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import Helper from '../app/Helper';
import { NavigationEvents } from '@react-navigation/compat';
import { Dropdown } from './my-react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Store from '../app/Store';

class TransaksiPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('DashboardPage');
    };
    state = {
        user_id: null,
        pager:null,
        isLoading:false,
        loadedPage:[],
        selectedStatusPel:'prospek',
        search_query:'',
        search_typing: false,
        search_typingTimeout: 0,
        isLoading: false,
        tableHead :[
            (<View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>Nama</Text>
                <Image style={{width:16,height:16,marginTop:3,marginLeft:20}} source={require('../../assets/icon/icon-sort-white.png') }/>
            </View>), 
            (<View style={{flexDirection:'row'}}><Text style={{color:'#fff',fontWeight:'bold'}}>Status</Text>
                <Image style={{width:16,height:16, marginTop:3,marginLeft:20}}  source={require('../../assets/icon/icon-sort-white.png') }/>
            </View>)
        ],
        tableData : [],
        page:1,
        statusPelanggan : [
            { label : 'Prospek', value: 'prospek' }, 
            { label : 'Survey', value: 'survey' }, 
            { label : 'Pelanggan', value: 'pelanggan' },           
            { label : 'Batal', value: 'batal' }
        ],
        actionLabels : [
            { label : 'Ubah', value: 'edit' },
            { label : 'Detail', value: 'detail' },
            { label : 'Batal', value: 'cancel' }
        ]
    }
    createRowData = (row, index)=>{
        return [
            this.TDPelangganEL(row,index),
            this.StatusPelangganEl(row,index) 
        ];
    }
    loadGridData = () => {
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
        
        Store.Pelanggan.getList(this.state.user_id, this.state.selectedStatusPel,this.state.page, this.state.search_query,(res)=>{
            // console.log(res);
            if(res.success){
                
                const tableData = [...this.state.tableData];
                const loadedPage = [...this.state.loadedPage];

                res.data.records.forEach((row,index)=>{
                    tableData.push(this.createRowData(row,index));
                });
                if(res.data.records.length == 0){
                    tableData.push(rowDataEmpty);
                }
                loadedPage.push(res.data.pager.page);
                this.setState({
                    tableData:tableData,
                    pager: res.data.pager,
                    loadedPage: loadedPage
                });
            }
            this.setState({isLoading:false});

        },(error)=>{
            this.setState({isLoading:false});

        }); 
    }
    onRefresh = () =>{
        
        Session.userData('profile',(profile)=>{
            if(profile !=  null){
                this.setState({user_id:profile.user_id});   
                this.loadGridData();     
            }
        });   
        
    }
    addPelanggan = () =>{

    }
    setSelectedStateValue = (ddlValue) =>{
        this.setState({
            selectedStatusPel:ddlValue
        });
        setTimeout(()=>{
            // reset pager
            this.setState({
                page: 1,
                tableData:[],
                pager: null,
                loadedPage:[]
            });
            this.onRefresh();
        },200)
    }
    onTypingSearchQuery = (e) => {
    
        if (this.state.search_typingTimeout) {
           clearTimeout(this.state.search_typingTimeout);
        }
        console.log(e.nativeEvent.key);
        this.setState({
           search_typing: false,
           search_typingTimeout: setTimeout( () => {
               this.onSearchQuery(true);
           }, 5000)
        });
    } 
    onSearchQuery = (isClear) =>{
        if(typeof isClear == 'undefined'){
            isClear = false;
        }
        if(this.state.search_query != '' || isClear === true){
            this.setState({
                page: 1,
                tableData:[],
                pager: null,
                loadedPage:[]
            });
            setTimeout(()=>{
                this.loadGridData();
            },100);
        }
    }
    _validateInput = () =>{

    }
   
    TDPelangganEL = (pel,key) => {
        return (
            <View style={styles.tdPelanggan} key={key}>
                <Text style={styles.namaPel}>{pel.nama}</Text>
                <Text style={styles.nikPel}>{pel.nik}</Text>
                <Text style={styles.kkPel}>{pel.no_kk}</Text>
            </View>
        )
    }
    onRowAction = () => {

    }
    
    StatusPelangganEl = (pel,key) =>{
        const statusPel=pel.status_pelanggan;
        let statusTextList = {
            prospek : 'Prospek',
            survey : 'Survey',
            pelanggan : 'Pelanggan',
            batal : 'Batal' 
        };
        let containerStyle = `conStt${statusTextList[statusPel]}`;
        let statusTextStyle = `stt${statusTextList[statusPel]}`;
        return (
            <View key={key} style={{flexDirection:'row'}}>
                <View style={[styles.bdRadius5,styles.sttBox,styles[containerStyle]]}>
                    <Text style={[styles[statusTextStyle],styles.whiteText]}>{statusTextList[statusPel]}</Text>
                </View>
                <View style={styles.gridAction}>
                    
                    <Dropdown data={this.state.actionLabels} value={''} 
                    style={{color:'#007EFF',fontWeight:'bold',zIndex:1000, padding:40}}
                    fontSize={14} itemColor={'#007EFF'} useNativeDriver={true} 
                    containerStyle={{ paddingHorizontal:20,height:50}}
                    baseColor={'#007EFF'} rippleMarginTop={-10} rippleMarginLeft={0} rippleWidth={40} rippleHeight={40}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }} 
                    onChangeText={(value,index,data)=>{ console.log(value,index,data)} } 
                    triangleImage={require('../../assets/icon/icon-tri-dot-gray.png')}
                    />
                </View>
            </View>
        )
    }
    _onMomentumScrollEnd = (e) => { 
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrolViewHeight + scrollPosition;
        // check if scrollView is scrolled to bottom and limit itemToRender to data length
        // && this.state.itemToRender <= this.state.data.length
        if (isScrolledToBottom >= (contentHeight-50)  ) {
            // this.setState({ itemToRender: this.state.itemToRender + 20 })
            // console.log('load data')
            const pager = this.state.pager;
            let page  = this.state.page;
            if(pager != null){
                page = pager.nextPage;
                this.setState({page:page});
                setTimeout(()=>{
                    this.loadGridData();
                },100);
            }
        }
     }  
    render(){
        const { navigation } = this.props;
        let icons = {
            back : require('../../assets/icon/chevron-left.png') ,
            plus : require('../../assets/icon/icon-plus-white.png') ,
            down : require('../../assets/icon/icon-chevron-down-blue.png'),
            search : require('../../assets/icon/icon-search-white.png'),
            
        };
        let refreshIndicator = (<View/>);
        let topRefreshIndicator = (<View/>);
        let bottomRefreshIndicator = (<View/>);
        if (this.state.isLoading) {
            refreshIndicator = (
                
                <View style={{marginBottom:20 }}>
                <ActivityIndicator size={'large'}/>
                </View>
            );
        }
        if(this.state.page == 1){
            topRefreshIndicator = refreshIndicator;
        }
        if(this.state.page > 1){
            bottomRefreshIndicator = refreshIndicator;
        }
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle}/>
                <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                <View>
                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Daftar Pelanggan</Text>
                    </View>
                    <View style={{paddingHorizontal:10,paddingVertical:0, marginTop:20,position:'absolute',right:10}}>
                        <TouchableHighlight underlayColor='transparent' onPress={()=>{this.addPelanggan()}} >
                            <Image style={{width:22}} source={icons.plus}/>
                        </TouchableHighlight>
                    </View>
                    </LinearGradient>

                    <View style={{backgroundColor:'white',padding:20,marginBottom:10}}>
                             
                            <Dropdown data={this.state.statusPelanggan} value={this.state.selectedStatusPel} 
                            style={{color:'#007EFF',fontWeight:'bold',zIndex:1000, padding:40}}
                                    fontSize={14} itemColor={'#007EFF'} useNativeDriver={true} 
                                    containerStyle={{borderWidth:1,borderColor:'#007EFF',borderRadius:10, paddingHorizontal:20,height:50}}
                                    baseColor={'#007EFF'} rippleMarginTop={-15} rippleMarginLeft={-20} 
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }} 
                                    onChangeText={(value,index,data)=>this.setSelectedStateValue(value)} />
                        </View>
                        
                        <View style={styles.formGroup}>
                            <TouchableHighlight underlayColor='transparent' onPress={()=>{this.onSearchQuery()}} style={styles.iconSearch}>
                                <Image  source={icons.search}/>
                            </TouchableHighlight> 
                            <TextInput style={styles.textInputSearch}
                            value={this.state.search_query}
                            onChangeText={( search_query ) => this.setState({ search_query })}
                            onKeyPress={this.onTypingSearchQuery}
                            placeholder={this.state._isearcg_placeHolderText}
                            onFocus={this._onInputSeacrchFocus}
                            onBlur={this._onInputSearchBlur}
                            placeholderTextColor="#CACACC"
                            autoCapitalize = 'none'/>
                                  
                        </View>
                </View>
                    <SafeAreaView style={styles.content}>
                    <View style={styles.container}>

                    <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{marginBottom:-60,height:50,borderTopLeftRadius:10,borderTopRightRadius:10},styles.headerGradient]}/>   
                    <Table borderStyle={{borderColor: 'transparent'}} style={{marginBottom:20}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.headerText}/>
                    </Table>
                    {topRefreshIndicator}    
                    <ScrollView style={{padding:0}} 
                    pagingEnabled={true}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}>
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
                    {bottomRefreshIndicator}    
                    </View>
                    </SafeAreaView>
                 <BottomNavigation activeMenu="TransaksiPage" navigation={navigation}/>
            </KeyboardAvoidingView>    
        );
    }
}
const styles = StyleSheet.create({
    gridBtn:{padding:4,justifyContent:'center',marginLeft:30},
    sttBox:{paddingVertical:10,paddingHorizontal:15,justifyContent:'center',alignItems:'center'},
    tdPelanggan:{marginVertical:10,paddingHorizontal:15},
    btn:{padding:2},
    bdRadius5:{borderRadius:5},
    whiteText:{color:'white',textAlign:'center'},
    gridAction:{},
    sttProspek:{},
    sttSurvey:{},
    sttPelanggan:{},
    sttBatal:{},
    conSttProspek:{backgroundColor:'#4ABAF3'},
    conSttSurvey:{backgroundColor:'#FEAA7C'},
    conSttPelanggan:{backgroundColor:'#87E6CD'},
    conSttBatal:{backgroundColor:'#FF7070'},
    namaPel:{color:'#009EEE',fontWeight:'bold',lineHeight:16,marginBottom:5},
    nikPel:{lineHeight:16,marginBottom:5},
    kkPel:{lineHeight:16,marginBottom:5},
  headerText:{color:'#fff',fontWeight:'bold' },  
   container: { flex: 1, padding: 16, paddingTop: 5, backgroundColor: '#fff' },
  head: { height: 60,paddingHorizontal:15,paddingTop:10},
  td: {paddingHorizontal:15 ,paddingVertical:15},
  row: { flexDirection: 'row' ,backgroundColor:'#F8F7FC',marginBottom:5},
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
    gridContainer:{
        backgroundColor:'#fff'
    },  
    iconSearch:{
        width:16,
        height:16,
        position:'absolute',
        marginLeft:40,
        marginTop:28,
        zIndex:1
    },
    textInputSearch:{
        borderRadius:20,
        backgroundColor:'#F8F7FC',
        marginVertical:10,
        padding: 10,
        paddingLeft: 50},
    dd:{borderWidth:1,borderColor:'#007EFF',color:'#007EFF',borderRadius:5,fontSize:20,fontWeight:'bold',paddingLeft:10},
    imagePreview:{
        width:100,
        height:100,
        marginBottom:5
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
        
        borderTopLeftRadius:25,
        borderTopRightRadius: 25,
       
    },
    photoUploadWrp:{
        backgroundColor:'white',
        borderRadius:5,
        borderColor:'#EFEFEF',
        borderWidth:1,
        padding:20,
        marginTop:20,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    headerTitle:{
        flex:1,
        color:'#36227C',
        fontWeight:'bold',
        fontSize:20
    },
    logo:{
        flex:2,
        resizeMode:'contain',
        marginTop:10
    },
    
    defaultText:{
        // fontSize:12,
        // letterSpacing:-0.02
    },
    anchor:{
        color:'#009EEE',
        textDecorationLine:'underline'
    },
    anchorRight:{
        color:'#009EEE',
        textDecorationLine:'underline',
        textAlign:'right'
    },
    anchorCenter:{
        color:'#009EEE',
        textDecorationLine:'underline',
        textAlign:'center'
    },
    anchorBold:{
        color:'#009EEE',
        fontWeight:'bold'
    },
    welcomeText:{
        color:'#3A3E4A',
        fontWeight:'bold',
        fontSize:16,
    },  
    info:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    help:{
        // paddingVertical:8,
        flexDirection:'row',
        justifyContent:'center'
    },
    formGroup:{
        paddingVertical:2,
        paddingHorizontal:20,
        backgroundColor:'white'
    },
    btnLogin:{
        backgroundColor:'#CACACC',
        borderRadius:50,
        padding:12,
        marginTop:10
    },
    btnLoginText:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
    btnRegister:{
        backgroundColor:'#CACACC',
        borderRadius:50,
        padding:12,
        marginTop:10,
        marginBottom:40
    },
    btnRegisterText:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
    btnUpload:{
        borderColor:'#009EEE',
        borderWidth:1,
        borderRadius:5,
        padding:12,
        marginTop:10

    },
    btnUploadText:{
        color:'#009EEE',
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
    textInput:{
        paddingVertical:10,
        paddingHorizontal:5,
        fontSize:14
    },
    inlineIcon:{
        position:'relative',
        margin:4
    },
    formIcon:{
        position:'absolute',
        marginTop:20,
        right:0
    },
    formIconClose:{
        position:'absolute',
        marginTop:0,
        right:0,
        
        width:40,
        height:40,
        padding:10

    },
    formIconViewPass:{
        position:'absolute',
        marginTop:0,
        right:0,
        
        width:40,
        height:40,
        padding:10
    },
    formIconHidePass:{
        position:'absolute',
        marginTop:0,
        right:0,
     
        width:40,
        height:40,
        padding:10

    },
    errorMessage:{
        backgroundColor:'#e22134',
        marginVertical:15,
        alignItems:'center',
        padding:10,
        borderRadius:5,
        marginBottom:10
    }    
});

export default TransaksiPage;