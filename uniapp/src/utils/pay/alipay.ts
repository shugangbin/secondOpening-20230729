import { PayStatusEnum } from '@/enums/appEnums'
import { handleClientEvent } from '../client'

export class Alipay {
    init(name: string, pay: any) {
        pay[name] = this
    }
    openNewPage(options: any) {
        const alipayPage = window.open('', '_self')!
        alipayPage.document.body.innerHTML = options
        alipayPage.document.forms[0].submit()
    }
    async run(options: any) {
        try {
            const res = await handleClientEvent({
                H5: () => {
                    return new Promise((resolve) => {
                        this.openNewPage(options)
                        resolve(PayStatusEnum.PENDING)
                    })
                },
                OA_WEIXIN: () => {
                    return new Promise((resolve) => {
                        this.openNewPage(options)
                        resolve(PayStatusEnum.PENDING)
                    })
                }
            })
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
