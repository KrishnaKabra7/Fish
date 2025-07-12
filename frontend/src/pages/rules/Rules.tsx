import { NavLink } from 'react-router'
import './Rules.css'
import { ArrowLeft } from 'lucide-react'

export default function Rules() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="w-full max-w-[100vw] min-h-full p-5 sm:p-10 md:p-20 bg-gray-100">
        <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold'>
          <NavLink to="/">
            <ArrowLeft className='inline mr-4' />
          </NavLink>
          Game Rules
        </h1>
        <div className='w-full h-0 border-1 border-gray-300 my-4'></div>
        <h2 className='sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2'>Basic Gameplay</h2>
        <ol className='list-decimal pl-16'>
          <li> <span className='font-semibold'>Setup</span>: At least 6 players are randomly assigned to 2 teams </li>
          <li> <span className='font-semibold'>Cards</span>: Standard 52-card deck + 2 jokers, dealt 9 cards each </li>
          <li> <span className='font-semibold'>Half Suits</span>: 9 half suits of 6 cards each: <br />
            <ol className='list-disc pl-8'>
              <li> 2-7 of each suit (4 half suits) </li>
              <li> 9-A of each suit (4 half suits) </li>
              <li> All 8s + Joker + Cut (1 half suit) </li>
            </ol>
          </li>
        </ol>

        <h2 className='sm:text-lg md:text-xl lg:text-2xl font-semibold mt-8'>Actions</h2>
        <br />
        <span className='font-semibold'>Ask</span>: Request a specific card from an opponent.
        You must have at least one card of that half suit.
        If successful, continue your turn. If unsuccessful, turn passes to the player you just asked. 
        <br />
        <br />
        <span className='font-semibold'>Claim</span>: Declare where all 6 cards of a half suit are located.
        <ol className='list-decimal pl-16'>
          <li> <span className='font-semibold'>Claim for your team</span>: Immediate resolution (correct = point) </li>
          <li> <span className='font-semibold'>Claim for opponent team</span>: Other team can choose to pass or to counter claim </li>
        </ol>

        <h2 className='sm:text-lg md:text-xl lg:text-2xl font-semibold mt-8 mb-4'>Winning</h2>
        Game ends when all 9 half suits are claimed. Team with most points (5+ out of 9) wins
      </div>
    </div>
  )
}

