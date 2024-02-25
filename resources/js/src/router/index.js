import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'feedback-listings',
      component: () => import('@/views/feedback/FeedbackListings'),
      meta: {
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Feedback Listings',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/creare-feedback',
      name: 'creare-feedback',
      component: () => import('@/views/feedback/CreateFeedback.vue'),
      meta: {
        pageTitle: 'My Accounts',
        breadcrumb: [
          {
            text: 'Create Feedback',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-comments',
      name: 'add-comments',
      component: () => import('@/views/feedback/AddComments.vue'),
      meta: {
        pageTitle: 'My Accounts',
        breadcrumb: [
          {
            text: 'Add Comments',
            active: true,
          },
        ],
      },
    },
    {
      path: '/feedback-listings',
      name: 'feedback-listings',
      component: () => import('@/views/feedback/FeedbackListings'),
      meta: {
        pageTitle: 'My Accounts',
        breadcrumb: [
          {
            text: 'Feedback Listings',
            active: true,
          },
        ],
      },
    },
    {
      path: '/comment-listings',
      name: 'comment-listings',
      component: () => import('@/views/feedback/CommentListings'),
      meta: {
        pageTitle: 'My Accounts',
        breadcrumb: [
          {
            text: 'Comment Listings',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-comment/:id',
      name: 'add-comment',
      component: () => import('@/views/feedback/AddComments.vue'),
      meta: {
        pageTitle: 'My Accounts',
        breadcrumb: [
          {
            text: 'Add Comments',
            active: true,
          },
        ],
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
