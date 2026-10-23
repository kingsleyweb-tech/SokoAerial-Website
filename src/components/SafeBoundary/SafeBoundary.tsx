import { Component, type ErrorInfo, type ReactNode } from 'react'

interface SafeBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

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
