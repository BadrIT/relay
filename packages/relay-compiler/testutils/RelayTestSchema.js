/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayTestSchema
 * @flow
 */

'use strict';

const {buildASTSchema, parse} = require('graphql');

/* eslint-disable comma-dangle, quotes */
module.exports = buildASTSchema(parse(`
schema {
  query: Root
  mutation: Mutation
  subscription: Subscription
}

type Root {
  checkinSearchQuery(query: CheckinSearchInput): CheckinSearchResult
  defaultSettings: Settings,
  route(waypoints: [WayPoint!]!): Route
  maybeNode: MaybeNode
  neverNode: NeverNode
  me: User
  node(id: ID): Node
  nodes(ids: [ID!]): [Node]
  settings(environment: Environment): Settings
  story: Story
  task(number: Int): Task
  username(name: String!): Actor
  usernames(names: [String!]!): [Actor]
  viewer: Viewer
  _mutation: Mutation
}

union MaybeNode = Story | FakeNode | NonNode

type FakeNode {
  id: ID!
}

type NonNode {
  id: String
  name: String
}

union NeverNode = FakeNode | NonNode

type Task {
  title: String
}

input WayPoint {
  lat: String
  lon: String
}

type Route {
  steps: [RouteStep]
}

type RouteStep {
  lat: String
  lon: String
  note: String
}

type Mutation {
  actorSubscribe(input: ActorSubscribeInput): ActorSubscribeResponsePayload
  applicationRequestDeleteAll(input: ApplicationRequestDeleteAllInput): ApplicationRequestDeleteAllResponsePayload
  commentCreate(input: CommentCreateInput): CommentCreateResponsePayload
  commentDelete(input: CommentDeleteInput): CommentDeleteResponsePayload
  feedbackLike(input: FeedbackLikeInput): FeedbackLikeResponsePayload
  feedbackLikeSubscribe(input: FeedbackLikeInput): FeedbackLikeResponsePayload
  nodeSavedState(input: NodeSaveStateInput): NodeSavedStateResponsePayload
  unfriend(input: UnfriendInput): UnfriendResponsePayload
  viewerNotificationsUpdateAllSeenState(input: UpdateAllSeenStateInput): ViewerNotificationsUpdateAllSeenStateResponsePayload
}

type Subscription {
  feedbackLikeSubscribe(input: FeedbackLikeInput): FeedbackLikeResponsePayload
}

input ActorSubscribeInput {
  clientMutationId: String
  subscribeeId: ID
}

input ApplicationRequestDeleteAllInput {
  clientMutationId: String
  deletedRequestIds: [ID]
}

input CommentCreateInput {
  clientMutationId: String
  feedbackId: ID
}

input CommentDeleteInput {
  clientMutationId: String
  commentId: ID
}

input FeedbackLikeInput {
  clientMutationId: String
  feedbackId: ID
}

input NodeSaveStateInput {
  clientMutationId: String
  nodeId: ID
}

input UpdateAllSeenStateInput {
  clientMutationId: String
  storyIds: [ID]
}

type ActorSubscribeResponsePayload {
  clientMutationId: String
  subscribee: Actor
}

type ApplicationRequestDeleteAllResponsePayload {
  clientMutationId: String
  deletedRequestIds: [ID]
}

type CheckinSearchResult {
  query: String
}

input CheckinSearchInput {
  query: String
}

type Comment implements Node {
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

type CommentCreateResponsePayload {
  clientMutationId: String
  comment: Comment
  feedback: Feedback
  feedbackCommentEdge: CommentsEdge
  viewer: Viewer
}

type CommentDeleteResponsePayload {
  clientMutationId: String
  deletedCommentId: ID
  feedback: Feedback
}

type CommentsConnection {
  count: Int
  edges: [CommentsEdge]
  pageInfo: PageInfo
}

type CommentsEdge {
  cursor: String
  node: Comment
  source: Feedback
}

type ConfigsConnection {
  edges: [ConfigsConnectionEdge]
  pageInfo: PageInfo
}

type ConfigsConnectionEdge {
  node: Config
}

type Config {
  name: String
  isEnabled: Boolean
}

type Date {
  day: Int
  month: Int
  year: Int
}

type Feedback implements Node {
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

type FeedbackLikeResponsePayload {
  clientMutationId: String
  clientSubscriptionId: String
  feedback: Feedback
}

interface FeedUnit {
  actor: Actor
  actorCount: Int
  feedback: Feedback
  id: ID!
  message: Text
  tracking: String
}

type FriendsConnection {
  count: Int
  edges: [FriendsEdge]
  pageInfo: PageInfo
}

type FriendsEdge {
  cursor: String
  node: User
  source: User
}

type Image {
  uri: String
  width: Int
  height: Int
}

type LikersOfContentConnection {
  count: Int
  edges: [LikersEdge]
  pageInfo: PageInfo
}

type LikersEdge {
  cursor: String
  node: Actor
}

interface Named {
  name: String
}

type NewsFeedConnection {
  edges: [NewsFeedEdge]
  pageInfo: PageInfo
}

type NewsFeedEdge {
  cursor: String
  node: FeedUnit
  sortKey: String
  showBeeper: Boolean
}

interface Node {
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

interface Actor {
  address: StreetAddress
  allPhones: [Phone]
  birthdate: Date
  emailAddresses: [String]
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
}

type NodeSavedStateResponsePayload {
  node: Node
}

type Page implements Node Actor {
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

type PageInfo {
  hasPreviousPage: Boolean
  hasNextPage: Boolean
  endCursor: String
  startCursor: String
}

type PendingPostsConnection {
  count: Int
  edges: [PendingPostsConnectionEdge]
  pageInfo: PageInfo
}

type PendingPostsConnectionEdge {
  cursor: String
  node: PendingPost
}

type PendingPost {
  text: String
}

type Phone {
  isVerified: Boolean
  phoneNumber: PhoneNumber
}

type PhoneNumber {
  displayNumber: String
  countryCode: String
}

type Screenname {
  name: String
  service: String
}

type Segments {
  edges: SegmentsEdge
}

type SegmentsEdge {
  node: String
}

type NonNodeStory implements FeedUnit {
  actor: Actor
  actorCount: Int
  feedback: Feedback
  id: ID!
  message: Text
  tracking: String
}

type PhotoStory implements FeedUnit Node {
  # PhotoStory
  photo: Image

  # FeedUnit
  canViewerDelete: Boolean
  seenState: String

  # Node
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

type Story implements FeedUnit Node {
  # FeedUnit
  canViewerDelete: Boolean
  seenState: String

  # Node
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

type StreetAddress {
  city: String
  country: String
  postal_code: String
  street: String
}


type SubscribersConnection {
  count: Int
  edges: [FriendsEdge]
  pageInfo: PageInfo
}

type SubscribersEdge {
  cursor: String
  node: User
  source: User
}

type Text {
  text: String
  ranges: [String]
}

type TimezoneInfo {
  timezone: String
}

type TopLevelCommentsConnection {
  count: Int
  edges: [CommentsEdge]
  pageInfo: PageInfo
  totalCount: Int
}

input UnfriendInput {
  clientMutationId: String
  friendId: ID
}

type UnfriendResponsePayload {
  actor: Actor
  clientMutationId: String
  formerFriend: User
}

type User implements Named Node Actor {
  actor: Actor
  actors: [Actor]
  actorCount: Int
  address: StreetAddress
  allPhones: [Phone]
  author: User
  backgroundImage: Image
  birthdate: Date
  body: Text
  canViewerComment: Boolean
  canViewerLike: Boolean
  checkins(environments: [Environment!]!): CheckinSearchResult
  comments(first: Int, last: Int, orderby: String): CommentsConnection
  doesViewerLike: Boolean
  emailAddresses: [String]
  feedback: Feedback
  firstName(if: Boolean, unless: Boolean): String
  friends(after: ID, before: ID, first: Int, last: ID, orderby: [String], find: String, isViewerFriend: Boolean, if: Boolean, unless: Boolean, traits: [PersonalityTraits]): FriendsConnection
  hometown: Page
  id: ID!
  lastName: String
  likers(first: Int): LikersOfContentConnection
  likeSentence: Text
  message: Text
  name: String
  storySearch(query: StorySearchInput): [Story]
  storyCommentSearch(query: StoryCommentSearchInput): [Comment]
  profilePicture(size: Int, preset: PhotoSize): Image
  segments(first: Int): Segments
  screennames: [Screenname]
  subscribeStatus: String
  subscribers(first: Int): SubscribersConnection
  topLevelComments(first: Int): TopLevelCommentsConnection
  tracking: String
  traits: [PersonalityTraits]
  url(relative: Boolean, site: String): String
  websites: [String]
  username: String
  viewerSavedState: String
}

input StorySearchInput {
  text: String
  limit: Int
  offset: Int
}

input StoryCommentSearchInput {
  text: String
  limit: Int
  offset: Int
}

type Viewer {
  __configs__(named: [String]): ConfigsConnection
  actor: Actor
  allTimezones: [TimezoneInfo]
  isFbEmployee: Boolean
  newsFeed(after: ID, first: Int, find: ID): NewsFeedConnection
  notificationStories(after: ID, first: Int): NewsFeedConnection
  pendingPosts(first: Int): PendingPostsConnection
  primaryEmail: String
  timezoneEstimate: TimezoneInfo
}

type ViewerNotificationsUpdateAllSeenStateResponsePayload {
  stories: [Story]
}

enum Environment {
  WEB
  MOBILE
}

enum PhotoSize {
  SMALL
  LARGE
}

enum PersonalityTraits {
  CHEERFUL
  DERISIVE
  HELPFUL
  SNARKY
}

type Settings {
  notificationSounds: Boolean
  notifications(environment: Environment): Boolean
}

directive @customDirective(level: Int!) on FIELD
`));