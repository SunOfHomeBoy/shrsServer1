import { schema, utils } from '../../foundation'

export default async function beginsV003() {
        console.log('Begins.v003')
        console.log('Begin: ' + (new Date().toString()))

        let mobiles: any = {
                //'18500287818',
                //17601047067',
                '13233806850': 10000000
                //'17600135483',
                //'18518620752',
                //'15030098661'*/
                //'13601085307': 999999999,
                /*'13601306516': 100000*/
                //'13911897528': 10000000
        }

        for (let mobile in mobiles) {
                let memberInfo = await schema.member.findOneByMobile(mobile, '86')

                if (utils.empty(memberInfo) === false) {
                        memberInfo.money0 = mobiles[mobile]
                        await schema.member.save(memberInfo)
                }
        }

        console.log('Finish: ' + (new Date().toString()))
        process.exit(0)
} 