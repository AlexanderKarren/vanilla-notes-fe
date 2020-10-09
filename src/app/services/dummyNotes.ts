import Note from '../models/Note';

export default <Note[]>[{
    id: "PPBqWA9",
    date_created: "2020-09-28T15:12:19Z",
    topic: "Welcome",
    title: "Welcome to Vanilla Notes",
    body: `# Welcome to Vanilla Notes

To create a new **note,** click the **'New Note'** button on the header up top.

## Bulleted Lists
Place an asterisk followed by a space before a line to create a bulleted list item.
* My first bullet,
* My second,
* and my third!
\`* Bullet item\`
## Checkboxes
You can add interactive checkboxes to your notes.
* [x] Open 'Welcome to Vanilla Notes'
* [ ] Skim it
* [ ] Start making your own!
\`* [ ] Unchecked box\`
\`* [x] Checked box\`

## Links
You can put working links to other sites in your notes.
[Check out the Github repo for Vanilla Notes!][repo]
\`[Check out the Github repo for Vanilla Notes!](https://github.com/AlexanderKarren/vanilla-notes-fe)\`

## Alignment
You can format lines of text
c[to be centerered,]
r[or aligned to the right.]

***
\`You can format lines of text\`
\`c[to be centered,]\`
\`r[or aligned to the right.]\`

## Stylized Text
Surround text with a pair of **double asterisks** to create **bold** text.
\`Surround text with a pair of **double asterisks** to create **bold** text.\`

## Variables
Links to sites and images can also be stored in variables at the **bottom of your note.** The syntax looks like this:
[Picture of dog][dog]

### Note Body
\`[Picture of dog][dog]\`

### Last Line
\`[dog]: https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80\`

## Images
Use the following syntax to add images to your notes:
\`![tiny monkey](https://images.unsplash.com/photo-1516636052745-e142aecffd0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80)\`
![tiny monkey](https://images.unsplash.com/photo-1516636052745-e142aecffd0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80)

[]: # Variables
[dog]: https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80\
[repo]: https://github.com/AlexanderKarren/vanilla-notes-fe`
    },
    {
        id: "eWRhpRV",
        date_created: "2020-09-28T15:12:19Z",
        topic: "Examples",
        title: "Angular README.md",
        body: `# Angular

Angular is a development platform for building mobile and desktop web applications using TypeScript/JavaScript and other languages.

## Quickstart

[Get started in 5 minutes][quickstart].

## Changelog

[Learn about the latest improvements][changelog].
 
## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on our guidelines for [contributing][contributing] and then check out one of our issues in the [hotlist: community-help](https://github.com/angular/angular/labels/hotlist%3A%20community-help).
[contributing]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md
[quickstart]: https://angular.io/start
[changelog]: https://github.com/angular/angular/blob/master/CHANGELOG.md
[ng]: https://angular.io`
    }
]