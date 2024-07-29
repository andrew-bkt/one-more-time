// one-more-time/components/AuthButton.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleAction = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <div>
      <Button onClick={handleAction}>
        {user ? 'Dashboard' : 'Sign In'}
      </Button>
      {user && (
        <Button onClick={handleSignOut} className="ml-2">
          Sign Out
        </Button>
      )}
    </div>
  )
}
