export default [
  {
    header: 'Feedback Listing',
    icon: 'ListIcon',
    route: 'feedback-listings',
    title: 'Feedback Listing',
  },
  {
    header: 'Comment Listing',
    icon: 'ListIcon',
    route: 'comment-listings',
    title: 'Comment Listing',
  },
  {
    header: 'Feedback',
    icon: 'MessageCircleIcon',
    children: [
      {
        title: 'Create Feedback',
        route: 'creare-feedback',
        icon: 'PlusIcon',
      },
      {
        title: 'Add Comments',
        route: 'add-comments',
        icon: 'MessageCircleIcon',
      },
    ]
  }
]
