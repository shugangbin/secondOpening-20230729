import { defineStore } from 'pinia'
import { getConfig } from '~~/api/app'
import { getrechargePackage } from '~~/api/recharge'

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
        getCopyrightConfig: (state) => state.config.copyright || [],
        getQrcodeConfig: (state) => state.config.qrcode || {},
        getTabbarConfig: (state) => state.config.tabbar || {},
        getAdminUrl: (state) => state.config.admin_url,
        getIsShowVip: (state) => state.config.member_package_status || false,
        getIsShowRecharge: (state) =>
            state.config.recharge_package_status || false,
        getDrawConfig: (state) => state.config.draw || {}
    },
    actions: {
        getImageUrl(url: string) {
            return url.indexOf('http') ? `${this.config.domain}${url}` : url
        },
        async getConfig() {
            const config = await getConfig()
            this.config = config
        }
    }
})
