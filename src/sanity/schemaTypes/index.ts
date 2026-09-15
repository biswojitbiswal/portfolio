import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { heroType } from './hero'
import { aboutType } from './about'
import { capabilitiesType } from './capabilities'
import { experienceType } from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType,
    aboutType,
    capabilitiesType,
    experienceType,
    projectType,
  ],
}
