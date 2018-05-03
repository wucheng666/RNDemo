
import home from '../views/demo';
import fadeInView from '../views/demo/FadeInView'
import qicai from '../views/demo/Qicai'
import modalbox from '../views/demo/modalbox'
import swipeout from '../views/swipeout'


const Routes = {
    //商品管理
    Home : {screen : home},
    FadeInView : {screen : fadeInView},
    Qicai : {screen : qicai},
    Modalbox : {screen : modalbox},
    Swipeout : {screen : swipeout},

};


module.exports = Routes;
