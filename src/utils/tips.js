/**
 * Created by chenyunjie on 2017/6/28.
 */

import {showHUDLoading, hidenHUDLoading, showHUDMessage} from '/modules/hud-tips/HUD';

module.exports = {
    showTips: (msg) => {
        showHUDMessage(msg, 1500);
    },

    showLoading: (msg) => {
        showHUDLoading(msg, {});
    },

    hideLoading: () => hidenHUDLoading()

};