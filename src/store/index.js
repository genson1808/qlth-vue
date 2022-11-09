import { createStore } from "vuex";
import employee from "@/store/modules/employee";
import department from "@/store/modules/department";
import subject from "@/store/modules/subject";
import room from "@/store/modules/room";
import global from "@/store/modules/global";

export default createStore({
    modules: {
        employee,
        department,
        subject,
        room,
        global
    }
})