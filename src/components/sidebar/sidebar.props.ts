import { NavigateFunction } from 'react-router'

export interface SidebarProps {
  tabPath: string
  docPath: string
  hashtag: string
  navigate: NavigateFunction
}
