import { schema, utils } from '../../foundation'

export default async function beginsV002() {
        console.log('Begin: ' + (new Date().toString()))

        let cTotal = 0
        let cValid = 0

        let resumes = await schema.resume.find()
        for (let resume of resumes) {
                cTotal = cTotal + 1

                if (resume.resumeComplete >= 60) {
                        resume.resumeHidden = false
                        cValid = cValid + 1
                }

                await schema.resume.save(resume)
        }

        console.log(`total:${cTotal};valid:${cValid}`)
        console.log('Finish: ' + (new Date().toString()))
        process.exit(0)
}