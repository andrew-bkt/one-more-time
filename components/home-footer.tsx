import Link from "next/link"

export function HomeFooter() {
  return (
    <footer className="bg-muted py-12">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="font-bold text-lg">Brooklyn Technology</span>
          </Link>
          <p className="text-muted-foreground">
            Brooklyn Technology is a leading provider of innovative technology solutions for businesses of all sizes.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Quick Links</h4>
          <Link href="#" className="hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Services
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Resources</h4>
          <Link href="#" className="hover:underline" prefetch={false}>
            Blog
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Support
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Legal</h4>
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Cookie Policy
          </Link>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <nav className="flex gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  )
}
