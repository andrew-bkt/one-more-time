import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export function NavHero() {
  return (
    <div>
      <header className="w-full bg-background px-4 py-3 shadow-sm sm:px-6 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-lg font-medium text-foreground hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-foreground hover:underline"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-foreground hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-foreground hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <AuthButton />
        </div>
      </header>
      <section className="w-full py-20 sm:py-24 md:py-32 bg-gradient-to-t from-background via-foreground to-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Software for the{" "}
              <span className="text-6xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                market
              </span>{" "}
              price of compute
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Brooklyn Technology provides powerful software solutions at an affordable price, empowering businesses to
              scale and innovate.
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
