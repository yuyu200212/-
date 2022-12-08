const state = {
    isCollapse:false,
}

const mutations={
    setCollapse(state){
        state.isCollapse = !state.isCollapse
    }
}


export default {
    namespaced: true,
    state,
    mutations,
}