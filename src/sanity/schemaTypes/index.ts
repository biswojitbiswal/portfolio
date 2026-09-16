import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { aboutType } from './about'
import { capabilitiesType } from './capabilities'
import { experienceType } from './experience'
import { projectType } from './project'
import { projectsSectionType } from './projectsSection'
import { skillsType } from './skills'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType,
    aboutType,
    capabilitiesType,
    experienceType,
    projectType,
    projectsSectionType,
    skillsType
  ],
}
