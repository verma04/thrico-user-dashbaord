import { useMutation, useQuery } from "@apollo/client/react";
import {
  ADD_COMMENT,
  ADD_COMMUNITIES_FEED,
  ADD_FEED,
  DELETE_COMMENT,
  DELETE_FEED,
  GET_ALL_OFFER,
  GET_COMMUNITIES_FEED,
  GET_COMMUNITIES_FEED_LIST,
  GET_DISCUSSION_FORUM_CATEGORY,
  GET_EVENTS_FEED,
  GET_FEED,
  GET_FEED_COMMENT,
  GET_FEED_DETAILS_ID,
  GET_JOB_FEED,
  GET_MARKETPLACE_FEED,
  GET_PERSONALIZED_FEED,
  GET_USER_FEED,
  LIKE_FEED,
  REPOST_FEED,
  WISHLIST_FEED,
  GET_MY_FEED,
} from "../../queries/feed";

export const getCommunitiesFeedList = (options: any) =>
  useQuery(GET_COMMUNITIES_FEED_LIST, options);
export const getFeedDetailsById = (options: any) =>
  useQuery(GET_FEED_DETAILS_ID, options);
export const getCommunitiesFeed = () => useQuery(GET_COMMUNITIES_FEED);
export const useAddFeed = (options: any) =>
  useMutation(ADD_FEED, {
    onCompleted(data) {
      options.onCompleted();
    },
    update(cache, { data: { addFeed } }) {
      try {
        const { getFeed }: any = cache.readQuery({
          query: GET_FEED,
          variables: {
            input: {
              offset: 0,
              limit: 4, // Match the limit in your Following screen
            },
          },
        });

        if (addFeed && getFeed) {
          cache.writeQuery({
            query: GET_FEED,
            data: { getFeed: [addFeed, ...getFeed] },
            variables: {
              input: {
                offset: 0,
                limit: 4, // Match the limit in your Following screen
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

export const getFeed = (options: any) => useQuery(GET_FEED, options);
export const getJobFeed = () => useQuery(GET_JOB_FEED);

export const getPersonalizedFeed = () => useQuery(GET_PERSONALIZED_FEED);

export const getMarketPlaceFeed = () => useQuery(GET_MARKETPLACE_FEED);
export const getUserEventsFeed = () => useQuery(GET_EVENTS_FEED);
export const getFeedComment = (options: any) =>
  useQuery(GET_FEED_COMMENT, options);

export const addFeedComment = (options: any) =>
  useMutation(ADD_COMMENT, {
    onCompleted() {
      options.onCompleted();
    },
    update(cache, { data: { addComment } }) {
      try {
        const { getFeed }: any = cache.readQuery({
          query: GET_FEED,
          variables: {
            input: {
              offset: 0,
              limit: 4, // Match the limit in your Following screen
            },
          },
        });

        const newData = getFeed.map((item: any) => {
          if (item.id === options.id) {
            return { ...item, totalComment: item.totalComment + 1 };
          } else {
            return item;
          }
        });

        const { getFeedComment }: any = cache.readQuery({
          query: GET_FEED_COMMENT,
          variables: {
            input: {
              id: options.id,
            },
          },
        });

        cache.writeQuery({
          query: GET_FEED_COMMENT,
          data: { getFeedComment: [addComment, ...getFeedComment] },
          variables: {
            input: {
              id: options.id,
            },
          },
        });
        cache.writeQuery({
          query: GET_FEED,
          data: { getFeed: [...newData] },
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(likeFeed);

      // console.log(data);
    },
  });

export const wishListFeed = (options: any) =>
  useMutation(WISHLIST_FEED, {
    // onCompleted() {
    //   options.onCompleted();
    // },
  });

export const likeFeed = (options: any) =>
  useMutation(LIKE_FEED, {
    // onCompleted() {
    //   options.onCompleted();
    // },
  });

export const deleteFeed = (options: any) =>
  useMutation(DELETE_FEED, {
    onCompleted() {
      options.onCompleted();
    },
    update(cache, { data: { deleteFeed } }) {
      try {
        const { getFeed }: any = cache.readQuery({
          query: GET_FEED,
        });

        const { getJobFeed }: any = cache.readQuery({
          query: GET_JOB_FEED,
        });

        const { getMarketPlaceFeed }: any = cache.readQuery({
          query: GET_MARKETPLACE_FEED,
        });

        const { getCommunitiesFeed }: any = cache.readQuery({
          query: GET_COMMUNITIES_FEED,
        });

        if (getFeed) {
          const newValue = getFeed.filter((set) => set.id !== deleteFeed.id);

          if (newValue) {
            cache.writeQuery({
              query: GET_FEED,
              data: { getFeed: [...newValue] },
            });
          }
        }

        if (getJobFeed) {
          const newValue = getJobFeed.filter((set) => set.id !== deleteFeed.id);

          if (newValue) {
            cache.writeQuery({
              query: GET_JOB_FEED,
              data: { getJobFeed: [...newValue] },
            });
          }
        }
        if (getMarketPlaceFeed) {
          const newValue = getMarketPlaceFeed.filter(
            (set) => set.id !== deleteFeed.id
          );

          if (newValue) {
            cache.writeQuery({
              query: GET_MARKETPLACE_FEED,
              data: { getMarketPlaceFeed: [...newValue] },
            });
          }
        }

        if (getCommunitiesFeed) {
          const newValue = getCommunitiesFeed.filter(
            (set) => set.id !== deleteFeed.id
          );

          if (newValue) {
            cache.writeQuery({
              query: GET_COMMUNITIES_FEED,
              data: { getCommunitiesFeed: [...newValue] },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

export const deleteCommentFeed = (options: any) =>
  useMutation(DELETE_COMMENT, {
    onCompleted() {
      options.onCompleted();
    },
    update(cache, { data: { deleteCommentFeed } }) {
      try {
        const { getFeedComment }: any = cache.readQuery({
          query: GET_FEED_COMMENT,
          variables: {
            input: {
              id: options.id,
            },
          },
        });

        const newValue = getFeedComment.filter(
          (set) => set.id !== deleteCommentFeed.id
        );

        cache.writeQuery({
          query: GET_FEED_COMMENT,
          data: { getFeedComment: [...newValue] },
          variables: {
            input: {
              id: options.id,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(likeFeed);

      // console.log(data);
    },
  });

export const addFeedCommunities = (options: any) =>
  useMutation(ADD_COMMUNITIES_FEED, {
    onCompleted(data) {
      options.onCompleted();
    },

    update(cache, { data: { addFeedCommunities } }) {
      try {
        const { getCommunitiesFeedList }: any = cache.readQuery({
          query: GET_COMMUNITIES_FEED_LIST,
          variables: {
            input: {
              id: options.id,
            },
          },
        });

        console.log(
          "%cExample %s",

          addFeedCommunities,
          ...getCommunitiesFeedList[5]
        );

        cache.writeQuery({
          query: GET_COMMUNITIES_FEED_LIST,
          data: {
            getCommunitiesFeedList: [
              addFeedCommunities,
              ...getCommunitiesFeedList,
            ],
          },
          variables: {
            input: {
              id: options.id,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

export const repostFeedWithThought = (options: any) =>
  useMutation(REPOST_FEED, {
    onCompleted(data) {
      options.onCompleted();
    },

    update(cache, { data: { repostFeedWithThought } }) {
      try {
        const { getFeed }: any = cache.readQuery({
          query: GET_FEED,
          variables: {
            input: {
              offset: 0,
              limit: 4, // Match the limit in your Following screen
            },
          },
        });

        cache.writeQuery({
          query: GET_FEED,
          data: { getFeed: [repostFeedWithThought, ...getFeed] },
          variables: {
            input: {
              offset: 0,
              limit: 4, // Match the limit in your Following screen
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

export const getUserActivityFeed = (options: any) =>
  useQuery(GET_USER_FEED, options);

export const getAllOffer = () => useQuery(GET_ALL_OFFER);

export const getDiscussionForumCategory = () =>
  useQuery(GET_DISCUSSION_FORUM_CATEGORY);

export const getMyFeed = (options: any) => useQuery(GET_MY_FEED, options);
