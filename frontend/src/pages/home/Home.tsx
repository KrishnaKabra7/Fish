import { NavLink } from 'react-router'
import './Home.css'
import { Button } from '@/components/ui/button'
import { ArrowRight, CircleQuestionMark } from 'lucide-react'

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100 flex items-center justify-center gap-5">
      <NavLink to="/rules">
        <Button>Rules <CircleQuestionMark /> </Button>
      </NavLink>
      <NavLink to="/game">
        <Button>Start Fishing! <ArrowRight /> </Button>
      </NavLink>
    </div>
  )
}
