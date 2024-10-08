export function HomePoints() {
  return (
    <section className="bg-muted py-12 md:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          <div className="grid gap-4">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Unbeatable Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Affordable Solutions for Businesses of All Sizes
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Brooklyn Technology offers enterprise-grade solutions at competitive prices, making it accessible for
              businesses of all sizes.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">
              Enterprise-Grade Offerings
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Leading Enterprises</h2>
            <p className="text-muted-foreground md:text-lg">
              Brooklyn Technology's solutions are designed to meet the demanding needs of enterprise-level
              organizations, providing robust features and unparalleled reliability.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Cloud-Optimized Infrastructure
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Scalable and Secure Cloud Solutions</h2>
            <p className="text-muted-foreground md:text-lg">
              Brooklyn Technology's cloud-based infrastructure ensures seamless scalability, high availability, and
              enterprise-level security for your business.
            </p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <div className="bg-card p-6 rounded-lg grid gap-4">
            <h3 className="text-xl font-bold">Accounts Payable Processing</h3>
            <p className="text-muted-foreground">
              Streamline your accounts payable workflow with Brooklyn Technology's intelligent invoice processing
              solution.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg grid gap-4">
            <h3 className="text-xl font-bold">Seamless Integration</h3>
            <p className="text-muted-foreground">
              Easily integrate Brooklyn Technology's solutions with your existing business systems and workflows.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg grid gap-4">
            <h3 className="text-xl font-bold">Enterprise-Level Security</h3>
            <p className="text-muted-foreground">
              Protect your data with Brooklyn Technology's robust security measures, ensuring the highest level of
              protection.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg grid gap-4">
            <h3 className="text-xl font-bold">User-Friendly Interface</h3>
            <p className="text-muted-foreground">
              Enjoy a seamless and intuitive user experience with Brooklyn Technology's well-designed interface.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center" />
      </div>
    </section>
  )
}
