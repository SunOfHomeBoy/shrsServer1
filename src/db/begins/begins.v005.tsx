import { schema, utils } from '../../foundation'

export default async function begins() {
        console.log('Begin: ' + (new Date().toString()))
        let memberBuffers = await schema.member.find({
                where: {
                        registerTime: { $gte: new Date('2018-03-24') }
                }
        })

        let documents = []
        for (let memberInfo of memberBuffers) {
                if (utils.empty(memberInfo.realname) === false) {
                        documents.push({
                                mobile: memberInfo.mobile,
                                realname: memberInfo.realname,
                                sex: memberInfo.sex
                        })
                }
        }
        utils.jsonDump('/tmp/begins.v005.json', documents)

        console.log('TOTAL:' + memberBuffers.length)
        console.log('Finish: ' + (new Date().toString()))
        process.exit(0)
}
