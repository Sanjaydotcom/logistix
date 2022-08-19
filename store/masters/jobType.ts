import { defineStore } from 'pinia'
import { URL } from '~~/composables/api'
import { useFetch } from '@vueuse/core'

interface ServiceTypeState {
    treeViewData: any
    isLoading: any
    pageNum: number
    pageSize: number
    sortBy: string
    treeFetchStatus: boolean
}
const state = () => ({
    treeViewData: [],
    isLoading: false,
    pageNum: 0,
    pageSize: 1000,
    sortBy: 'id',
    treeFetchStatus: false
})
const getters = {
    getTreeViewData: (state: ServiceTypeState) => {
        return () => state.treeViewData
    }
}
export const useJobTypeStore = defineStore('serviceType', {
    state,
    getters,
    actions: {
        async setFetchStatus(status: boolean) {
            this.treeFetchStatus = status
        },
        async fetchData() {
            this.isLoading = true;
            const { data } = await useFetch(
                `${URL.Masters._JOBTYPE}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&sortBy=${this.sortBy}`,
            )
                .get()
                .json();
            this.treeViewData = data;
            this.treeFetchStatus = true;

        },

        async saveJobType(payload: any) {
            console.log('payload',payload);
            this.isLoading = true;
            const { data } = await useFetch(
                `${URL.Masters._JOBTYPE}`
            )
                .post(payload)
                .json();
           
            this.isLoading = false;
        },
        async editJobType(payload: any, id: number) {
            this.isLoading = true;
            const { data } = await useFetch(
                `${URL.Masters._JOBTYPE}/${id}`
            )
                .put(payload)
                .json();
           
            this.isLoading = false;
        },
        async deleteJobType(id: number) {
            this.isLoading = true;
            const { data } = await useFetch(
                `${URL.Masters._JOBTYPE}/${id}`
            )
                .delete()
                .json();
           
            this.isLoading = false;
        },
    }

})

export default useJobTypeStore