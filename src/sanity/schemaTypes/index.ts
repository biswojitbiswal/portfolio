import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { heroType } from './hero'
import { aboutType } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType,
    aboutType,
    projectType,
  ],
}
