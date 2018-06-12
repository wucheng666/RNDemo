
import home from '/views/demo';
import fadeInView from '/views/demo/FadeInView'
import qicai from '/views/demo/Qicai'
import modalbox from '/views/demo/modalbox'
import swipeout from '/views/swipeout'

import modulesdemo from '/views/modulesdemo';
import iflatlist from '/views/modulesdemo/iflatlist'
import sidesLip from '/views/modulesdemo/sideslip'


const Routes = {
    //商品管理
    Home : {screen : home},
    FadeInView : {screen : fadeInView},
    Qicai : {screen : qicai},
    Modalbox : {screen : modalbox},
    Swipeout : {screen : swipeout},

    modulesdemo: {screen: modulesdemo},
    IFlatlist : {screen : iflatlist},
    SidesLip : {screen : sidesLip},

};


module.exports = Routes;
