import { Component, type ErrorInfo, type ReactNode } from 'react'

interface SafeBoundaryProps {
  /** Static content shown if the children throw while rendering. */
  fallback: ReactNode
  children: ReactNode
}

/** Keeps an interactive section from blanking the page: if it fails, the static fallback renders instead. */
export class SafeBoundary extends Component<SafeBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Interactive section failed; showing the static version.', error, info.componentStack)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
