import fs from 'fs'
import Stage, { defaultStage } from '../src/models/Stage'

const get = (id: number): Stage => {
  return id > 0 ? JSON.parse(fs.readFileSync(`./database/stages/stage.${id}.json`).toString()) as Stage : next()
}

const save = (stage: Stage) => {
  fs.writeFileSync(`./database/stages/stage.${stage.id}.json`, JSON.stringify(stage))
  return stage
}

const next = (): Stage => {
  const id = fs.readdirSync(`./database/stages/`).length
  return { ...defaultStage, id }
}

const last = (): Stage => {
  const id = fs.readdirSync(`./database/stages/`).length - 1
  return get(id)
}

export const database = {
  stage: {
    get, save, next, last
  }
}
