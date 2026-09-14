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
