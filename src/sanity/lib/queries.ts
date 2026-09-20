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

export const PROJECTS_QUERY = defineQuery(`{
  "section": *[_type == "projectsSection" && isActive == true][0] {
    _id, _rev, desktopSectionLabel, mobileSectionLabel, heading,
    desktopDescription, mobileDescription, viewAllLabel, viewAllHref, caseStudyLabel
  },
  "projects": *[_type == "project" && isActive == true && defined(slug.current)]
    | order(coalesce(featured, false) desc, order asc, _id asc) {
      "id": _id, _rev, title, category, role, description,
      "slug": slug.current, status, liveSiteHref,
      "highlights": coalesce(highlights, []),
      "caseStudyHref": "/projects/" + slug.current,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "href": "/projects/" + slug.current,
      "technologies": coalesce(technologies, [])
    }
}`);

export const PROJECTS_REVISION_QUERY = defineQuery(`{
  "section": *[_type == "projectsSection" && isActive == true][0] { _id, _rev },
  "projects": *[_type == "project" && isActive == true && defined(slug.current)]
    | order(coalesce(featured, false) desc, order asc, _id asc) { "id": _id, _rev }
}`);

export const SKILLS_QUERY = defineQuery(`
  *[_type == "skills" && isActive == true][0] {
    _id, _rev, sectionLabel, heading, description,
    "categories": coalesce(categories, []) | order(order asc) {
      "id": _key,
      title, shortTitle, description, icon, iconName, "iconImage": iconImage.asset->url,
      "skills": coalesce(skills, []) | order(order asc) {
        _key, name, icon, iconName, "iconImage": iconImage.asset->url, color
      }
    }
  }
`);

export const SKILLS_REVISION_QUERY = defineQuery(`
  *[_type == "skills" && isActive == true][0] { _id, _rev }
`);

export const EDUCATION_QUERY = defineQuery(`
  *[_type == "education" && isActive == true][0] {
    _id, _rev, sectionLabel, heading, desktopDescription, mobileDescription,
    "learningSteps": coalesce(learningSteps, []) | order(order asc) { _key, label },
    "educationItems": coalesce(educationItems, []) | order(order asc) {
      "id": _key,
      qualification, institution, period, location, category, focus, icon
    }
  }
`);

export const EDUCATION_REVISION_QUERY = defineQuery(`
  *[_type == "education" && isActive == true][0] { _id, _rev }
`);

export const CONTACT_QUERY = defineQuery(`
  *[_type == "contact" && isActive == true][0] {
    _id, _rev, sectionLabel, heading, description,
    availabilityText, showAvailability, replyText, footerText,
    "contactMethods": coalesce(contactMethods, []) | order(order asc) {
      "id": _key,
      label, title, value, href, icon, actionLabel, external
    }
  }
`);

export const CONTACT_REVISION_QUERY = defineQuery(`
  *[_type == "contact" && isActive == true][0] { _id, _rev }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer" && isActive == true][0] {
    _id, _rev, brandName, role, description, navigationTitle, connectTitle,
    copyrightName, builtWithText, backToTopLabel, backToTopHref,
    "navigationLinks": coalesce(navigationLinks, []) | order(order asc) {
      _key, label, href, highlighted
    },
    "connectLinks": coalesce(connectLinks, []) | order(order asc) {
      _key, label, icon, external,
      "href": select(linkType == "resume" => file.asset->url, url)
    }
  }
`);

export const FOOTER_REVISION_QUERY = defineQuery(`
  *[_type == "footer" && isActive == true][0] { _id, _rev }
`);

export const HEADER_QUERY = defineQuery(`
  *[_type == "header" && isActive == true][0] {
    _id, _rev, brandName, specialization, showSpecialization,
    "navigation": coalesce(navigation, []) | order(order asc) { _key, label, href },
    resume { label, mobileLabel, "url": file.asset->url, downloadFileName },
    cta { label, href },
    mobileMenu { title, description }
  }
`);

export const HEADER_REVISION_QUERY = defineQuery(`
  *[_type == "header" && isActive == true][0] { _id, _rev }
`);
