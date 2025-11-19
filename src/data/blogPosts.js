export const blogPosts = [
  {
    id: 'getting-started-with-react-19',
    title: 'Getting Started with React 19',
    excerpt: 'React 19 brings exciting new features like the Compiler and Actions. Here is a deep dive into what is new and how to upgrade.',
    content: `
# Getting Started with React 19

React 19 is a major release that simplifies how we write React applications.

## The React Compiler

The React Compiler is a new build-time tool that automatically optimizes your React code. It understands your code and memoizes values and functions for you, so you don't have to use \`useMemo\` and \`useCallback\` as often.

## Actions

Actions allow you to pass a function to DOM elements like \`<form/>\`:

\`\`\`jsx
<form action={search}>
  <input name="query" />
  <button type="submit">Search</button>
</form>
\`\`\`

This makes handling form submissions and data mutations much more intuitive.
    `,
    author: 'Kevin Tuan Tran',
    date: '2025-11-15',
    tags: ['React', 'JavaScript', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true
  },
  {
    id: 'building-scalable-apis-with-nodejs',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn the best practices for structuring your Node.js applications for scale, performance, and maintainability.',
    content: `
# Building Scalable APIs

When building APIs with Node.js, structure is key.

## Layered Architecture

Separating your concerns into layers (Controller, Service, Data Access) ensures that your code remains clean and testable.

1. **Controller Layer**: Handles incoming HTTP requests and sends responses.
2. **Service Layer**: Contains the business logic.
3. **Data Access Layer**: Interacts with the database.

## Error Handling

Centralized error handling is crucial for a consistent API response structure. Use middleware to catch and format errors.
    `,
    author: 'Kevin Tuan Tran',
    date: '2025-10-28',
    tags: ['Node.js', 'Backend', 'API'],
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true
  },
  {
    id: 'understanding-kubernetes-pods',
    title: 'Understanding Kubernetes Pods',
    excerpt: 'A beginner-friendly guide to the smallest deployable units of computing that you can create and manage in Kubernetes.',
    content: `
# Understanding Kubernetes Pods

A Pod is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers.

## Why Pods?

Containers in a Pod share an IP address and port space, and can find each other via \`localhost\`. They can also communicate with each other using standard inter-process communications like SystemV semaphores or POSIX shared memory.

## Lifecycle

Pods are ephemeral. They are not designed to run forever. When a Pod dies, it is gone. A Controller (like a Deployment) is responsible for creating new Pods to replace the ones that failed.
    `,
    author: 'Kevin Tuan Tran',
    date: '2025-09-10',
    tags: ['Kubernetes', 'DevOps', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1667372393119-c85c020799a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false
  },
  {
    id: 'css-grid-vs-flexbox',
    title: 'CSS Grid vs Flexbox: When to Use Which?',
    excerpt: 'Confused about when to use Grid and when to use Flexbox? This guide breaks down the differences and use cases.',
    content: `
# CSS Grid vs Flexbox

Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes.

## Flexbox

Flexbox is **one-dimensional**. It is great for laying out items in a single row or a single column. Use it for:
- Navigation bars
- Aligning items within a container
- Distributing space between items

## CSS Grid

CSS Grid is **two-dimensional**. It can handle both rows and columns simultaneously. Use it for:
- Overall page layouts
- Complex grid structures
- Overlapping items
    `,
    author: 'Kevin Tuan Tran',
    date: '2025-08-05',
    tags: ['CSS', 'Frontend', 'Design'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false
  }
];
