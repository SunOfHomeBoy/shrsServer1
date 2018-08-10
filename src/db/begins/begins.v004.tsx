import { schema, utils } from '../../foundation'

export default async function begins004() {
        let mobileBuffers = [
                '13601358982',
                '17601047067',
                '13233806850'
        ]

        console.log('Begin: ' + (new Date().toString()))
        for (let mobile of mobileBuffers) {
                let memberInfo = await schema.member.findOneByMobile(mobile, '86')

                if (memberInfo) {
                        let count = await schema.order.remove({ openID: memberInfo.openID })
                        console.log(count)
                }
        }

        console.log('Finish: ' + (new Date().toString()))
        process.exit(0)
}