import { defineStore } from 'pinia'
import { getConfig } from '@/api/app'

interface AppSate {
    config: Record<string, any>
}
export const useAppStore = defineStore({
    id: 'appStore',
    state: (): AppSate => ({
        config: {}
    }),
    getters: {
        getCardCodeConfig: (state) => state.config.card_code || {},
        getBulletinConfig: (state) => state.config.bulletin_config || {},
        getWebsiteConfig: (state) => state.config.website || {},
        getLoginConfig: (state) => state.config.login || {},
        getTabbarConfig: (state) => state.config.tabbar || {},
        getH5Config: (state) => state.config.webPage || {},
        getShareConfig: (state) => state.config.share || {},
        getIsShowVip: (state) => state.config.member_package_status || false,
        getChatConfig: (state) => state.config.chat || {},
        getDrawConfig: (state) => state.config.draw || {}
    },
    actions: {
        getImageUrl(url: string) {
            return url.indexOf('http') ? `${this.config.domain}${url}` : url
        },
        async getConfig(payload?: any) {
            const data = await getConfig(payload)
            this.config = data
        }
    }
})
