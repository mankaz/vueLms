import Vue from "vue";
import * as axios from "axios";

const guest = axios.create({
    baseURL: "http://gholeydoon.ir/bbb/public/BBBController/createMeeting/0",
    headers : {
        "Content-Type": "application/c-www-form-urlencoded",
        "X-Requested-With" : "XMLHttpRequest"
    }
});
Vue.prototype.$guest = guest;

export {guest};