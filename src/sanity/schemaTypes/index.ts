import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { aboutType } from './about'
import { capabilitiesType } from './capabilities'
import { experienceType } from './experience'
import { projectType } from './project'
import { projectsSectionType } from './projectsSection'
import { skillsType } from './skills'
import { educationType } from './education'
import { contactType } from './contact'
import { footerType } from './footer'
import { headerType } from './header'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    headerType,
    heroType,
    aboutType,
    capabilitiesType,
    experienceType,
    projectType,
    projectsSectionType,
    skillsType,
    educationType,
    contactType,
    footerType,
  ],
}
