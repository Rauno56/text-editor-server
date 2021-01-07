# Todo

I started with this document before writing any code for broad plan for execution. Going to probably initially skip the items starting with "?" to save time initially and adjust the plan as I go.

## Setup

- [ ] Typescript scaffolding and builds
    + [ ] Rollup builds + watch
    + [ ] Test setup with mocha
    + [ ] Hello World
- [ ] Local development iteration - Local development and running the app should be trivial and working out of the box. Nothing frustrates me more than to come to a undocumented project that requires some secret knowledge to contribute to.
- [ ] Development iteration in docker - We cannot control the developers environment so let's give the environment with our application. It will be set in the prod anyways, so let's make sure one that's as similar as possible is used on every step of the way.
- [ ] Kubernetes manifests
    - [ ] ? Terraform setup
- [ ] ? Deployment over CI on master builds
- [ ] Cloudflare
    - [ ] ? Full (strict) e2e encryption - I think it's super important not to leak user data. HTTPS is bare minimum for any traffic on the internet.
    - [ ] ? ingress setup to avoid http / IP access - generally I'd never leave IP open to the internet. CF hides the IP from the user and proxies the request, so at least it's not trivial to know which IP to access.

I'll start off by setting up some general scaffolding so we'd have something running and expose we can start iterating on.

## The App

- [ ] Endpoints for in-memory data:
    + [ ] Fetching documents;
    + [ ] Posting changes [*](#footnote-a);
    + [ ] Creating documents;
- [ ] Web Sockets support:
    + [ ] Subscribing to changes
    + [ ] Publishing changes;
- [ ] Persistence:
    + [ ] Create docker-compose file for dev;
    + [ ] Add PostgreSQL container into doco file;
    + [ ] Create schema;
    + [ ] Client logic: logging changes
    + [ ] Client logic: saving and fetching documents

<a name="footnote-a">*</a>: At this point the API is technically there so the FE team can start prototyping on top of a mock API.

After some research it's clear that application that implements collaboration productively requires a datatype that can encode changes and intent, because otherwise the editing collaborators would continuously overwrite each other's work. A popular way to do that it [Operational Transformation(OT)](en.wikipedia.org/wiki/Operational_transformation). To control the scope I'll implement(in the order of priority):

1. fetching the whole document;
2. applying a transformation to a document;
3. creating a new document;
4. subscribing to a stream of those transformations.

It's important to note that the whole conflict management could potentially be avoided if..

1. each user could only be connected to one session, meaning there could not be multiple "local" states for a user and
2. users could not delete each other's text.

That's because the same block could never have a conflict. On the other hand there could potentially be conflicts on the document level, we do want to eventually probably support deletions and slapping OT on a system that's designed without collaboration in mind will be practially impossible.

##### Important things to note:

- Session Affinity - clients editing one specific document need to be connected to the same WS server to avoid routing the changes to a central cluster-wide messaging component, like Kafka or RabbitMQ, which I would recommend against if possible. The routing can easily be defined by the request path since it includes the document ID.

##### Resources:

- https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt
- https://github.com/ianstormtaylor/slate
- https://ckeditor.com/blog/Lessons-learned-from-creating-a-rich-text-editor-with-real-time-collaboration/
- Network logs from Google Docs

### Document model

For simplicity the documents will just be a series of blocks of text tagged with user:

```
[{
    u: "_userId_",
    t: "... block of text here"
}, {
    u: "..",
    t: ".."
}
]
```

Each of the text blocks represent a piece of text(`t`) by a user(`u`).

### Change model

Change follows [JSON0 OT Type](https://github.com/ottypes/json0) spec, which as a starter, can be created via diffing two documents using [json0-ot-diff package](https://github.com/kbadk/json0-ot-diff).

### API

`POST /document/`
`GET /document/:docId`
`POST /document/:docId/changes`
`WS /document/:docId/changes`

##### Resources:

- https://github.com/share/sharedb
- https://medium.com/@david.roegiers/building-a-real-time-collaborative-text-editor-for-the-web-draftjs-sharedb-1dd8e8826295
- https://github.com/kbadk/json0-ot-diff
- https://github.com/ottypes/docs
