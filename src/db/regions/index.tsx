import { province } from './province'
import { city } from './city'
import { town } from './town'
import foreigns from './foreigns'

const ab = (name: string): string => {
        if (name.length <= 2) return name
        return name
                .replace('省', '')
                .replace('市', '')
                .replace('地区', '')
                .replace('矿区', '')
                .replace('林区', '')
                .replace('自治区', '')
                .replace('特别行政区', '')
                .replace('新区', '')
                .replace('区', '')
                .replace('自治县', '')
                .replace('县', '')
                .replace('自治州', '')
                .replace('自治旗', '')
                .replace('旗', '')
                .replace('哈尼族', '')
                .replace('哈萨克', '')
                .replace('保安族', '')
                .replace('布依族', '')
                .replace('布朗族', '')
                .replace('普米族', '')
                .replace('白族', '')
                .replace('藏族', '')
                .replace('朝鲜族', '')
                .replace('东乡族', '')
                .replace('达斡尔族', '')
                .replace('独龙族', '')
                .replace('各族', '')
                .replace('羌族', '')
                .replace('回族', '')
                .replace('景颇族', '')
                .replace('拉祜族', '')
                .replace('黎族', '')
                .replace('苗族', '')
                .replace('蒙古族', '')
                .replace('蒙古', '')
                .replace('仡佬族', '')
                .replace('畲族', '')
                .replace('傈僳族', '')
                .replace('满族', '')
                .replace('纳西族', '')
                .replace('怒族', '')
                .replace('撒拉族', '')
                .replace('傣族', '')
                .replace('土族', '')
                .replace('土家族', '')
                .replace('侗族', '')
                .replace('塔吉克', '')
                .replace('维吾尔', '')
                .replace('佤族', '')
                .replace('裕固族', '')
                .replace('瑶族', '')
                .replace('彝族', '')
                .replace('壮族', '')
                .replace('仫佬族', '')
                .replace('毛南族', '')
                .replace('锡伯', '')
}
const buildCity = (configures: any = {}): any => {
        //let dataCity = [configures.alias || ab(configures.name)]
        let dataCity = [configures.name]
        let townBuffers = Object(town)[configures.id] || []

        for (let buf of townBuffers) {
                if (buf.name === '市辖区' || buf.name === '城区') {
                        continue
                }

                //dataCity.push(buf.alias || ab(buf.name))
                dataCity.push(buf.name)
        }

        return dataCity
}
const buildProvince = (name: string, configures: any = {}): any => {
        let dataProvince: any = { data: [], children: [] }
        let cityBuffers = Object(city)[configures.id] || []

        if (cityBuffers[0].name === '市辖区') {
                //cityBuffers[0].name = cityBuffers[0].alias || cityBuffers[0].province
                //let idCity = name + '-' + ab(cityBuffers[0].province)
                cityBuffers[0].name = cityBuffers[0].province
                let idCity = name + '-' + cityBuffers[0].province
                return {
                        data: [cityBuffers[0].province],//[ab(cityBuffers[0].province)],
                        children: [{
                                _id: 'regions#' + idCity,
                                data: buildCity(cityBuffers[0])
                        }]
                }
        }

        for (let buffer of cityBuffers) {
                if (buffer.name === '省直辖县级行政区划' || buffer.name === '自治区直辖县级行政区划') {
                        let townBuffers = Object(town)[buffer.id]

                        for (let item of townBuffers) {
                                //let alias = item.alias || ab(item.name)
                                let alias = item.name

                                dataProvince.data.push(alias)
                                dataProvince.children.push({
                                        _id: 'regions#' + name + '-' + alias,
                                        data: [alias]
                                })
                        }
                        continue
                }

                //let alias = buffer.alias || ab(buffer.name)
                let alias = buffer.name
                dataProvince.data.push(alias)
                dataProvince.children.push({
                        _id: 'regions#' + name + '-' + alias,
                        data: buildCity(buffer)
                })
        }

        return dataProvince
}

let regionsData = [
        { _id: 'regions', data: ['中国'] },
        { _id: 'regions#中国', data: [] }
]
for (let buffer of province) {
        let name = buffer.name // buffer.alias || ab(buffer.name)
        regionsData[1].data.push(name)

        let idProvince = '中国-' + name
        let dataProvince = buildProvince(idProvince, buffer)

        if (dataProvince) {
                regionsData.push({
                        _id: 'regions#' + idProvince,
                        data: dataProvince.data
                })

                if (dataProvince.children instanceof Array) {
                        for (let children of dataProvince.children) {
                                regionsData.push(children)
                        }
                }
        }
}

for (let item of foreigns) {
        regionsData.push(item)
}

export default regionsData
