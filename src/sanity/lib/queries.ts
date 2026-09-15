import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`
  *[_type == "hero" && isActive == true][0] {
    _id,
    _rev,
    developerTag,
    heading,
    subtitle,

    primaryCta {
      label,
      href
    },

    resumeCta {
      label,
      resumeFile {
        asset-> {
          url
        }
      }
    },

    socialLinks[] {
      platform,
      label,
      url
    },

    profileImage {
      alt,
      asset-> {
        url
      }
    },

    codeCard {
      code
    },

    quoteCard {
      firstLine,
      secondLine
    }
  }
`);
export const HERO_REVISION_QUERY = defineQuery(`
  *[_type == "hero" && isActive == true][0] { _id, _rev }
`);

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about" && isActive == true][0] {
    _id,
    _rev,
    sectionLabel,
    headingFirstLine,
    headingSecondLine,
    desktopDescription,
    mobileDescription,
    statsLabel,

    "stats": stats[] | order(order asc) {
      _key,
      title,
      description,
      icon,
      order
    },

    currentStatus
  }
`);

export const ABOUT_REVISION_QUERY = defineQuery(`
  *[_type == "about" && isActive == true][0] { _id, _rev }
`);

export const CAPABILITIES_QUERY = defineQuery(`
  *[_type == "capabilities" && isActive == true][0] {
    _id,
    _rev,
    sectionLabel,
    heading,
    shortDescription,
    description,
    "capabilityItems": capabilityItems[] | order(order asc) {
      _key, key, title, description, icon, examples
    },
    approachLabel,
    "approachItems": approachItems[] | order(order asc) { _key, title }
  }
`);

export const CAPABILITIES_REVISION_QUERY = defineQuery(`
  *[_type == "capabilities" && isActive == true][0] { _id, _rev }
`);

export const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience" && isActive == true][0] {
    _id, _rev,
    desktopSectionLabel, mobileSectionLabel, heading,
    desktopDescription, mobileDescription, focusLabel,
    "stats": coalesce(stats, []) | order(order asc) { _key, value, label },
    "focusItems": coalesce(focusItems, []) | order(order asc) { _key, label },
    "experiences": coalesce(experiences, []) | order(order asc) {
      "id": _key,
      company, shortName, role,
      "type": employmentType,
      location, period, current, description,
      "achievements": coalesce(achievements, []),
      "technologies": coalesce(technologies, [])
    }
  }
`);

export const EXPERIENCE_REVISION_QUERY = defineQuery(`
  *[_type == "experience" && isActive == true][0] { _id, _rev }
`);
