import { Meta } from '../layout/Meta'
import { AppConfig } from '../utils/AppConfig'
import { Banner } from './Banner'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { VerticalFeatures } from './VerticalFeatures'

// Base template的功能是把一个layout组成组件顺序组合在一起。
const Base = () => (
  <div className="antialiased text-gray-600">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
)

export { Base }
