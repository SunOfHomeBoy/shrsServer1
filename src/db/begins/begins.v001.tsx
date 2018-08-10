import { schema, utils } from '../../foundation'
import regions from '../regions'
import custom from '../articles/custom'
import article01 from '../articles/article01'
import article02 from '../articles/article02'
import article03 from '../articles/article03'
import article04 from '../articles/article04'
import article05 from '../articles/article05'
import skill from '../configures/skill'
import banners from '../configures/banners'
import members from '../member/members'
import resumes from '../member/resumes'
import company from '../company'
import orders from '../orders/orders'
import administrators from '../administrators/administrators'

const documentBuffers: any = {
        'administrator': [
                administrators
        ],
        'configures': [
                ...regions,
                ...banners,
                skill
        ],
        'articles': [
                ...custom,
                ...article01,
                ...article02,
                ...article03,
                ...article04,
                ...article05
        ],
        'members': [
                ...members
        ],
        'resumes': [
                ...resumes
        ],
        'company': [
                ...company
        ],
        'orders': [
                ...orders
        ]
}

export default async function beginsV001() {
        console.log('Begin: ' + (new Date().toString()))

        for (let name in documentBuffers) {
                let schemaBuffers = Object(documentBuffers)[name]

                for (let document of schemaBuffers) {
                        switch (name) {
                                case 'administrator':
                                        await schema.administrator.save(document)
                                        break

                                case 'configures':
                                        await schema.configures.set(document)
                                        break

                                case 'articles':
                                        document.enable = true
                                        if (document.articleID) {
                                                document.publish = new Date([
                                                        document.articleID.substr(0, 4),
                                                        document.articleID.substr(4, 2),
                                                        document.articleID.substr(6, 2)
                                                ].join('-'))
                                        }
                                        await schema.article.save(document)
                                        break

                                case 'members':
                                        for (let key in document) {
                                                if (document[key]['$date']) {
                                                        document[key] = new Date(document[key]['$date'])
                                                }
                                        }
                                        await schema.member.save(document)
                                        break

                                case 'resumes':
                                        for (let key in document) {
                                                if (document[key]['$date']) {
                                                        document[key] = new Date(document[key]['$date'])
                                                }
                                        }
                                        document.resumeHidden = false //(process.env.NODE_ENV !== 'development')

                                        await schema.resume.save(document)
                                        break

                                case 'company':
                                        let recruits: string[] = []
                                        let welfares: string[] = []
                                        document.password = 'Jdyx88888'
                                        document.registerType = 'ENTERPRISE'
                                        for (let i = 0; i < document.recruitments.length; i++) {
                                                document.recruitments[i]._id = String(document.openID).replace('3c6e', '000' + i)
                                                document.recruitments[i].openID = document.openID
                                                document.recruitments[i].company = document.enterpriseName
                                                document.recruitments[i].address = document.enterpriseAddress
                                                document.recruitments[i].localeCountry = document.localeCountry
                                                document.recruitments[i].localeProvince = document.localeProvince
                                                document.recruitments[i].localeCity = document.localeCity
                                                document.recruitments[i].localeTown = document.localeTown
                                                document.recruitments[i].locationHomeX = document.locationHomeX
                                                document.recruitments[i].locationHomeY = document.locationHomeY

                                                recruits.push(document.recruitments[i].workName)
                                                if (document.recruitments[i].welfare instanceof Array) {
                                                        for (let item of document.recruitments[i].welfare) {
                                                                if (welfares.indexOf(item) === -1) {
                                                                        welfares.push(item)
                                                                }
                                                        }
                                                }
                                                let callback = await schema.recruitment.New(document.recruitments[i])
                                        }
                                        document.enterpriseRrecruit = recruits
                                        document.enterpriseWelfare = welfares
                                        let callback = await schema.enterprise.New(document)
                                        break

                                case 'orders':
                                        let member = await schema.member.findOneByMobile(document.openID, '86')
                                        if (utils.empty(member)) {
                                                continue
                                        }
                                        document.openID = member.openID
                                        if (utils.empty(document.orderUser) === false) {
                                                let callback = await schema.member.findOneByMobile(document.orderUser, '86')
                                                document.orderUser = callback.openID
                                        }
                                        document._id = document.orderID
                                        document.orderUpdate = new Date()
                                        document.orderStatus = 1
                                        document.orderScore = 0
                                        await schema.order.save(document)
                                        break
                        }
                }
        }

        console.log('Finish: ' + (new Date().toString()))
        process.exit(0)
}