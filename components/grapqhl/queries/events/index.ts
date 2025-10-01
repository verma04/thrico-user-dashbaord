import { gql } from "@apollo/client";

export const CREATE_EVENT_FOR_GROUP = gql`
  mutation CreateEventForGroup($input: addEvent) {
    createEventForGroup(input: $input) {
      details
      eventEndTime
      eventStartTime
      eventType
      eventVisibility
      cover
      name
      registrationEndDate
      venue
      slug
      eventHost {
        id
        avatar
        firstName
        lastName
        aboutAlumni {
          currentPosition
        }
      }
      eventsPayments {
        eventCost
      }
    }
  }
`;
export const GET_ALL_EVENT = gql`
  query GetAllEvents($input: filterProps) {
    getAllEvents(input: $input) {
      totalRecords
      data {
        id
        cover
        details
        eventsPayments {
          eventCost
        }
        name
        slug
      }
    }
  }
`;

export const CREATE_EVENTS = gql`
  mutation createEvent($input: addEvent) {
    createEvent(input: $input) {
      id
      details
      eventEndTime
      eventStartTime
      eventType
      eventVisibility
      name
      registrationEndDate
      venue
      cover
      slug

      eventsPayments {
        eventCost
      }
    }
  }
`;
export const EVENT_BY_SLUG = gql`
  query GetEventBySlug($input: slug) {
    getEventBySlug(input: $input) {
      cover
      details
      eventEndTime
      isRegistered
      eventStartTime
      eventType
      eventVisibility
      eventsPayments {
        paymentMode
        paypalDetails
        ifscCode
        eventCost
        costPerAdults
        costPerChildren
        accountNumber
        bankName
        currency
      }
      id
      name
      registrationEndDate
      slug
      venue
    }
  }
`;

export const GET_EVENT_AS_HOST = gql`
  query getEventAsHost {
    getEventAsHost {
      id
      details
      eventEndTime
      eventStartTime
      eventType
      eventVisibility
      name
      registrationEndDate
      venue
      cover
      slug
      eventHost {
        role
      }
    }
  }
`;

export const GET_SPONSORSHIP = gql`
  query GetEventSponsorship($input: slug) {
    getEventSponsorship(input: $input) {
      id
      content {
        description
        title
      }
      currency
      event {
        name
        slug
      }
      price
      sponsorType
      createdAt
      updatedAt
    }
  }
`;

export const ADD_SPONSORSHIP = gql`
  mutation AddSponsorShip($input: eventCreateSponsorShip) {
    addSponsorShip(input: $input) {
      id
      content {
        description
        title
      }
      currency
      event {
        name
        slug
      }
      price
      sponsorType
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SPONSORSHIP = gql`
  mutation DeleteSponsorShip($input: deleteSponsorShip) {
    deleteSponsorShip(input: $input) {
      id
    }
  }
`;

export const GET_ALL_HOST = gql`
  query GetAllHost($input: slug) {
    getAllHost(input: $input) {
      id
      hostType
      createdAt
      updatedAt
      alumni {
        aboutAlumni {
          currentPosition
        }
        avatar
        firstName
        lastName
        id
      }
    }
  }
`;

export const ADD_HOST = gql`
  mutation AddHost($input: typeHostId) {
    addHost(input: $input) {
      id
    }
  }
`;

export const REMOVE_HOST = gql`
  mutation RemoveHost($input: typeHostId) {
    removeHost(input: $input) {
      id
    }
  }
`;

export const GET_ALL_VENUE = gql`
  query GetAllVenue($input: slug) {
    getAllVenue(input: $input) {
      venue
      id
      address
    }
  }
`;

export const ADD_VENUE = gql`
  mutation AddVenue($input: addVenue) {
    addVenue(input: $input) {
      venue
      id
      address
    }
  }
`;
export const ADD_SPEAKER = gql`
  mutation AddEventSpeaker($input: addSpeaker) {
    addEventSpeaker(input: $input) {
      id
      fullName
      linkedin
      cover
      about
      avatar
    }
  }
`;

export const GET_ALL_SPEAKERS = gql`
  query GetAllSpeakers($input: slug) {
    getAllSpeakers(input: $input) {
      id
      fullName
      linkedin
      cover
      about
      avatar
    }
  }
`;
export const ADD_AGENDA = gql`
  mutation AddEventAgenda($input: addAgenda) {
    addEventAgenda(input: $input) {
      id
      title
      videoSteam
      date
      startTime
      endTime
      venue
      isPinned
      isDraft
      isPublished
      description
    }
  }
`;
export const GET_ALL_AGENDA = gql`
  query GetAllAgenda($input: slug) {
    getAllAgenda(input: $input) {
      id
      title
      videoSteam
      date
      startTime
      endTime
      venue
      isPinned
      isDraft
      isPublished
      description
    }
  }
`;

export const GET_ALL_EVENT_GALLERY = gql`
  query GetEventGallery($input: slug) {
    getEventGallery(input: $input) {
      id
      mediaType
      url
    }
  }
`;

export const ADD_EVENT_GALLERY = gql`
  mutation AddEventMedia($input: inputEventGallery) {
    addEventMedia(input: $input) {
      id
      mediaType
      url
    }
  }
`;

export const GET_EVENT_SPONSOR = gql`
  query GetEventSponsors($input: slug) {
    getEventSponsors(input: $input) {
      createdAt
      id
      sponsorLogo
      sponsorName
      sponsorShip {
        sponsorType
      }
      sponsorUserDesignation
      sponsorUserName
    }
  }
`;

export const ADD_EVENT_SPONSOR = gql`
  mutation AddEventSponsors($input: inputEventSponsors) {
    addEventSponsors(input: $input) {
      createdAt
      id
      sponsorLogo
      sponsorName
      sponsorShip {
        sponsorType
      }
      sponsorUserDesignation
      sponsorUserName
    }
  }
`;

export const GET_SPONSORSHIP_EVENTS = gql`
  query GetSponsorshipEvents($input: slug) {
    getSponsorshipEvents(input: $input) {
      eventSponsors {
        id
        sponsorUserName
        sponsorUserDesignation
        sponsorLogo
        sponsorShip {
          id
          sponsorType
        }
        createdAt
        sponsorName
      }
      eventSponsorship {
        content {
          description
          title
        }
        id
        price
        role
        showPrice
        sponsorType
      }
    }
  }
`;

export const GET_SPONSORSHIP_SPEAKERS = gql`
  query GetSpeakersEvents($input: slug) {
    getSpeakersEvents(input: $input) {
      avatar
      id
      fullName
      linkedin
      cover
      about
    }
  }
`;

export const GET_JOB_BY_SLUG = gql`
  query GetJobBySlug($input: inputSlug) {
    getJobBySlug(input: $input) {
      company
      description
      experience
      id
      jobTitle
      jobType
      location
      salary
      slug
      workplaceType
      tag {
        tag
      }
    }
  }
`;

export const GET_PAID_EVENTS_DETAILS = gql`
  query GetPaidEventsDetails($input: slug) {
    getPaidEventsDetails(input: $input) {
      orderId
      currency
      amount
    }
  }
`;

export const GET_EVENTS_TYPE = gql`
  query Query {
    getEventsType
  }
`;
export const GET_EVENT_COST_TYPE = gql`
  query Query {
    getEventCostType
  }
`;
