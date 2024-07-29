import Layout from './layout';
import { NavHero } from '../components/nav-hero';
import { ProductFeature } from '../components/product-feature';
import { HomePoints } from '../components/home-points';
import { HomeFooter } from '../components/home-footer';

export default function Page() {
  return (
    <Layout>
      <NavHero />
      <HomePoints />
      <ProductFeature />
      <HomeFooter />
    </Layout>
  );
}