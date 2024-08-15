import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProductFeature() {
  return (
    <section className="bg-muted/40 py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Innovative Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Enterprise-Grade Solutions, Affordable Pricing
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Brooklyn Technology's B2B software pricing model is designed to make enterprise-grade solutions accessible
              to businesses of all sizes. By charging only for the computational resources used, we eliminate hefty
              development fees, allowing our customers to experience the power of our tools without the enterprise-grade
              price tag.
            </p>
          </div>
          <div className="grid gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>AP Processing</CardTitle>
                <CardDescription>
                  Streamline your accounts payable with our advanced AP processing solution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">$0.05</div>
                  <div className="text-sm text-muted-foreground">per transaction</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Keep track of your stock with our powerful inventory management tool.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">$0.01</div>
                  <div className="text-sm text-muted-foreground">per item</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
