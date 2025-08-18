export interface ErrorLog {
  id: number
  timestamp: string
  level: 'error' | 'warning' | 'info'
  message: string
  stack_trace?: string
  user_agent?: string
  ip_address?: string
}

export interface IssueMetrics {
  response_time: number
  error_rate: number
  uptime: number
  affected_users_count: number
  first_occurrence: string
  last_occurrence: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  severity: 'critical' | 'high' | 'medium' | 'low'
  priority: 'urgent' | 'high' | 'normal' | 'low'
  module: {
    name: string
    path: string
    version: string
    status: 'healthy' | 'warning' | 'error' | 'critical'
  }
  affected_users: number
  environment: 'production' | 'staging' | 'development'
  labels: Array<{
    name: string
    color: string
  }>
  assignee: {
    login: string
    avatar_url: string
  } | null
  user: {
    login: string
    avatar_url: string
  }
  created_at: string
  updated_at: string
  repository: {
    name: string
    full_name: string
  }
  comments: Comment[]
  pull_requests: PullRequest[]
  error_logs: ErrorLog[]
  metrics: IssueMetrics
}

export interface Comment {
  id: number
  user: {
    login: string
    avatar_url: string
    type: 'User' | 'Bot'
  }
  body: string
  created_at: string
  updated_at: string
  type: 'comment' | 'system'
}

export interface PullRequest {
  id: number
  number: number
  title: string
  state: 'open' | 'closed' | 'merged'
  html_url: string
}

export const mockIssues: GitHubIssue[] = [
  {
    id: 1,
    number: 123,
    title: "Authentication system not working properly",
    body: "Users are reporting that they cannot log in using their credentials. The error message shows 'Invalid credentials' even with correct username and password.",
    state: 'open',
    severity: 'critical',
    priority: 'urgent',
    module: {
      name: 'Authentication Service',
      path: '/auth/login',
      version: 'v2.1.3',
      status: 'critical'
    },
    affected_users: 1247,
    environment: 'production',
    labels: [
      { name: 'bug', color: 'd73a49' },
      { name: 'high-priority', color: 'b60205' },
      { name: 'authentication', color: '0052cc' }
    ],
    assignee: {
      login: 'johndoe',
      avatar_url: '/placeholder-user.jpg'
    },
    user: {
      login: 'jane_user',
      avatar_url: '/placeholder-user.jpg'
    },
    created_at: '2025-01-10T10:30:00Z',
    updated_at: '2025-01-11T14:22:00Z',
    repository: {
      name: 'thrico-dashboard',
      full_name: 'company/thrico-dashboard'
    },
    comments: [
      {
        id: 1,
        user: {
          login: 'jane_user',
          avatar_url: '/placeholder-user.jpg',
          type: 'User'
        },
        body: "I've tried multiple browsers and cleared cache, but the issue persists. This is blocking our entire team from accessing the dashboard.",
        created_at: '2025-01-10T11:15:00Z',
        updated_at: '2025-01-10T11:15:00Z',
        type: 'comment'
      },
      {
        id: 2,
        user: {
          login: 'bot',
          avatar_url: '/placeholder-user.jpg',
          type: 'Bot'
        },
        body: "This issue has been automatically assigned to @johndoe for investigation.",
        created_at: '2025-01-10T11:16:00Z',
        updated_at: '2025-01-10T11:16:00Z',
        type: 'system'
      },
      {
        id: 3,
        user: {
          login: 'johndoe',
          avatar_url: '/placeholder-user.jpg',
          type: 'User'
        },
        body: "Thanks for reporting this! I'm looking into the authentication service logs. Can you tell me what time this issue first occurred?",
        created_at: '2025-01-10T14:30:00Z',
        updated_at: '2025-01-10T14:30:00Z',
        type: 'comment'
      },
      {
        id: 4,
        user: {
          login: 'jane_user',
          avatar_url: '/placeholder-user.jpg',
          type: 'User'
        },
        body: "It started happening around 9:30 AM EST yesterday. Before that, everything was working fine.",
        created_at: '2025-01-11T08:45:00Z',
        updated_at: '2025-01-11T08:45:00Z',
        type: 'comment'
      }
    ],
    pull_requests: [
      {
        id: 1,
        number: 456,
        title: "Fix authentication token validation",
        state: 'open',
        html_url: 'https://github.com/company/thrico-dashboard/pull/456'
      }
    ],
    error_logs: [
      {
        id: 1,
        timestamp: '2025-01-10T10:25:00Z',
        level: 'error',
        message: 'JWT token validation failed',
        stack_trace: 'at validateToken (/auth/middleware.js:45)',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ip_address: '192.168.1.100'
      },
      {
        id: 2,
        timestamp: '2025-01-10T10:26:15Z',
        level: 'error',
        message: 'Database connection timeout',
        stack_trace: 'at connect (/db/connection.js:23)',
        ip_address: '192.168.1.101'
      }
    ],
    metrics: {
      response_time: 2500,
      error_rate: 15.2,
      uptime: 94.5,
      affected_users_count: 1247,
      first_occurrence: '2025-01-10T09:30:00Z',
      last_occurrence: '2025-01-11T14:20:00Z'
    }
  },
  {
    id: 2,
    number: 124,
    title: "Dashboard loading performance is slow",
    body: "The dashboard takes over 10 seconds to load on initial visit. This affects user experience significantly.",
    state: 'open',
    severity: 'high',
    priority: 'high',
    module: {
      name: 'Dashboard Service',
      path: '/dashboard',
      version: 'v1.8.2',
      status: 'warning'
    },
    affected_users: 523,
    environment: 'production',
    labels: [
      { name: 'performance', color: 'fbca04' },
      { name: 'enhancement', color: 'a2eeef' }
    ],
    assignee: null,
    user: {
      login: 'perf_tester',
      avatar_url: '/placeholder-user.jpg'
    },
    created_at: '2025-01-09T16:20:00Z',
    updated_at: '2025-01-09T16:20:00Z',
    repository: {
      name: 'thrico-dashboard',
      full_name: 'company/thrico-dashboard'
    },
    comments: [
      {
        id: 5,
        user: {
          login: 'perf_tester',
          avatar_url: '/placeholder-user.jpg',
          type: 'User'
        },
        body: "Lighthouse score shows 34 for performance. We need to optimize bundle size and implement lazy loading.",
        created_at: '2025-01-09T16:25:00Z',
        updated_at: '2025-01-09T16:25:00Z',
        type: 'comment'
      }
    ],
    pull_requests: [],
    error_logs: [
      {
        id: 3,
        timestamp: '2025-01-09T16:15:00Z',
        level: 'warning',
        message: 'Large bundle size detected: 2.5MB',
        user_agent: 'Chrome/120.0.0.0',
        ip_address: '192.168.1.102'
      }
    ],
    metrics: {
      response_time: 8500,
      error_rate: 2.1,
      uptime: 99.2,
      affected_users_count: 523,
      first_occurrence: '2025-01-09T14:00:00Z',
      last_occurrence: '2025-01-09T16:20:00Z'
    }
  },
  {
    id: 3,
    number: 125,
    title: "Add dark mode support",
    body: "Users have been requesting dark mode functionality for better accessibility and user preference.",
    state: 'closed',
    severity: 'medium',
    priority: 'normal',
    module: {
      name: 'UI Theme System',
      path: '/components/theme',
      version: 'v1.2.0',
      status: 'healthy'
    },
    affected_users: 0,
    environment: 'production',
    labels: [
      { name: 'feature', color: '7057ff' },
      { name: 'ui/ux', color: 'f9d0c4' }
    ],
    assignee: {
      login: 'ui_dev',
      avatar_url: '/placeholder-user.jpg'
    },
    user: {
      login: 'design_lead',
      avatar_url: '/placeholder-user.jpg'
    },
    created_at: '2025-01-05T09:00:00Z',
    updated_at: '2025-01-08T17:30:00Z',
    repository: {
      name: 'thrico-dashboard',
      full_name: 'company/thrico-dashboard'
    },
    comments: [
      {
        id: 6,
        user: {
          login: 'ui_dev',
          avatar_url: '/placeholder-user.jpg',
          type: 'User'
        },
        body: "I've implemented the dark mode using next-themes. The toggle is available in the header.",
        created_at: '2025-01-08T15:00:00Z',
        updated_at: '2025-01-08T15:00:00Z',
        type: 'comment'
      },
      {
        id: 7,
        user: {
          login: 'bot',
          avatar_url: '/placeholder-user.jpg',
          type: 'Bot'
        },
        body: "Issue closed by @ui_dev via commit abc123f",
        created_at: '2025-01-08T17:30:00Z',
        updated_at: '2025-01-08T17:30:00Z',
        type: 'system'
      }
    ],
    pull_requests: [
      {
        id: 2,
        number: 450,
        title: "Implement dark mode support",
        state: 'merged',
        html_url: 'https://github.com/company/thrico-dashboard/pull/450'
      }
    ],
    error_logs: [],
    metrics: {
      response_time: 150,
      error_rate: 0,
      uptime: 100,
      affected_users_count: 0,
      first_occurrence: '2025-01-05T09:00:00Z',
      last_occurrence: '2025-01-08T17:30:00Z'
    }
  },
  {
    id: 4,
    number: 126,
    title: "Database connection pool exhausted",
    body: "Production database is frequently running out of available connections causing 500 errors.",
    state: 'open',
    severity: 'critical',
    priority: 'urgent',
    module: {
      name: 'Database Service',
      path: '/api/db',
      version: 'v3.2.1',
      status: 'critical'
    },
    affected_users: 2134,
    environment: 'production',
    labels: [
      { name: 'database', color: '0052cc' },
      { name: 'critical', color: 'b60205' },
      { name: 'infrastructure', color: '5319e7' }
    ],
    assignee: {
      login: 'db_admin',
      avatar_url: '/placeholder-user.jpg'
    },
    user: {
      login: 'monitor_bot',
      avatar_url: '/placeholder-user.jpg'
    },
    created_at: '2025-01-11T08:15:00Z',
    updated_at: '2025-01-11T15:45:00Z',
    repository: {
      name: 'thrico-api',
      full_name: 'company/thrico-api'
    },
    comments: [
      {
        id: 8,
        user: {
          login: 'monitor_bot',
          avatar_url: '/placeholder-user.jpg',
          type: 'Bot'
        },
        body: "🚨 Critical Alert: Database connection pool at 95% capacity. Immediate action required.",
        created_at: '2025-01-11T08:15:00Z',
        updated_at: '2025-01-11T08:15:00Z',
        type: 'system'
      },
      {
        id: 9,
        user: {
          login: 'db_admin',
          avatar_url: '/placeholder-user.jpg',
          type: 'User'
        },
        body: "Investigating connection leaks. Scaling up pool size as temporary fix.",
        created_at: '2025-01-11T10:30:00Z',
        updated_at: '2025-01-11T10:30:00Z',
        type: 'comment'
      }
    ],
    pull_requests: [
      {
        id: 3,
        number: 789,
        title: "Increase database connection pool size",
        state: 'open',
        html_url: 'https://github.com/company/thrico-api/pull/789'
      }
    ],
    error_logs: [
      {
        id: 4,
        timestamp: '2025-01-11T08:10:00Z',
        level: 'error',
        message: 'Pool exhausted: Unable to acquire connection',
        stack_trace: 'at Pool.acquire (/db/pool.js:67)',
        ip_address: '10.0.1.45'
      },
      {
        id: 5,
        timestamp: '2025-01-11T08:11:30Z',
        level: 'error',
        message: 'Connection timeout after 30000ms',
        stack_trace: 'at Connection.timeout (/db/connection.js:89)',
        ip_address: '10.0.1.46'
      }
    ],
    metrics: {
      response_time: 15000,
      error_rate: 23.7,
      uptime: 87.3,
      affected_users_count: 2134,
      first_occurrence: '2025-01-11T07:45:00Z',
      last_occurrence: '2025-01-11T15:40:00Z'
    }
  }
]

export const workspaces = [
  {
    id: 1,
    name: 'thrico-dashboard',
    full_name: 'company/thrico-dashboard',
    description: 'Main dashboard application',
    open_issues: 45,
    closed_issues: 123,
    modules: [
      { name: 'Authentication Service', status: 'critical', issues: 1 },
      { name: 'Dashboard Service', status: 'warning', issues: 1 },
      { name: 'UI Theme System', status: 'healthy', issues: 0 },
      { name: 'User Management', status: 'healthy', issues: 0 },
      { name: 'Notification Service', status: 'warning', issues: 2 }
    ]
  },
  {
    id: 2,
    name: 'thrico-api',
    full_name: 'company/thrico-api',
    description: 'Backend API service',
    open_issues: 12,
    closed_issues: 89,
    modules: [
      { name: 'Database Service', status: 'critical', issues: 1 },
      { name: 'Payment Gateway', status: 'healthy', issues: 0 },
      { name: 'File Upload Service', status: 'warning', issues: 1 },
      { name: 'Email Service', status: 'healthy', issues: 0 }
    ]
  },
  {
    id: 3,
    name: 'thrico-mobile',
    full_name: 'company/thrico-mobile',
    description: 'Mobile application',
    open_issues: 8,
    closed_issues: 34,
    modules: [
      { name: 'Push Notifications', status: 'warning', issues: 2 },
      { name: 'Offline Sync', status: 'healthy', issues: 0 },
      { name: 'Camera Integration', status: 'healthy', issues: 0 }
    ]
  }
]
